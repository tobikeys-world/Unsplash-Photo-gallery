import { Download, Heart } from 'lucide-react';

function ImageCard({ image }) {
    return (
        <div className="break-inside-avoid relative group overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
            {/* The Asset Image */}
            <img
                src={image.urls.regular}
                alt={image.alt_description || "Unsplash Photo"}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
            />

            {/* Smooth Hover Mask / UI Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">

                {/* Top Section: Like Button */}
                <div className="flex justify-end">
                    <button className="p-2 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 rounded-lg backdrop-blur transition-colors shadow">
                        <Heart className="w-4 h-4 fill-current" />
                    </button>
                </div>

                {/* Bottom Section: Author and Download Link */}
                <div className="flex justify-between items-center text-white">
                    <div className="flex items-center space-x-2">
                        {/* Author Profile Thumbnail */}
                        <img
                            src={image.user.profile_image.small}
                            alt={image.user.name}
                            className="w-7 h-7 rounded-full border border-white/40"
                        />
                        <span className="text-sm font-semibold truncate max-w-[120px] sm:max-w-[160px]">
                            {image.user.name}
                        </span>
                    </div>

                    {/* Download Button */}
                    <a
                        href={`${image.links.download}&force=true`}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg backdrop-blur transition-colors shadow flex items-center justify-center"
                    >
                        <Download className="w-4 h-4" />
                    </a>
                </div>

            </div>
        </div>
    );
}
export default ImageCard;