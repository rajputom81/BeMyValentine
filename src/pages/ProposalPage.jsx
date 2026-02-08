import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import FloatingHearts from '@/components/FloatingHearts';
import Confetti from '@/components/Confetti';
import SparkleAnimation from '@/components/SparkleAnimation';
import GifReaction from '@/components/GifReaction';
import NoButton from '@/components/NoButton';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useConfetti } from '@/hooks/useConfetti';

function ProposalPage() {
    const [searchParams] = useSearchParams();
    const girlName = searchParams.get('name') || 'Beautiful';

    const [noAttemptCount, setNoAttemptCount] = useState(0);
    const [isYesClicked, setIsYesClicked] = useState(false);
    const { isActive: confettiActive, trigger: triggerConfetti } = useConfetti();

    const handleNoInteraction = () => {
        setNoAttemptCount(prev => prev + 1);
    };

    const handleYes = () => {
        setIsYesClicked(true);
        triggerConfetti();
        document.body.classList.add('shake-animation');

        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    };

    return (
        <>
            <Helmet>
                <title>{`${girlName}, Will You Be My Valentine? 💕`}</title>
                <meta name="description" content="A special question for a special person." />
            </Helmet>

            {/* 
        Z-Index Layering:
        Background: default (0)
        FloatingHearts: z-10 (in component)
        SparkleAnimation: z-20 (updated in style below or in component)
        Content: z-30
      */}
            <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-rose-100 flex items-center justify-center p-4 pb-20 overflow-hidden relative selection:bg-rose-200 selection:text-rose-900">
                <FloatingHearts />
                <div className="relative z-20">
                    <SparkleAnimation />
                </div>
                <Confetti isActive={confettiActive} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl relative z-30 text-center"
                >
                    {/* Main Card */}
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-2xl p-6 md:p-12 relative">

                        {/* Decorative top sheen */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-[3rem]"></div>

                        <GifReaction
                            isYesClicked={isYesClicked}
                            triggerChange={noAttemptCount}
                        />

                        <div className="mb-8 min-h-[120px] flex items-center justify-center relative z-20">
                            {isYesClicked ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <h1 className="font-playfair text-4xl md:text-6xl font-bold text-rose-600 leading-tight drop-shadow-sm">
                                        YAY! 🎉
                                    </h1>
                                    <p className="font-poppins text-lg md:text-xl text-gray-800 max-w-md mx-auto leading-relaxed">
                                        You just made me the happiest person alive ❤️
                                    </p>
                                </motion.div>
                            ) : (
                                <h1 className="font-playfair text-3xl md:text-5xl font-bold text-gray-800 leading-tight drop-shadow-sm">
                                    {girlName}, will you be <br />
                                    <span className="text-rose-600">my</span> Valentine?
                                </h1>
                            )}
                        </div>

                        {!isYesClicked && (
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 relative z-30 min-h-[100px]">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full animate-screen-glow"></div>
                                    <Button
                                        onClick={handleYes}
                                        className="relative px-12 py-8 text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full shadow-xl min-w-[200px] border-4 border-white/20 overflow-hidden animate-glow-pulse"
                                    >
                                        <span className="relative z-10">YES! 💕</span>

                                        {/* Hover Sparkles */}
                                        <div className="absolute inset-0 z-0">
                                            <Sparkles className="absolute top-2 left-4 w-6 h-6 text-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                                            <Sparkles className="absolute bottom-3 right-5 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity animate-pulse delay-75" />
                                            <Heart className="absolute top-[-10px] right-[-10px] w-8 h-8 text-pink-300 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity" fill="currentColor" />
                                        </div>
                                    </Button>
                                </motion.div>

                                <NoButton
                                    onInteraction={handleNoInteraction}
                                    attemptCount={noAttemptCount}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
                <Footer />
            </div>
        </>
    );
}

export default ProposalPage;