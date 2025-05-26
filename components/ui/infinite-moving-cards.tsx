"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    image: string;
    quote: string;
    name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const getDirection = React.useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "normal"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }, [direction]);

  const getSpeed = React.useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  }, [speed]);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        // Duplicate items multiple times for smoother infinite scroll
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }

    addAnimation();
  }, [direction, speed, getDirection, getSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[450px] group overflow-hidden bg-black"
            key={`${item.name}-${idx}`}
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-600 via-gray-500 to-slate-600 p-[1px]">
              <div className="h-full w-full rounded-2xl bg-black" />
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 via-gray-500/10 to-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-2xl" />
            
            <blockquote className="relative z-20">
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              <div className="relative z-20 mt-6 flex flex-row items-center gap-3">
                <Image
                  src={item.image}
                  alt="image"
                  className="inset-0 w-10 h-10 rounded-full"
                  width={50}
                  height={50}
                />
                <span className="flex flex-col">
                  <span className="text-sm leading-[1.6] text-white font-bold flex flex-row gap-3">
                    <span>{item.name}</span>
                  </span>
                </span>
              </div>
              <span className="relative mt-2 gap-4 flex flex-row z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                <span>{item.quote}</span>
              </span>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
