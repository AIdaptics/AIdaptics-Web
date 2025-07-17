"use server"
// pages/api/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

// Use environment variables for all secrets/config
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!;
const BOOKED_ROLE_ID = process.env.DISCORD_BOOKED_ROLE_ID!;
const CALENDLY_USER_UUID = process.env.CALENDLY_USER_UUID!;
const CALENDLY_TOKEN = process.env.CALENDLY_TOKEN!;

async function checkEmailBooked(email: string, userUuid: string, token: string): Promise<boolean> {
  const eventsUrl = "https://api.calendly.com/scheduled_events";
  const userUrl = `https://api.calendly.com/users/${userUuid}`;
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  const params = new URLSearchParams({ user: userUrl, count: "100" });
  const response = await fetch(`${eventsUrl}?${params.toString()}`, { headers });
  if (!response.ok) return false;
  const eventsJson = await response.json() as any;
  const events = eventsJson.collection || [];
  for (const event of events) {
    const eventUuid = event.uri.split("/").pop();
    const inviteesUrl = `https://api.calendly.com/scheduled_events/${eventUuid}/invitees`;
    const inviteesResp = await fetch(inviteesUrl, { headers });
    if (!inviteesResp.ok) continue;
    const inviteesJson = await inviteesResp.json() as any;
    const invitees = inviteesJson.collection || [];
    if (invitees.some((invitee: any) => invitee.email === email)) {
      return true;
    }
  }
  return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  if (!code) {
    // Redirect to error page
    return res.redirect('/api/Discord-auth/vlad-callback/response?error');
  }

  // Exchange code for access token
  const data = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: DISCORD_REDIRECT_URI,
    scope: "identify email guilds.join email"
  });
  const tokenResp = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data
  });
  if (!tokenResp.ok) {
    return res.redirect('/api/Discord-auth/vlad-callback/response?error');
  }
  const tokens = await tokenResp.json() as any;
  const accessToken = tokens.access_token;

  // Get user info
  const userResp = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!userResp.ok) {
    return res.redirect('/api/Discord-auth/vlad-callback/response?error');
  }
  const user = await userResp.json() as any;
  const userId = user.id;
  const userEmail = user.email;
  if (!userEmail) return res.redirect('/api/Discord-auth/vlad-callback/response?error');

  // Check Calendly
  const booked = await checkEmailBooked(userEmail, CALENDLY_USER_UUID, CALENDLY_TOKEN);
  if (!booked) {
    return res.redirect('/api/Discord-auth/vlad-callback/response?error');
  }

  // Add role to user
  const url = `https://discord.com/api/guilds/${GUILD_ID}/members/${userId}/roles/${BOOKED_ROLE_ID}`;
  const botHeaders = {
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    "Content-Type": "application/json"
  };
  const roleResp = await fetch(url, { method: "PUT", headers: botHeaders });
  if (roleResp.status === 204 || roleResp.status === 201) {
    return res.redirect('/api/Discord-auth/vlad-callback/response?success');
  } else {
    return res.redirect('/api/Discord-auth/vlad-callback/response?error');
  }
}