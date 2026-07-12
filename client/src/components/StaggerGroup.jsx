import { motion } from 'motion/react';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const StaggerGroup = ({ children, className = '', amount = 0.15 }) => (
  <motion.div
    className={className}
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div className={className} variants={staggerItemVariants}>
    {children}
  </motion.div>
);
