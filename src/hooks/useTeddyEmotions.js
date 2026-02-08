import { useState, useEffect } from 'react';

// Using Unsplash images as placeholders for the requested GIFs/Images
const IMAGES = {
    happy: "https://images.unsplash.com/photo-1601008034846-636ad815394d",
    sad: "https://images.unsplash.com/photo-1669532868906-4cc210cc30a5",
    celebration: "https://images.unsplash.com/photo-1653373112362-5dd312599a31"
};

export const useTeddyEmotions = (attemptCount, isYesClicked) => {
    const [emotionState, setEmotionState] = useState({
        name: 'happy',
        src: IMAGES.happy,
        animationClass: 'animate-float-idle',
        alt: 'Happy Teddy'
    });

    useEffect(() => {
        if (isYesClicked) {
            setEmotionState({
                name: 'celebration',
                src: IMAGES.celebration,
                animationClass: 'animate-celebration',
                alt: 'Celebrating Teddy'
            });
            return;
        }

        if (attemptCount === 0) {
            setEmotionState({
                name: 'happy',
                src: IMAGES.happy,
                animationClass: 'animate-float-idle',
                alt: 'Happy Teddy'
            });
        } else if (attemptCount === 1) {
            setEmotionState({
                name: 'sad',
                src: IMAGES.sad,
                animationClass: 'animate-bounce-emotion',
                alt: 'Sad Teddy'
            });
        } else if (attemptCount === 2) {
            setEmotionState({
                name: 'sadder',
                src: IMAGES.sad,
                animationClass: 'animate-shake-gentle',
                alt: 'Very Sad Teddy'
            });
        } else if (attemptCount === 3) {
            setEmotionState({
                name: 'crying',
                src: IMAGES.sad,
                animationClass: 'animate-shake-hard',
                alt: 'Crying Teddy'
            });
        } else {
            setEmotionState({
                name: 'dramatic',
                src: IMAGES.sad,
                animationClass: 'animate-dramatic',
                alt: 'Heartbroken Teddy'
            });
        }
    }, [attemptCount, isYesClicked]);

    return emotionState;
};

export const preloadTeddyImages = () => {
    Object.values(IMAGES).forEach(src => {
        const img = new Image();
        img.src = src;
    });
};