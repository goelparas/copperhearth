"use client";

import { useState, useEffect } from "react";

export default function JoinedCounter() {
  const [count, setCount] = useState(1276);

  useEffect(() => {
    // Retrieve from localStorage on client-side mount
    const stored = localStorage.getItem("joined_people_count");
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= 1276) {
        setCount(parsed);
      }
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateCounter = () => {
      setCount((prev) => {
        const increment = Math.floor(Math.random() * 10); // Generates 0 to 9 inclusive
        const nextCount = prev + increment;
        localStorage.setItem("joined_people_count", nextCount.toString());
        return nextCount;
      });

      // Schedule next update after a random interval (2 to 6 seconds)
      const nextDelay = (Math.random() * 4 + 2) * 1000;
      timeoutId = setTimeout(updateCounter, nextDelay);
    };

    // Schedule first update after a random interval (2 to 6 seconds)
    const initialDelay = (Math.random() * 4 + 2) * 1000;
    timeoutId = setTimeout(updateCounter, initialDelay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <span className="text-[0.6875rem] sm:text-xs font-sans tracking-wide text-brand-forest font-semibold underline decoration-brand-copper/30 underline-offset-4">
      {count.toLocaleString()} + People have already joined.
    </span>
  );
}
