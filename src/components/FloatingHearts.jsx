import React from 'react';

const FloatingHearts = () => {
    const hearts = React.useMemo(() => Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${8 + Math.random() * 4}s`,
        size: Math.random() > 0.5 ? 'text-2xl' : Math.random() > 0.5 ? 'text-3xl' : 'text-4xl',
        opacity: Math.random() * 0.3 + 0.1
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className={`absolute bottom-[-50px] ${heart.size} floating-heart`}
                    style={{
                        left: heart.left,
                        animationDelay: heart.delay,
                        animationDuration: heart.duration,
                        opacity: heart.opacity
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
};

export default FloatingHearts;