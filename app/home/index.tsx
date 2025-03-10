import Image from "next/image";
import { useEffect, useState } from "react";

const Homer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white px-6">
      
      {/* Tagline */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center leading-tight">
        Create Stunning Thumbnails  
        <span className="block text-blue-400">Effortlessly</span>
      </h1>
      
      {/* Hero Image */}
      <div className="relative w-full max-w-3xl mt-6">
        <Image
          src={isMobile ? "/mob.png" : "/desk.png"}
          alt="Thumbnail preview"
          width={800}
          height={450}
          className="rounded-lg shadow-lg mx-auto"
        />
      </div>

      {/* Features Section */}
      <section className="mt-10 w-full max-w-4xl grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">3 Beautiful Templates</h2>
          <p className="text-gray-300 text-sm mt-2">Choose from a variety of styles.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Custom Text & Fonts</h2>
          <p className="text-gray-300 text-sm mt-2">Enhance your thumbnails with custom text.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">AI-Powered Object Detection</h2>
          <p className="text-gray-300 text-sm mt-2">Smart placement of text behind objects.</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-bold">Get Started for Free</h2>
        <p className="text-gray-300 mt-2">2 Free Credits · Cheap Extra Credits</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg transition">
          Try Now
        </button>
      </section>
    </main>
  );
};

export default Homer;
