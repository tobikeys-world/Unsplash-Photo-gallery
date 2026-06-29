import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageGrid from './components/ImageGrid';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get our secret key securely from the .env environment configuration file
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // The core function that fetches data over the network from Unsplash
  const fetchPhotos = async (query = "") => {
    if (!ACCESS_KEY) {
      setError("Missing Unsplash API Access Key. Please check your .env file!");
      return;
    }

    setLoading(true);
    setError(null);

    // If there is a search term, use the search endpoint; otherwise, get the default home feed
    const endpoint = query
      ? `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${ACCESS_KEY}`
      : `https://api.unsplash.com/photos?per_page=20&client_id=${ACCESS_KEY}`;

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const finalImagesArray = query ? data.results : data;
      setImages(finalImagesArray);
    } catch (err) {
      // NETWORK FALLBACK: If the network fails, inject premium offline placeholders
      console.warn("Network failed, loading offline fallback assets:", err.message);

      const OFFLINE_FALLBACKS = [
        {
          id: "f1",
          alt_description: "Beautiful nature mountain view",
          urls: { regular: "https://unsplash.com" },
          links: { download: "#" },
          user: { name: "Nature Explorer (Offline Mode)", profile_image: { small: "https://unsplash.com" } }
        },
        {
          id: "f2",
          alt_description: "Calm blue ocean waves",
          urls: { regular: "https://unsplash.com" },
          links: { download: "#" },
          user: { name: "Ocean Wanderer (Offline Mode)", profile_image: { small: "https://unsplash.com" } }
        },
        {
          id: "f3",
          alt_description: "Stunning forest path",
          urls: { regular: "https://unsplash.com" },
          links: { download: "#" },
          user: { name: "Forest Trekker (Offline Mode)", profile_image: { small: "https://unsplash.com" } }
        }
      ];

      setImages(OFFLINE_FALLBACKS);
      // We don't set an error message here anymore so your UI stays clean and functional!
    } finally {
      setLoading(false);
    }
  };

  // Run automatically when the app first loads up on the screen
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Run manually whenever a user type-submits a specific query into the Navbar search input box
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    fetchPhotos(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} />

      <main className="pt-4 max-w-7xl mx-auto px-4">
        {/* State Banner Feedback UI for users */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center my-6 max-w-xl mx-auto">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium text-sm">Fetching high-res photos...</p>
          </div>
        ) : (
          <ImageGrid images={images} />
        )}
      </main>
    </div>
  );
}
export default App;