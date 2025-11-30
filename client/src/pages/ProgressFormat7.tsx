import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, FileText, Download } from "lucide-react";
import { dashboardStats } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function ProgressFormat7() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    district: "",
    month: "",
    year: "",
    summary: "",
    challenges: "",
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = ["2024", "2023", "2022", "2021"];

  const handleSave = () => {
    if (!formData.district || !formData.month || !formData.year) {
      toast({
        title: "Error",
        description: "Please select district, month, and year",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Monthly report saved successfully",
    });
  };

  const handleGenerate = () => {
    if (!formData.district || !formData.month || !formData.year) {
      toast({
        title: "Error",
        description: "Please select district, month, and year",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Report generated successfully",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Submit Progress - Format VII (Monthly District Report)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">District <span className="text-destructive">*</span></Label>
                  <Select value={formData.district} onValueChange={(value) => setFormData({ ...formData, district: value })}>
                    <SelectTrigger id="district" data-testid="select-district">
                      <SelectValue placeholder="--Select District--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SW">SOUTH WEST</SelectItem>
                      <SelectItem value="NW">NORTH WEST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="month">Month <span className="text-destructive">*</span></Label>
                  <Select value={formData.month} onValueChange={(value) => setFormData({ ...formData, month: value })}>
                    <SelectTrigger id="month" data-testid="select-month">
                      <SelectValue placeholder="--Select Month--" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year <span className="text-destructive">*</span></Label>
                  <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                    <SelectTrigger id="year" data-testid="select-year">
                      <SelectValue placeholder="--Select Year--" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Card className="bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Statistics (Auto-populated)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Villages Onboarded</Label>
                  <Input value={dashboardStats.villagesCovered} disabled className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Households Surveyed</Label>
                  <Input value={dashboardStats.householdsSurveyed.toLocaleString()} disabled className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Infra Works In Progress</Label>
                  <Input value={dashboardStats.infraWorksInProgress} disabled className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Infra Works Completed</Label>
                  <Input value={dashboardStats.infraWorksCompleted} disabled className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Funds Released (Rs.)</Label>
                  <Input value={dashboardStats.fundsReleased.toLocaleString("en-IN")} disabled className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Funds Utilized (Rs.)</Label>
                  <Input value={dashboardStats.fundsUtilized.toLocaleString("en-IN")} disabled className="bg-muted" />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="summary">Monthly Summary</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Enter a brief summary of progress made during this month..."
                  rows={4}
                  data-testid="textarea-summary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges">Challenges & Recommendations</Label>
                <Textarea
                  id="challenges"
                  value={formData.challenges}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  placeholder="Describe any challenges faced and recommendations for next month..."
                  rows={4}
                  data-testid="textarea-challenges"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="outline" className="gap-1" onClick={handleGenerate} data-testid="button-generate-report">
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline" className="gap-1" data-testid="button-download-report">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button className="gap-1" onClick={handleSave} data-testid="button-save-report">
                <Save className="h-4 w-4" />
                Save Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
