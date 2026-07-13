import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(mql.matches);
    const handler = (e) => setEnabled(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const moveHandler = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setHidden(false);
    };
    const overHandler = (e) => {
      const interactive = e.target.closest(
        'a, button, [role="button"], .cursor-hover'
      );
      const textField = e.target.closest(
        'input, textarea, select, [contenteditable="true"]'
      );
      setHovering(Boolean(interactive) && !textField);
      setHidden(Boolean(textField));
    };
    const leaveHandler = () => setHidden(true);

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseover', overHandler);
    document.documentElement.addEventListener('mouseleave', leaveHandler);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', overHandler);
      document.documentElement.removeEventListener('mouseleave', leaveHandler);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] w-2 h-2 rounded-full bg-pink-500"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[998] w-9 h-9 rounded-full border-2 border-pink-500"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hovering ? 2.2 : 1,
          backgroundColor: hovering
            ? 'rgba(219,39,119,0.15)'
            : 'rgba(219,39,119,0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </>
  );
};

export default CustomCursor;
