"use client";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".anim:not(.visible)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <div className="page-enter">{children}</div>;
}
