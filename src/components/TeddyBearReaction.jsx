import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTeddyEmotions, preloadTeddyImages } from '@/hooks/useTeddyEmotions';

const TeddyBearReaction = ({ attemptCount, isYesClicked }) => {
    const emotion = useTeddyEmotions(attemptCount, isYesClicked);

    useEffect(() => {
        preloadTeddyImages();
    }, []);

    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 z-30">
            <AnimatePresence mode="wait">
                <motion.div
                    key={emotion.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full h-full rounded-full overflow-hidden border-4 border-white/50 shadow-2xl bg-white/20 backdrop-blur-sm ${emotion.animationClass}`}
                >
                    <img
                        src={emotion.src}
                        alt={emotion.alt}
                        className="w-full h-full object-cover"
                        draggable="false"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TeddyBearReaction;