import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Download, Eye } from "lucide-react";
import { domains, mockVillages } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScoreData {
  domain: string;
  score: number;
  maxScore: number;
  status: "achieved" | "in_progress" | "not_started";
}

export default function VillageScore() {
  const { toast } = useToast();
  const [selectedVillage, setSelectedVillage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scoreData: ScoreData[] = domains.map((domain, index) => ({
    domain: domain.name,
    score: Math.floor(Math.random() * 30) + 70,
    maxScore: 100,
    status: index < 3 ? "achieved" : index < 6 ? "in_progress" : "not_started",
  }));

  const totalScore = scoreData.reduce((acc, d) => acc + d.score, 0) / scoreData.length;

  const chartData = scoreData.map((d) => ({
    name: d.domain.split(" ")[0],
    score: d.score,
    maxScore: d.maxScore,
  }));

  const handleRecompute = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Village score recomputed successfully",
      });
    }, 1500);
  };

  const indicatorDetails = [
    { id: "1.1", name: "Whether adequate sustainable drinking water sources to cover the village population?", weight: 1, status: "S", score: 1 },
    { id: "1.2", name: "% of households having piped water connection", weight: 1, status: "S", score: 1 },
    { id: "1.3", name: "% of households having individual Household Latrines (IHHL)", weight: 1, status: "N", score: 0 },
    { id: "1.4", name: "% of solid and liquid waste being disposed effectively", weight: 1, status: "S", score: 1 },
    { id: "1.5", name: "Total length of internal roads available", weight: 1, status: "S", score: 1 },
    { id: "1.6", name: "% of drains available along all internal roads", weight: 1, status: "N", score: 0 },
    { id: "2.1", name: "% of SC children receiving Pre-matric Scholarship", weight: 1, status: "S", score: 1 },
    { id: "2.2", name: "% of SC children receiving Post-matric Scholarship", weight: 1, status: "P", score: 0.5 },
    { id: "2.3", name: "Is Primary School available within 1 km?", weight: 1, status: "S", score: 1 },
    { id: "2.4", name: "Is Secondary School available within 3 km?", weight: 1, status: "S", score: 1 },
  ];

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Generate Village Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gramPanchayat">Gram Panchayat <span className="text-destructive">*</span></Label>
                  <Select value={selectedVillage ? "450010" : ""} onValueChange={() => {}}>
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
                          {v.villageName} [ {v.selectionYear} ]
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="default" className="gap-1" data-testid="button-view-score">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </div>

            {selectedVillage && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Score by Domain</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
                            <Tooltip />
                            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-muted"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(totalScore / 100) * 352} 352`}
                            className="text-primary"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{totalScore.toFixed(1)}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">Composite Score</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 gap-1"
                        onClick={handleRecompute}
                        disabled={isLoading}
                        data-testid="button-recompute"
                      >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        {isLoading ? "Computing..." : "Recompute Score"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Format – VII: Status of Monitorable Indicators</CardTitle>
                      <Button variant="outline" size="sm" className="gap-1" data-testid="button-download-report">
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="w-16">S.No.</TableHead>
                            <TableHead>Name of Monitorable Indicators</TableHead>
                            <TableHead className="w-20 text-center">Weight</TableHead>
                            <TableHead className="w-20 text-center">Status</TableHead>
                            <TableHead className="w-20 text-center">Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="bg-primary/10">
                            <TableCell colSpan={5} className="font-semibold">
                              1. Drinking Water and Sanitation
                            </TableCell>
                          </TableRow>
                          {indicatorDetails.slice(0, 6).map((ind, index) => (
                            <TableRow key={ind.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{ind.name}</TableCell>
                              <TableCell className="text-center">{ind.weight}</TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant={ind.status === "S" ? "default" : ind.status === "P" ? "secondary" : "destructive"}
                                >
                                  {ind.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">{ind.score}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-primary/10">
                            <TableCell colSpan={5} className="font-semibold">
                              2. Education
                            </TableCell>
                          </TableRow>
                          {indicatorDetails.slice(6, 10).map((ind, index) => (
                            <TableRow key={ind.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{ind.name}</TableCell>
                              <TableCell className="text-center">{ind.weight}</TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant={ind.status === "S" ? "default" : ind.status === "P" ? "secondary" : "destructive"}
                                >
                                  {ind.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">{ind.score}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex items-center justify-end gap-6 mt-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">S</Badge>
                        <span className="text-muted-foreground">Satisfied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">P</Badge>
                        <span className="text-muted-foreground">Partially Satisfied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">N</Badge>
                        <span className="text-muted-foreground">Not Satisfied</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-chart-3/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total score for the village will be shown here</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary">{totalScore.toFixed(1)}</span>
                          <span className="text-muted-foreground"> / 100</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
