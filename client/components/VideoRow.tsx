import { ChevronLeft, ChevronRight } from "lucide-react";
import { Video, VideoCategory } from "../../shared/types";
import { VideoCard } from "./VideoCard";
import { Button } from "./ui/button";
import { useRef, useState } from "react";

interface VideoRowProps {
  title: string;
  videos: Video[];
  category?: VideoCategory;
}

export function VideoRow({ title, videos }: VideoRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 400;
    const container = scrollContainerRef.current;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    // Update scroll button states
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    }, 300);
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>

      {/* Videos Container */}
      <div className="relative group">
        {/* Left Scroll Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-opacity ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Right Scroll Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-opacity ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Scrollable Videos */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={(e) => {
            const container = e.currentTarget;
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
              container.scrollLeft <
                container.scrollWidth - container.clientWidth,
            );
          }}
        >
          {videos.map((video) => (
            <div key={video.id} className="flex-shrink-0">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
