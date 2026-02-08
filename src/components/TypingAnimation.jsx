import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = ({ text, speed = 50, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <div className={`font-playfair relative inline-block ${className}`}>
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-[1em] bg-red-500 ml-1 align-middle"
            />
        </div>
    );
};

export default TypingAnimation;