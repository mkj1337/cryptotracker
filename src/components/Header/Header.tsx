import { motion } from 'framer-motion';

// styles
import './Header.scss';

// components
import { Slider } from './Slider/Slider';

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="header__crypto"
      >
        <Slider />
      </motion.div>
    </header>
  );
};
