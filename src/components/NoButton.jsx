import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimationControls } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PHRASES = [
    "No",
    "Are you sure?",
    "What if I asked really nicely?",
    "Pretty please 🥺",
    "With a chocolate rice cake on top?",
    "What about a matcha frostie?",
    "Please pookie ❤️",
    "I'll be very sad...",
    "Last chance!!!"
];

const NoButton = ({ onInteraction, attemptCount = 0 }) => {
    const [isFixed, setIsFixed] = useState(false);
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);
    const controls = useAnimationControls();

    // Throttle ref to prevent double-firing
    const lastInteractionTimeRef = useRef(0);

    // Debug helper
    const log = (msg, data = {}) => {
        console.log(`[NoButton Debug] ${msg}`, data);
    };

    // Calculate a safe random position
    const getSafePosition = (startX, startY) => {
        const vWidth = window.innerWidth;
        const vHeight = window.innerHeight;

        // Grid-based random positioning
        const cols = 3;
        const rows = 3;
        const cellWidth = vWidth / cols;
        const cellHeight = vHeight / rows;

        // Determine current grid cell (if valid)
        const currentCol = Math.floor(startX / cellWidth);
        const currentRow = Math.floor(startY / cellHeight);

        let targetCol, targetRow;
        let attempts = 0;

        // Pick a random DIFFERENT cell
        do {
            targetCol = Math.floor(Math.random() * cols);
            targetRow = Math.floor(Math.random() * rows);
            attempts++;
        } while (
            (targetCol === currentCol && targetRow === currentRow) && attempts < 20
        );

        // Button dimensions (safe estimate)
        const btnWidth = 340;
        const btnHeight = 180;
        const padding = 30;

        // Calculate random position WITHIN the target cell
        const minX = Math.max(padding, targetCol * cellWidth + padding);
        const maxX = Math.max(minX, Math.min((targetCol + 1) * cellWidth - btnWidth - padding, vWidth - btnWidth - padding));

        const minY = Math.max(padding, targetRow * cellHeight + padding);
        const maxY = Math.max(minY, Math.min((targetRow + 1) * cellHeight - btnHeight - padding, vHeight - btnHeight - padding));

        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;

        return { x: newX, y: newY };
    };

    const moveButton = async (e) => {
        const now = Date.now();
        // Simple throttle: If interactions are less than 100ms apart, ignore.
        // This handles double-firing (touchstart + click) without blocking user intent.
        if (now - lastInteractionTimeRef.current < 100) {
            return;
        }
        lastInteractionTimeRef.current = now;

        log('Interaction triggered', { type: e?.type, attemptCount });

        if (e && e.type !== 'touchstart' && e.preventDefault) {
            // Only preventDefault on non-passive events (like click)
            // touchstart is passive by default in React 18+ for some elements
            e.preventDefault();
        }
        if (e && e.stopPropagation) e.stopPropagation();

        // 1. Notify parent ALWAYS (Updates text/gifs)
        onInteraction();

        // 2. Haptic feedback
        if (navigator.vibrate) navigator.vibrate(50);

        // 3. Determine Start Position (for grid logic)
        let startX = currentPos.x;
        let startY = currentPos.y;

        // If this is the FIRST interaction, we need to switch to fixed
        if (!isFixed && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            startX = rect.left;
            startY = rect.top;
            log('Initializing fixed position', { startX, startY });

            // Set initial position state so the Portal knows where to start rendering
            setCurrentPos({ x: startX, y: startY });
            setIsFixed(true);
            // Note: createPortal will kick in on next render.
            // We calculate the NEXT jump immediately below.
        }

        // 4. Calculate NEW Target Position
        // If we just switched to fixed, startX/Y are correct.
        // If we are already fixed, currentPos.x/y are correct.
        const { x: newX, y: newY } = getSafePosition(startX, startY);
        log('New Target Calculated', { newX, newY });

        // 5. Update State & Animate
        // We update state immediately to ensure the component re-renders with the new coordinate base
        setCurrentPos({ x: newX, y: newY });

        // Force animation to new coordinates
        try {
            await controls.start({
                left: `${newX}px`,
                top: `${newY}px`,
                scale: [1, 0.9, 1.05, 1],
                transition: {
                    type: "tween",
                    duration: 0.3, // Slightly faster for responsiveness
                    ease: "easeInOut"
                }
            });
            log('Animation completed');
        } catch (err) {
            log('Animation interrupted or failed', err);
        }
    };

    // Text logic: Cycle through phrases if we go past the end
    // Text logic: Cycle through phrases, skipping the first "No" after the initial attempt
    // If we've started interacting, we never want to see just "No" again.
    const currentText = attemptCount === 0
        ? PHRASES[0]
        : PHRASES[1 + (attemptCount - 1) % (PHRASES.length - 1)];

    const buttonContent = (
        <motion.div
            animate={controls}
            // FORCE fixed positioning and touch-action override
            className={`${isFixed ? 'fixed' : 'relative'} z-[9999] touch-none`}
            initial={false}
            // We can bind the style to state, but framer-motion 'animate' prop will override it mostly.
            // Keeping it for the initial render of the portal.
            style={isFixed ? {
                left: `${currentPos.x}px`,
                top: `${currentPos.y}px`,
                position: 'fixed'
            } : {}}
            // Add interaction handlers to the container to catch everything
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={moveButton}
        >
            <Button
                ref={buttonRef}
                variant="outline"
                className={`
                    min-w-[140px] px-4 py-3 h-auto min-h-[52px] text-lg font-bold
                    bg-rose-100/90 backdrop-blur-md border-2 border-rose-200 hover:bg-rose-200 hover:border-rose-300
                    text-rose-600 rounded-full shadow-2xl select-none 
                    transition-all duration-300 active:scale-90 max-w-[90vw] break-words whitespace-normal leading-tight mx-auto flex items-center justify-center
                `}
                // Remove internal handlers to prevent bubbling issues, let parent div handle it
                style={{ pointerEvents: 'none' }}
            >
                <span className="pointer-events-auto">
                    {currentText}
                </span>
            </Button>
        </motion.div>
    );

    if (isFixed) {
        return createPortal(buttonContent, document.body);
    }

    return buttonContent;
};

export default NoButton;