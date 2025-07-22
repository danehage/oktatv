import { Play, Info, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { FeaturedVideo } from "../../shared/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HeroSectionProps {
  featuredVideo: FeaturedVideo;
}

export function HeroSection({ featuredVideo }: HeroSectionProps) {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredVideo.heroImage}
          alt={featuredVideo.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to high-quality hero image if original fails
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&q=90`;
          }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Category Badge */}
            <Badge
              variant="outline"
              className="mb-4 border-okta-blue text-okta-blue bg-okta-blue/10 backdrop-blur-sm"
            >
              Featured • {featuredVideo.category.name}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {featuredVideo.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
              {featuredVideo.shortDescription}
            </p>

            {/* Meta Information */}
            <div className="flex items-center text-white/80 text-sm space-x-4 mb-8">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {featuredVideo.duration}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {featuredVideo.views.toLocaleString()} views
              </div>
              {featuredVideo.presenter && (
                <span>• {featuredVideo.presenter}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={`/watch/${featuredVideo.id}`}>
                <Button
                  size="lg"
                  className="bg-okta-blue hover:bg-okta-blue-dark text-white px-8"
                >
                  <Play className="w-5 h-5 mr-2 fill-white" />
                  Watch Now
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8"
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
