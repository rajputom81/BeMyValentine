import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// GIF Configuration
const GIFS = {
    default: "https://media.tenor.com/Rymj4MuTQIEAAAAC/peach-cat.gif", // Peach Cat Heart
    success: "https://media.tenor.com/3WxG2VePWSUAAAAC/bubududu-panda.gif", // Bubududu Panda Celebration
    idle: [
        "https://media.tenor.com/RBa37_6ApVcAAAAC/cute-adorable.gif", // Cute Adorable Please
        "https://media.tenor.com/SIyitsbGX-oAAAAC/milk-and-mocha-cute.gif", // Milk and Mocha Please
        "https://media.tenor.com/sCeOHLbcBcUAAAAC/love.gif", // Love
        "https://media.tenor.com/SFy5Za0DyMEAAAAC/erm-fingers.gif", // Erm Fingers
        "https://media.tenor.com/ViqKvHcmPQEAAAAC/please.gif", // Please
        "https://media.tenor.com/2DbtR2cs0-8AAAAC/mimibubu.gif", // Mimibubu
        "https://media.tenor.com/yPZm4Cp6Es0AAAAC/milk-mocha-cry.gif", // Milk Mocha Cry
        "https://media.tenor.com/qqRoBpnjOrIAAAAC/tkthao219-bubududu.gif", // Tkthao Bubududu
        "https://media.tenor.com/-9xLl1bsQ7cAAAAC/peach-cat-crying-peach-goma.gif", // Peach Cat Cry
        "https://media.tenor.com/9gBByPt6k4oAAAAC/bubu-dudu-twitter.gif" // Bubu Dudu Cry
    ]
};

const GifReaction = ({ isYesClicked, triggerChange }) => {
    const [currentGif, setCurrentGif] = useState(GIFS.default);
    const [isHovering, setIsHovering] = useState(false);

    const [hasInteracted, setHasInteracted] = useState(false);

    // Initial Preload
    useEffect(() => {
        const preloadImage = (src) => {
            const img = new Image();
            img.src = src;
        };

        preloadImage(GIFS.default);
        preloadImage(GIFS.success);
        GIFS.idle.forEach(preloadImage);
    }, []);

    // Logic for randomization
    useEffect(() => {
        if (isYesClicked) {
            setCurrentGif(GIFS.success);
            return;
        }

        if (isHovering) return; // Pause on hover

        // If we haven't interacted yet (triggerChange is 0) and not currently hovering/yes,
        // we should just show the default GIF and NOT cycle.
        // Unless triggerChange > 0, which means interaction started.
        if (!hasInteracted && triggerChange === 0) {
            return;
        }

        if (triggerChange > 0 && !hasInteracted) {
            setHasInteracted(true);
        }

        let timeoutId;

        const cycleGif = () => {
            // Random duration between 4000ms and 6000ms
            const duration = Math.floor(Math.random() * 2000) + 4000;

            timeoutId = setTimeout(() => {
                const randomGif = GIFS.idle[Math.floor(Math.random() * GIFS.idle.length)];
                setCurrentGif(randomGif);
                cycleGif(); // Recursively chain for variable intervals
            }, duration);
        };

        // If this effect re-runs due to triggerChange, we want to force an instant change
        // Ensure we don't pick the SAME gif, to guarantee a visible change.
        if (triggerChange > 0) {
            let randomGif;
            do {
                randomGif = GIFS.idle[Math.floor(Math.random() * GIFS.idle.length)];
            } while (randomGif === currentGif && GIFS.idle.length > 1);

            setCurrentGif(randomGif);
        }

        // Start the cycle
        // Only if we have interacted (which we know we have if we got past the early return,
        // or if triggerChange > 0 just now)
        cycleGif();

        return () => clearTimeout(timeoutId);
    }, [isYesClicked, isHovering, triggerChange, hasInteracted]);


    return (
        <div
            className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 z-30 flex items-center justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)} // Mobile touch logic
            onTouchEnd={() => setIsHovering(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentGif}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full rounded-3xl overflow-hidden border-4 border-white/50 shadow-2xl bg-white/30 backdrop-blur-sm"
                >
                    <img
                        src={currentGif}
                        alt="Cute Reaction"
                        className="w-full h-full object-cover"
                        draggable="false"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default GifReaction;
