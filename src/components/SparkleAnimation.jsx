import React from 'react';

const SparkleAnimation = () => {
    const sparkles = React.useMemo(() => Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${2 + Math.random() * 3}s`,
        size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-2 h-2',
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
            {sparkles.map((sparkle) => (
                <div
                    key={sparkle.id}
                    className={`absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 sparkle-animate ${sparkle.size}`}
                    style={{
                        left: sparkle.left,
                        top: sparkle.top,
                        animation: `sparkle-twinkle ${sparkle.duration} ease-in-out infinite`,
                        animationDelay: sparkle.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default SparkleAnimation;