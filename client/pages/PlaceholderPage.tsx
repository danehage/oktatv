import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "../components/ui/button";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
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

        {/* Placeholder Content */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8">
            <Construction className="w-16 h-16 text-okta-blue mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              This section is coming soon! We're working hard to bring you the best video experience.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/">
              <Button size="lg" className="bg-okta-blue hover:bg-okta-blue-dark">
                Return to Home
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Request Content
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            Want to see this page completed? Continue prompting to fill in this page content!
          </div>
        </div>

      </div>
    </div>
  );
}
