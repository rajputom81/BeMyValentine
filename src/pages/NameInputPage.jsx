import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Copy, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import FloatingHearts from '@/components/FloatingHearts';
import SparkleAnimation from '@/components/SparkleAnimation';
import Footer from '@/components/Footer';

function NameInputPage() {
    const [recipientName, setRecipientName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const { toast } = useToast();

    const handleGenerate = (e) => {
        e.preventDefault();

        if (!recipientName.trim()) {
            toast({
                title: "Oops! 💔",
                description: "Please enter her name to create your magical link!",
                variant: "destructive"
            });
            return;
        }

        const params = new URLSearchParams({
            name: recipientName.trim()
        });
        const link = `${window.location.origin}/valentine?${params.toString()}`;
        setGeneratedLink(link);

        toast({
            title: "Link Created! 💖",
            description: "Your personalized Valentine proposal is ready to share!",
        });
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedLink);
            toast({
                title: "Copied! 📋",
                description: "Link copied to clipboard.",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to copy link.",
                variant: "destructive"
            });
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Be My Valentine? 💕',
                    text: `Hey ${recipientName}, I have a special question for you...`,
                    url: generatedLink
                });
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err);
            }
        } else {
            handleCopy();
        }
    };

    return (
        <>
            <Helmet>
                <title>Create Your Valentine Proposal | Be My Valentine</title>
                <meta name="description" content="Create a personalized Valentine's Day proposal" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 flex items-center justify-center px-4 pt-8 pb-32 overflow-hidden relative">
                <FloatingHearts />
                <SparkleAnimation />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-lg relative z-20"
                >
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="inline-flex items-center justify-center p-4 bg-white/30 backdrop-blur-md rounded-full shadow-lg mb-6"
                        >
                            <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
                        </motion.div>
                        <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-4 drop-shadow-sm">
                            Valentine Proposal
                        </h1>
                        <p className="text-lg text-gray-700 font-poppins max-w-sm mx-auto">
                            Create a magical moment she'll never forget.
                        </p>
                    </div>

                    <motion.div
                        className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-6 md:p-8"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <form onSubmit={handleGenerate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-800 font-poppins ml-1">
                                    Enter his / her name
                                </label>
                                <input
                                    type="text"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    placeholder="e.g., Romeo / Juliet"
                                    className="w-full px-5 py-4 rounded-xl bg-white/70 border-2 border-transparent focus:border-rose-400 focus:ring-0 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-poppins shadow-inner"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-7 text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                            >
                                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                                Create Proposal
                            </Button>
                        </form>

                        {generatedLink && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-8 pt-6 border-t border-white/40"
                            >
                                <div className="text-center mb-4">
                                    <p className="text-sm font-medium text-rose-800 mb-2">
                                        {recipientName}'s Valentine Proposal Link:
                                    </p>
                                </div>
                                <div className="bg-white/50 rounded-xl p-4 mb-4 break-all font-mono text-sm text-rose-900 border border-rose-100">
                                    {generatedLink}
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleCopy}
                                        variant="outline"
                                        className="flex-1 border-rose-300 text-rose-700 hover:bg-rose-50"
                                    >
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy
                                    </Button>
                                    <Button
                                        onClick={handleShare}
                                        className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                    >
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
                <Footer />
            </div>
        </>
    );
}

export default NameInputPage;