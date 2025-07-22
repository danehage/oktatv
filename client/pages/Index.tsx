import { HeroSection } from "../components/HeroSection";
import { VideoRow } from "../components/VideoRow";
import { mockVideos, featuredVideo, categories } from "../../shared/types";

export default function Index() {
  // Group videos by category
  const videosByCategory = categories.map(category => ({
    category,
    videos: mockVideos.filter(video => video.category.id === category.id)
  })).filter(group => group.videos.length > 0);

  // Recent videos (all videos sorted by date)
  const recentVideos = [...mockVideos].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Popular videos (sorted by views)
  const popularVideos = [...mockVideos].sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection featuredVideo={featuredVideo} />

      {/* Video Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Recently Added */}
        <VideoRow
          title="Recently Added"
          videos={recentVideos}
        />

        {/* Popular This Week */}
        <VideoRow
          title="Popular This Week"
          videos={popularVideos}
        />

        {/* Category Sections */}
        {videosByCategory.map(({ category, videos }) => (
          <VideoRow
            key={category.id}
            title={category.name}
            videos={videos}
            category={category}
          />
        ))}

        {/* Continue Watching (placeholder for future implementation) */}
        <VideoRow
          title="Continue Watching"
          videos={mockVideos.slice(0, 3)}
        />

      </div>
    </div>
  );
}
