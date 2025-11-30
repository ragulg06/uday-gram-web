import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Video } from "lucide-react";
import { tutorialVideos } from "@/lib/mockData";

export default function Tutorials() {
  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Tutorial Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Learn how to use the PM-AJAY portal with our comprehensive video tutorials
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutorialVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover-elevate" data-testid={`video-card-${video.id}`}>
                  <div className="aspect-video bg-muted relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Video className="h-12 w-12 text-muted-foreground" />
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </Badge>
                    </div>
                    <Button
                      size="icon"
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-primary/90 hover:bg-primary"
                      data-testid={`button-play-${video.id}`}
                    >
                      <Play className="h-6 w-6 fill-current" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{video.title}</h3>
                    <p className="text-xs text-muted-foreground">{video.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Need more help?</h3>
              <p className="text-sm text-muted-foreground">
                If you need additional assistance, please visit our{" "}
                <a href="/faq" className="text-primary hover:underline">FAQ section</a> or{" "}
                <a href="/help" className="text-primary hover:underline">contact support</a>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
