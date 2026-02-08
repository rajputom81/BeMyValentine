import { useState, useCallback } from 'react';

export const useConfetti = () => {
    const [isActive, setIsActive] = useState(false);

    const trigger = useCallback(() => {
        setIsActive(true);
        // Reset after animation completes
        setTimeout(() => {
            setIsActive(false);
        }, 5000);
    }, []);

    return { isActive, trigger };
};