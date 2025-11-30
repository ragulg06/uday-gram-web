import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Award, CheckCircle, Eye, Send } from "lucide-react";
import { mockVillages, domains } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface CriteriaItem {
  id: string;
  domain: string;
  description: string;
  checked: boolean;
  score: number;
  required: number;
}

export default function AdarshGramDeclare() {
  const { toast } = useToast();
  const [selectedVillage, setSelectedVillage] = useState("");
  const [remarks, setRemarks] = useState("");

  const [criteriaItems, setCriteriaItems] = useState<CriteriaItem[]>(
    domains.flatMap((domain, domainIndex) => [
      {
        id: `${domain.id}-1`,
        domain: domain.name,
        description: `All indicators under ${domain.name} are satisfied`,
        checked: domainIndex < 5,
        score: domainIndex < 5 ? 100 : 65,
        required: 80,
      },
    ])
  );

  const totalScore = criteriaItems.reduce((acc, item) => acc + item.score, 0) / criteriaItems.length;
  const allCriteriaMet = criteriaItems.every((item) => item.score >= item.required);

  const handleCriteriaChange = (id: string, checked: boolean) => {
    setCriteriaItems(
      criteriaItems.map((item) => (item.id === id ? { ...item, checked } : item))
    );
  };

  const handleRecommend = () => {
    if (!selectedVillage) {
      toast({
        title: "Error",
        description: "Please select a village",
        variant: "destructive",
      });
      return;
    }

    if (!allCriteriaMet) {
      toast({
        title: "Error",
        description: "All criteria must be satisfied to recommend for Adarsh Gram",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Village recommended for Adarsh Gram declaration",
    });
  };

  const handleDeclare = () => {
    if (!selectedVillage) {
      toast({
        title: "Error",
        description: "Please select a village",
        variant: "destructive",
      });
      return;
    }

    if (!allCriteriaMet) {
      toast({
        title: "Error",
        description: "All criteria must be satisfied to declare Adarsh Gram",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Village declared as Adarsh Gram!",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Declare Adarsh Gram
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
                      <SelectItem value="6950">Blandpur - 6950</SelectItem>
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
                  <Button variant="default" className="gap-1" data-testid="button-view">
                    <Eye className="h-4 w-4" />
                    View Status
                  </Button>
                </div>
              </div>
            </div>

            {selectedVillage && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Domain-wise Compliance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {criteriaItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          data-testid={`criteria-item-${item.id}`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={(checked) => handleCriteriaChange(item.id, !!checked)}
                              disabled
                            />
                            <Label htmlFor={item.id} className="text-sm flex-1 cursor-pointer">
                              {item.domain}
                            </Label>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32">
                              <Progress value={item.score} className="h-2" />
                            </div>
                            <Badge
                              variant={item.score >= item.required ? "default" : "destructive"}
                              className="w-16 justify-center"
                            >
                              {item.score}%
                            </Badge>
                            {item.score >= item.required ? (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <div className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Overall Eligibility</CardTitle>
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
                            className={totalScore >= 80 ? "text-primary" : "text-chart-3"}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{totalScore.toFixed(0)}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">Composite Score</p>
                      <Badge
                        variant={allCriteriaMet ? "default" : "secondary"}
                        className="mt-2"
                      >
                        {allCriteriaMet ? "Eligible for Declaration" : "Not Yet Eligible"}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2 bg-chart-3/10">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-chart-3" />
                      <CardTitle className="text-base">Adarsh Gram Declaration Criteria</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">VDP Generated and Approved</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">All Households Surveyed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">All Beneficiaries Linked with Schemes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">Infrastructure Works Completed</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">Village Score above 80%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">All Domains Satisfied (Score &gt; 80%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">District Recommendation Received</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">State Approval Received</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <Label htmlFor="remarks">Remarks / Observations</Label>
                      <Textarea
                        id="remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter any remarks or observations..."
                        rows={3}
                        data-testid="textarea-remarks"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                      <Button
                        variant="outline"
                        className="gap-1"
                        onClick={handleRecommend}
                        disabled={!allCriteriaMet}
                        data-testid="button-recommend"
                      >
                        <Send className="h-4 w-4" />
                        Recommend for Adarsh Gram
                      </Button>
                      <Button
                        className="gap-1"
                        onClick={handleDeclare}
                        disabled={!allCriteriaMet}
                        data-testid="button-declare"
                      >
                        <Award className="h-4 w-4" />
                        Declare as Adarsh Gram
                      </Button>
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
