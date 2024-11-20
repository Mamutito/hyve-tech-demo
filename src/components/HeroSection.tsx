import heroBackground from "../assets/hero-background.jpg";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <div
      className="bg-cover bg-center py-16"
      style={{
        backgroundImage: `url(${heroBackground})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[#419DB4] text-sm font-medium mb-2">
            WINTER COMFORT, TIMELESS DESIGN
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Our Winter Furniture Collection
          </h2>
          <p className="text-gray-600 mb-6">
            Transform your space with pieces designed for warmth and style this
            season.
          </p>
          <Button className="bg-[#419DB4] hover:bg-[#3A8CA0]">BUY NOW</Button>
        </div>
      </div>
    </div>
  );
}
