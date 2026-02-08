import React from 'react';

const Footer = () => {
    return (
        <div className="absolute bottom-4 left-0 w-full text-center z-50 pointer-events-none select-none">
            <div className="pointer-events-auto inline-block bg-white/10 backdrop-blur-[2px] px-4 py-2 rounded-full border border-white/20 shadow-sm mt-8 mx-auto">
                <p className="text-gray-500/90 text-xs font-poppins font-medium tracking-wide">
                    Designed & Developed by <span className="font-bold text-rose-500 hover:text-rose-600 transition-colors">Hustle Web Studio</span>
                </p>
                <div className="border-t border-rose-200/50 my-1 w-1/2 mx-auto"></div>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-[10px] text-gray-500/80 font-poppins mt-1">
                    <a
                        href="tel:9274312848"
                        className="hover:text-rose-500 hover:underline transition-all duration-300 flex items-center gap-1"
                    >
                        📞 9274312848
                    </a>
                    <span className="hidden md:inline text-rose-300">•</span>
                    <a
                        href="mailto:hustlewebstudios@gmail.com"
                        className="hover:text-rose-500 hover:underline transition-all duration-300 flex items-center gap-1"
                    >
                        ✉️ hustlewebstudios@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
