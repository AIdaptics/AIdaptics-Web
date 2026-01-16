"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function Reviews() {
  return (
    <div
      id="testimonials"
      className="py-16 px-4 bg-black text-white"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ fontFamily: "'MyFont', sans-serif" }}>
          What Our <span className="text-indigo-400">Clients</span> Say
        </h2>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="fast"
          pauseOnHover={true}
        />
      </div>
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
      "https://cdn.discordapp.com/attachments/1386046497652609086/1428067379472236584/CEO_Vikas.jpg?ex=68f126e3&is=68efd563&hm=172fe98cdbf4627b9668b935150d84781427b1004a9f8b728721286ff3ef85d8",
  },
  {
    quote:
      "AIdaptics delivered exactly what we needed, An Instagram Inbound ChatBot making workflow much more efficient. Highly recommended!",
    name: "Rohit",
    image:
      "https://cdn.discordapp.com/avatars/760791943478509579/5d008a3d7cf937f58ebe86bf3efd21b2.webp?size=80",
  },
];
