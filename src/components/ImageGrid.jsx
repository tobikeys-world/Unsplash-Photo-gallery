import ImageCard from './ImageCard';
function ImageGrid({ images }) {
    if (images.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No images found. Try searching for something else!</p>
            </div>
        );
    }

    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4 mx-auto max-w-7xl">
            {images.map((image) => (
                <ImageCard key={image.id} image={image} />
            ))}
        </div>
    );
}

export default ImageGrid;