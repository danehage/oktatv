import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Clock, Eye } from "lucide-react";
import { Video } from "../../shared/types";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

interface VideoCardProps {
  video: Video;
  size?: "small" | "medium" | "large";
}

export function VideoCard({ video, size = "medium" }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "w-64 h-36",
    medium: "w-80 h-44",
    large: "w-96 h-52",
  };

  return (
    <div
      className={cn(
        "group relative cursor-pointer transition-all duration-300 hover:scale-105",
        sizeClasses[size],
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/watch/${video.id}`}>
        {/* Thumbnail */}
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-muted">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              // Fallback to a high-quality placeholder if thumbnail fails
              const target = e.target as HTMLImageElement;
              target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop&q=80`;
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Play Button Overlay */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-okta-blue/90 rounded-full backdrop-blur-sm">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="bg-black/70 text-white border-none"
            >
              <Clock className="w-3 h-3 mr-1" />
              {video.duration}
            </Badge>
          </div>

          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <Badge
              variant="outline"
              className={cn(
                "border-none text-white font-medium",
                video.category.color === "okta-blue" && "bg-okta-blue/80",
                video.category.color === "okta-green" && "bg-okta-green/80",
                video.category.color === "primary" && "bg-primary/80",
                video.category.color === "destructive" && "bg-destructive/80",
                video.category.color === "secondary" && "bg-secondary/80",
              )}
            >
              {video.category.name}
            </Badge>
          </div>

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
              {video.title}
            </h3>
            <div className="flex items-center text-white/80 text-sm space-x-3">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {video.views.toLocaleString()} views
              </div>
              {video.presenter && <span>• {video.presenter}</span>}
            </div>
          </div>
        </div>
      </Link>

      {/* Expanded Info on Hover */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-card border border-border rounded-lg p-4 mt-2 transition-all duration-300 z-20",
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none",
        )}
      >
        <h4 className="font-semibold text-foreground mb-2">{video.title}</h4>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {video.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {video.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
