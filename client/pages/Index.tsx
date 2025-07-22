import { HeroSection } from "../components/HeroSection";
import { VideoRow } from "../components/VideoRow";
import { LoadingState } from "../components/LoadingState";
import { categories, FeaturedVideo } from "../../shared/types";
import { useVimeoVideos } from "../hooks/useVimeoVideos";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Index() {
  const { videos, loading, error, fetchProgress, refetch } = useVimeoVideos();

  // Loading state
  if (loading) {
    return <LoadingState progress={fetchProgress} />;
  }

  // Error state with fallback option
  if (error && videos.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold text-foreground">
            Failed to Load Videos
          </h2>
          <p className="text-muted-foreground">{error}</p>
          <Button
            onClick={refetch}
            className="bg-okta-blue hover:bg-okta-blue-dark"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Create featured video from first video
  const featuredVideo: FeaturedVideo =
    videos.length > 0
      ? {
          ...videos[0],
          isFeatured: true,
          heroImage:
            videos[0].thumbnail ||
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop",
          shortDescription:
            videos[0].description.length > 120
              ? videos[0].description.substring(0, 120) + "..."
              : videos[0].description,
        }
      : {
          id: "1",
          title: "Welcome to OktaTV",
          description: "Your hub for corporate videos",
          vimeoId: "1096708225",
          thumbnail:
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop",
          duration: "0:00",
          category: categories[0],
          tags: [],
          publishedAt: new Date().toISOString().split("T")[0],
          views: 0,
          isFeatured: true,
          heroImage:
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop",
          shortDescription: "Your hub for corporate videos",
        };

  // Group videos by category
  const videosByCategory = categories
    .map((category) => ({
      category,
      videos: videos.filter((video) => video.category.id === category.id),
    }))
    .filter((group) => group.videos.length > 0);

  // Recent videos (all videos sorted by date)
  const recentVideos = [...videos].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  // Popular videos (sorted by views)
  const popularVideos = [...videos].sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-background">
      {/* Show error message if there was an issue but we have fallback data */}
      {error && videos.length > 0 && (
        <div className="bg-destructive/10 border-l-4 border-destructive p-4 container mx-auto">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-destructive mr-2" />
            <p className="text-sm text-destructive">
              Some video data may be outdated. Using cached data.
              <Button
                variant="link"
                onClick={refetch}
                className="ml-2 p-0 h-auto text-destructive"
              >
                Retry loading
              </Button>
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection featuredVideo={featuredVideo} />

      {/* Video Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Recently Added */}
        {recentVideos.length > 0 && (
          <VideoRow title="Recently Added" videos={recentVideos} />
        )}

        {/* Popular This Week */}
        {popularVideos.length > 0 && (
          <VideoRow title="Popular This Week" videos={popularVideos} />
        )}

        {/* Category Sections */}
        {videosByCategory.map(({ category, videos: categoryVideos }) => (
          <VideoRow
            key={category.id}
            title={category.name}
            videos={categoryVideos}
            category={category}
          />
        ))}

        {/* Continue Watching (placeholder for future implementation) */}
        {videos.length > 3 && (
          <VideoRow title="Continue Watching" videos={videos.slice(0, 3)} />
        )}
      </div>
    </div>
  );
}
