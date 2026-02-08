import React, { useEffect, useState } from 'react';

const Confetti = ({ isActive }) => {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        if (isActive) {
            const newPieces = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 0.5}s`,
                duration: `${2 + Math.random() * 2}s`,
                rotation: Math.random() * 360,
                color: ['#FF69B4', '#FF1493', '#FFC0CB', '#FFB6C1', '#FFD700', '#FF6347'][Math.floor(Math.random() * 6)]
            }));
            setPieces(newPieces);
        }
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {pieces.map((piece) => (
                <div
                    key={piece.id}
                    className="absolute top-[-20px] w-3 h-3 confetti-piece"
                    style={{
                        left: piece.left,
                        backgroundColor: piece.color,
                        animationDelay: piece.delay,
                        animationDuration: piece.duration,
                        transform: `rotate(${piece.rotation}deg)`
                    }}
                />
            ))}
        </div>
    );
};

export default Confetti;