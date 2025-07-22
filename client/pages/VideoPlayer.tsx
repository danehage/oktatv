import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, ThumbsUp, Download, Clock, Eye, Calendar } from "lucide-react";
import { mockVideos } from "../../shared/types";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { VideoRow } from "../components/VideoRow";

export default function VideoPlayer() {
  const { videoId } = useParams();
  const video = mockVideos.find(v => v.id === videoId);

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Related videos from same category
  const relatedVideos = mockVideos
    .filter(v => v.id !== video.id && v.category.id === video.category.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
              <iframe
                src={`https://player.vimeo.com/video/${video.vimeoId}?h=0&byline=0&portrait=0&title=0&speed=0&transparent=0&gesture=media`}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            </div>

            {/* Video Information */}
            <div className="space-y-6">
              
              {/* Title and Category */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge 
                    variant="outline" 
                    className={`border-none text-white font-medium ${
                      video.category.color === 'okta-blue' && "bg-okta-blue",
                      video.category.color === 'okta-green' && "bg-okta-green",
                      video.category.color === 'primary' && "bg-primary",
                      video.category.color === 'destructive' && "bg-destructive",
                      video.category.color === 'secondary' && "bg-secondary"
                    }`}
                  >
                    {video.category.name}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {video.title}
                </h1>
              </div>

              {/* Video Meta */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {video.views.toLocaleString()} views
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {video.duration}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(video.publishedAt).toLocaleDateString()}
                </div>
                {video.presenter && (
                  <div>
                    Presented by <span className="text-foreground font-medium">{video.presenter}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground mb-3">About this video</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Video Details
              </h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Department:</span>
                  <div className="font-medium">{video.department || 'N/A'}</div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <div className="font-medium">{video.category.name}</div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Published:</span>
                  <div className="font-medium">
                    {new Date(video.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <div className="font-medium">{video.duration}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Related Videos */}
        {relatedVideos.length > 0 && (
          <div className="mt-12">
            <VideoRow 
              title={`More from ${video.category.name}`}
              videos={relatedVideos}
            />
          </div>
        )}

      </div>
    </div>
  );
}
