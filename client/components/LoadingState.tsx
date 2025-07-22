import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  description?: string;
  progress?: { fetched: number; total: number };
}

export function LoadingState({ 
  title = "Loading OktaTV", 
  description = "Fetching video data from Vimeo...",
  progress 
}: LoadingStateProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-okta-blue mx-auto" />
          
          {/* Progress ring overlay */}
          {progress && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 14}`}
                  strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress.fetched / progress.total)}`}
                  className="text-okta-blue transition-all duration-300"
                />
              </svg>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
          
          {progress && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Loading {progress.fetched} of {progress.total} videos
              </p>
              <div className="w-64 bg-muted rounded-full h-2 mx-auto">
                <div 
                  className="bg-okta-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.fetched / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
