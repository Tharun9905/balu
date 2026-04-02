import React, { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mPos = useRef({ x: 0, y: 0 }); // Mouse position
  const rPos = useRef({ x: 0, y: 0 }); // Ring position

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mPos.current.x = e.clientX;
      mPos.current.y = e.clientY;
    };

    const animate = () => {
      // Lerp (linear interpolation) for smooth following ring
      // ringPos = ringPos + (targetPos - ringPos) * speed
      rPos.current.x += (mPos.current.x - rPos.current.x) * 0.15;
      rPos.current.y += (mPos.current.y - rPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mPos.current.x}px, ${mPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rPos.current.x}px, ${rPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    const hoverObserver = new MutationObserver(() => {
      const detectHovers = (selector: string, className: string) => {
        document.querySelectorAll(selector).forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (!htmlEl.dataset.hasCursorListener) {
            htmlEl.dataset.hasCursorListener = 'true';
            el.addEventListener('mouseenter', () => document.body.classList.add(className));
            el.addEventListener('mouseleave', () => document.body.classList.remove(className));
          }
        });
      };

      detectHovers('a', 'cursor-hover-link');
      detectHovers('.gallery-card', 'cursor-hover-img');
      detectHovers('button, .btn, .service-card', 'cursor-hover-btn');
    });

    hoverObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('mousemove', handleMouseMove);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      hoverObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
