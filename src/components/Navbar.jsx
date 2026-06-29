import { useState } from 'react';
import React from 'react';

function Navbar({ onSearch }) {
    const [input, setInput] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input);
        }
    };
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Left: Brand Logo Placeholder */}
            <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <span className="text-white font-black text-xl">U</span>
                </div>
                <span className="font-bold text-xl tracking-tight hidden sm:block">SplashClone</span>
            </div>

            {/* Middle: Search Bar Form */}
            <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-6">
                <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
                    <span className="absolute left-4 pointer-events-none">🔍</span>
                    <input
                        type="text"
                        placeholder="Search high-resolution photos..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                    />
                </div>
            </form>

            {/* Right: Dummy Navigation Links */}
            <div className="flex items-center space-x-6 text-sm font-medium text-gray-500">
                <span className="hover:text-black cursor-pointer hidden md:block">Explore</span>
                <span className="hover:text-black cursor-pointer hidden md:block">Advertise</span>
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Submit Photo
                </button>
            </div>
        </nav>
    );
}



export default Navbar;

