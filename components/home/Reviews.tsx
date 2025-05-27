"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function Reviews() {
  return (
    <div
      id="testimonials"
      className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
    >
      <h3
        className="text-4xl font-bold text-center mb-8"
        // style={{ fontFamily: "'MyFont', sans-serif" }}
      >
      </h3>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Working with AIdaptics was like a dream, abi They set up this killer automated sales system that hunts down our perfect müşteriler, sends super on-point messages, and keeps the chat going without us lifting a finger. First hafta, boom, we scored 10 solid buluşma, no stress. Setup was pürüzsüz, ve sonuçlar gerçekten iyi dostum, güvenilir ve kaliteli işçilik..",
    name: "Roxis",
    image:
      "https://cdn.discordapp.com/avatars/504241166447804426/d858ba38b993ccb1794a6c6c5770c277.webp?size=128",
  },
  {
    quote:
      "Working with AIdaptics has been solid. I needed help setting up AI to handle my outreach, something that could message leads, follow up, and actually get replies. They built a system that runs smoother than I expected. Booked my first few calls without lifting a finger. Communication was on point throughout, and they delivered fast. Definitely worth it if you’re looking to automate the boring stuff.",
    name: "Shariq",
    image:
      "https://cdn.discordapp.com/avatars/764794216916058112/2dc4182eca79f9258f451662a28abab7.webp?size=80",
  },
  {
    quote:
      "As the founder of Magnimont, I’ve been seriously impressed with the Discord bot AIdaptics built for us. It handles everything from scheduling meetings and tracking project updates to managing GitHub workflows, sending newsletters, and even powering our company website. Setup was super smooth, and it’s made our day-to-day so much easier. Honestly, one of the smartest tools we've added to our stack.",
    name: "Vikas Nath Jha",
    image:
      "https://cdn.discordapp.com/avatars/532177714203852800/a_57dffef20fddc4cf18f6f55a60893d08.webp?size=80",
  },
  {
    quote:
      "AIdaptics delivered exactly what we needed, An Instagram Inbound ChatBot making workflow much more efficient. Highly recommended!",
    name: "Rohit",
    image:
      "https://cdn.discordapp.com/avatars/760791943478509579/5d008a3d7cf937f58ebe86bf3efd21b2.webp?size=80",
  },
];
