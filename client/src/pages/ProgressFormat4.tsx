import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Upload, Save, Camera } from "lucide-react";
import { mockInfrastructureWorks, mockVillages } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function ProgressFormat4() {
  const { toast } = useToast();
  const [selectedVillage, setSelectedVillage] = useState("");
  const [progressData, setProgressData] = useState<Record<string, { percent: number; remarks: string }>>({});

  const handleProgressChange = (workId: string, percent: number) => {
    setProgressData((prev) => ({
      ...prev,
      [workId]: { ...prev[workId], percent },
    }));
  };

  const handleRemarksChange = (workId: string, remarks: string) => {
    setProgressData((prev) => ({
      ...prev,
      [workId]: { ...prev[workId], remarks },
    }));
  };

  const handleSave = (workId: string) => {
    toast({
      title: "Success",
      description: "Progress updated successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "not_started":
        return <Badge variant="destructive">Not Started</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-chart-3 text-white">In Progress</Badge>;
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Submit Progress - Format IV (Infrastructure Works)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gramPanchayat">Gram Panchayat <span className="text-destructive">*</span></Label>
                  <Select>
                    <SelectTrigger id="gramPanchayat" data-testid="select-gram-panchayat">
                      <SelectValue placeholder="--Select Gram Panchayat--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="450010">Delhi West - 450010</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Village <span className="text-destructive">*</span></Label>
                  <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                    <SelectTrigger id="village" data-testid="select-village">
                      <SelectValue placeholder="--Select Village--" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVillages.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.villageName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="default" data-testid="button-view">
                    View Works
                  </Button>
                </div>
              </div>
            </div>

            {selectedVillage && (
              <div className="space-y-4">
                {mockInfrastructureWorks.map((work) => (
                  <Card key={work.id} className="overflow-hidden">
                    <CardHeader className="bg-chart-3/10 py-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{work.workName}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Domain: {work.domain} | Indicator: {work.monitorableIndicator}
                          </p>
                        </div>
                        {getStatusBadge(work.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Estimated Cost</Label>
                          <p className="font-medium">Rs. {work.estimatedCost?.toLocaleString("en-IN")}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Total Funds</Label>
                          <p className="font-medium">Rs. {work.totalFunds?.toLocaleString("en-IN")}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Implementing Agency</Label>
                          <p className="font-medium">{work.implementingAgency}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Duration</Label>
                          <p className="font-medium">{work.duration}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Progress (%)</Label>
                            <span className="font-medium">
                              {progressData[work.id]?.percent ?? work.progressPercent}%
                            </span>
                          </div>
                          <Slider
                            value={[progressData[work.id]?.percent ?? work.progressPercent ?? 0]}
                            onValueChange={(value) => handleProgressChange(work.id, value[0])}
                            max={100}
                            step={5}
                            className="w-full"
                            data-testid={`slider-progress-${work.id}`}
                          />
                          <Progress 
                            value={progressData[work.id]?.percent ?? work.progressPercent ?? 0} 
                            className="h-2"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`remarks-${work.id}`}>Remarks</Label>
                            <Textarea
                              id={`remarks-${work.id}`}
                              value={progressData[work.id]?.remarks ?? work.remarks ?? ""}
                              onChange={(e) => handleRemarksChange(work.id, e.target.value)}
                              placeholder="Enter progress remarks..."
                              rows={3}
                              data-testid={`textarea-remarks-${work.id}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Upload Photo</Label>
                            <div className="border-2 border-dashed rounded-lg p-4 text-center">
                              <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="text-xs text-muted-foreground mt-2">
                                Click or drag to upload progress photo
                              </p>
                              <Button variant="outline" size="sm" className="mt-2 gap-1">
                                <Upload className="h-4 w-4" />
                                Browse
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <p className="text-xs text-muted-foreground">
                            Last Updated: {work.lastUpdated ? new Date(work.lastUpdated).toLocaleString("en-IN") : "-"}
                          </p>
                          <Button
                            size="sm"
                            className="gap-1"
                            onClick={() => handleSave(work.id)}
                            data-testid={`button-save-${work.id}`}
                          >
                            <Save className="h-4 w-4" />
                            Save Progress
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
