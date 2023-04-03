import { motion } from 'framer-motion';

// styles
import './Header.scss';

// components
import { Slider } from './Slider/Slider';

const sliderVariants = {
  hidden: {},
  visible: {
    left: [
      405, 305, 205, 105, 0, -105, -205, -305, -405, -305, -205, -105, 0, 105,
      205, 305, 405,
    ],
    transition: { yoyo: Infinity, duration: 5 },
  },
};

export const Header = () => {
  return (
    <header className="header">
      <motion.p
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -50, opacity: 0 }}
        className="header__title"
      >
        Effortlessly Track
        <span>Crypto Market Changes</span>
      </motion.p>
      <motion.div
        variants={sliderVariants}
        initial={{ left: 0 }}
        animate="visible"
        className="header__crypto"
      >
        <Slider />
      </motion.div>
    </header>
  );
};
