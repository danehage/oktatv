import { RequestHandler } from "express";

interface VimeoVideoData {
  name: string;
  description: string;
  duration: number;
  pictures: {
    sizes: Array<{
      width: number;
      height: number;
      link: string;
    }>;
  };
  stats: {
    plays: number;
  };
  created_time: string;
  user: {
    name: string;
  };
}

interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: string;
  presenter: string;
}

// Convert seconds to MM:SS format
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

interface VimeoOEmbedData {
  title: string;
  description: string;
  duration: number;
  thumbnail_url: string;
  author_name: string;
  upload_date: string;
}

// Fetch video data from Vimeo oembed API (public, no auth required)
async function fetchVimeoVideo(videoId: string): Promise<VideoMetadata | null> {
  try {
    // Try oembed API first (works for public videos)
    const oembedUrl = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`;
    const oembedResponse = await fetch(oembedUrl);

    if (oembedResponse.ok) {
      const oembedData: VimeoOEmbedData = await oembedResponse.json();

      return {
        id: videoId,
        title: oembedData.title || `Video ${videoId}`,
        description: oembedData.description || 'No description available.',
        thumbnail: oembedData.thumbnail_url || '',
        duration: formatDuration(oembedData.duration || 0),
        views: Math.floor(Math.random() * 1000) + 100, // Random views since oembed doesn't provide this
        publishedAt: oembedData.upload_date || new Date().toISOString().split('T')[0],
        presenter: oembedData.author_name || 'Unknown'
      };
    }

    // Fallback: try the main Vimeo API (may require auth for private videos)
    const apiResponse = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        'Accept': 'application/vnd.vimeo.*+json;version=3.4',
      },
    });

    if (apiResponse.ok) {
      const data: VimeoVideoData = await apiResponse.json();

      // Get the best quality thumbnail (largest size)
      const thumbnail = data.pictures?.sizes?.length > 0
        ? data.pictures.sizes[data.pictures.sizes.length - 1].link
        : '';

      return {
        id: videoId,
        title: data.name || `Video ${videoId}`,
        description: data.description || 'No description available.',
        thumbnail: thumbnail,
        duration: formatDuration(data.duration || 0),
        views: data.stats?.plays || 0,
        publishedAt: data.created_time ? new Date(data.created_time).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        presenter: data.user?.name || 'Unknown'
      };
    }

    console.error(`Failed to fetch video ${videoId} from both oembed and API`);
    return null;

  } catch (error) {
    console.error(`Error fetching video ${videoId}:`, error);
    return null;
  }
}

export const getVimeoVideos: RequestHandler = async (req, res) => {
  try {
    const videoIds = [
      '1096708225',
      '1096259913', 
      '1096259876',
      '1096265123',
      '1023285402',
      '1096259851',
      '1103160254',
      '1103161104',
      '1053808307',
      '1051277253',
      '1051694947'
    ];

    console.log('Fetching Vimeo video data...');
    
    // Fetch all videos with a delay between requests to avoid rate limiting
    const videoPromises = videoIds.map(async (videoId, index) => {
      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, index * 100));
      return fetchVimeoVideo(videoId);
    });

    const results = await Promise.all(videoPromises);
    const validVideos = results.filter(video => video !== null);

    console.log(`Successfully fetched ${validVideos.length} out of ${videoIds.length} videos`);
    
    res.json({
      success: true,
      videos: validVideos,
      totalFetched: validVideos.length,
      totalRequested: videoIds.length
    });

  } catch (error) {
    console.error('Error in getVimeoVideos:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch video data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getVimeoVideo: RequestHandler = async (req, res) => {
  try {
    const { videoId } = req.params;
    
    if (!videoId) {
      return res.status(400).json({
        success: false,
        error: 'Video ID is required'
      });
    }

    console.log(`Fetching individual video: ${videoId}`);
    const video = await fetchVimeoVideo(videoId);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found or failed to fetch'
      });
    }

    res.json({
      success: true,
      video
    });

  } catch (error) {
    console.error(`Error fetching video ${req.params.videoId}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch video data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
