import { useState, useEffect } from "react";
import { Video, VideoCategory, categories } from "../../shared/types";

interface VimeoVideoMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: string;
  presenter: string;
}

interface VimeoApiResponse {
  success: boolean;
  videos: VimeoVideoMetadata[];
  totalFetched: number;
  totalRequested: number;
}

// Map video IDs to categories and additional metadata
const videoMapping: Record<
  string,
  { category: VideoCategory; tags: string[]; department: string }
> = {
  "1096708225": {
    category: categories[1], // Town Halls
    tags: ["quarterly", "ceo", "strategy"],
    department: "Executive",
  },
  "1096259913": {
    category: categories[0], // Training
    tags: ["security", "identity", "best practices"],
    department: "Security",
  },
  "1096259876": {
    category: categories[2], // Onboarding
    tags: ["onboarding", "culture", "welcome"],
    department: "Human Resources",
  },
  "1096265123": {
    category: categories[4], // Product
    tags: ["product", "technical", "customer identity"],
    department: "Product",
  },
  "1023285402": {
    category: categories[3], // Leadership
    tags: ["leadership", "teams", "management"],
    department: "Leadership",
  },
  "1096259851": {
    category: categories[0], // Training
    tags: ["api", "security", "workshop"],
    department: "Engineering",
  },
  "1103160254": {
    category: categories[0], // Training
    tags: ["zero trust", "architecture", "security"],
    department: "Security",
  },
  "1103161104": {
    category: categories[4], // Product
    tags: ["roadmap", "product", "features"],
    department: "Product",
  },
  "1053808307": {
    category: categories[0], // Training
    tags: ["governance", "compliance", "training"],
    department: "Training",
  },
  "1051277253": {
    category: categories[3], // Leadership
    tags: ["workshop", "leadership", "management"],
    department: "Leadership Development",
  },
  "1051694947": {
    category: categories[1], // Town Halls
    tags: ["customer success", "case studies", "testimonials"],
    department: "Customer Success",
  },
};

export function useVimeoVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchProgress, setFetchProgress] = useState<{
    fetched: number;
    total: number;
  } | null>(null);

  const fetchVimeoData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching Vimeo video data...");

      const response = await fetch("/api/vimeo/videos");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: VimeoApiResponse = await response.json();

      if (!data.success) {
        throw new Error("Failed to fetch video data from Vimeo API");
      }

      setFetchProgress({
        fetched: data.totalFetched,
        total: data.totalRequested,
      });

      // Transform Vimeo data into our Video format
      const transformedVideos: Video[] = data.videos.map(
        (vimeoVideo, index) => {
          const mapping = videoMapping[vimeoVideo.id] || {
            category: categories[0],
            tags: ["general"],
            department: "General",
          };

          return {
            id: (index + 1).toString(),
            title: vimeoVideo.title,
            description: vimeoVideo.description,
            vimeoId: vimeoVideo.id,
            thumbnail:
              vimeoVideo.thumbnail ||
              `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop`,
            duration: vimeoVideo.duration,
            category: mapping.category,
            tags: mapping.tags,
            publishedAt: vimeoVideo.publishedAt,
            views: vimeoVideo.views,
            presenter: vimeoVideo.presenter,
            department: mapping.department,
          };
        },
      );

      setVideos(transformedVideos);
      console.log(
        `Successfully loaded ${transformedVideos.length} videos with real Vimeo data`,
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Error fetching Vimeo data:", errorMessage);
      setError(errorMessage);

      // Fallback to mock data if Vimeo fetch fails
      console.log("Falling back to mock data...");
      const { mockVideos } = await import("../../shared/types");
      setVideos(mockVideos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVimeoData();
  }, []);

  const refetch = () => {
    fetchVimeoData();
  };

  return {
    videos,
    loading,
    error,
    fetchProgress,
    refetch,
  };
}
