import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, X, Check } from "lucide-react";
import { states, districts, blocks, gramPanchayats, mockVillages, domains } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface ActionPlan {
  id: string;
  details: string;
}

export default function FormatIIAdd() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    state: "DL",
    district: "SW",
    block: "DWE",
    gramPanchayat: "450010",
    village: "1",
    domain: "",
    indicator: "",
  });

  const [particulars, setParticulars] = useState<Record<string, string>>({});
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([
    { id: "1", details: "" },
  ]);

  const [filledIndicators, setFilledIndicators] = useState<Record<string, boolean>>({
    "I1": true,
    "I2": true,
  });

  const filteredDistricts = districts.filter((d) => d.stateCode === formData.state);
  const filteredBlocks = blocks.filter((b) => b.districtCode === formData.district);
  const filteredGramPanchayats = gramPanchayats.filter((g) => g.blockCode === formData.block);

  const selectedDomain = domains.find((d) => d.id === formData.domain);

  const addActionPlan = () => {
    const newId = (actionPlans.length + 1).toString();
    setActionPlans([...actionPlans, { id: newId, details: "" }]);
  };

  const removeActionPlan = (id: string) => {
    if (actionPlans.length <= 1) return;
    setActionPlans(actionPlans.filter((a) => a.id !== id));
  };

  const updateActionPlan = (id: string, details: string) => {
    setActionPlans(actionPlans.map((a) => (a.id === id ? { ...a, details } : a)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Format II data submitted successfully",
    });
  };

  const indicatorBadges = [
    { id: "I1", filled: true },
    { id: "I2", filled: true },
    { id: "I4", filled: false },
    { id: "I5", filled: false },
    { id: "I7", filled: false },
    { id: "I8", filled: false },
  ];

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Format – II: Village level Data for Infrastructure Development and Action Plan for fulfilling the needs identified
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">Status of filling up of Monitorable Indicator of the village.</span>
                    <div className="flex items-center gap-1 flex-wrap">
                      {indicatorBadges.map((badge) => (
                        <Badge
                          key={badge.id}
                          variant={badge.filled ? "default" : "destructive"}
                          className="gap-1"
                        >
                          {badge.filled ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          {badge.id}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-destructive" />
                      <span>Not filled.</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-primary" />
                      <span>Already filled.</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      type="text"
                      value="DELHI"
                      disabled
                      className="bg-muted"
                      data-testid="input-state"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">
                      District <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="district"
                      type="text"
                      value="SOUTH WEST"
                      disabled
                      className="bg-muted"
                      data-testid="input-district"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="block">
                      Block <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.block} onValueChange={(value) => setFormData({ ...formData, block: value })}>
                      <SelectTrigger id="block" data-testid="select-block">
                        <SelectValue placeholder="--Select Block--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DWE">Delhi W EST</SelectItem>
                        <SelectItem value="DWE2">Delhi W EST1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gramPanchayat">
                      Gram Panchayat <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.gramPanchayat} onValueChange={(value) => setFormData({ ...formData, gramPanchayat: value })}>
                      <SelectTrigger id="gramPanchayat" data-testid="select-gram-panchayat">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="450010">Delhi West - 450010</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="village">
                      Village <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.village} onValueChange={(value) => setFormData({ ...formData, village: value })}>
                      <SelectTrigger id="village" data-testid="select-village">
                        <SelectValue placeholder="--Select Village--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Rewla Khanm Pur - 64014 [ 2022-2023 ]</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain">
                      Domain <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.domain} onValueChange={(value) => setFormData({ ...formData, domain: value, indicator: "" })}>
                      <SelectTrigger id="domain" data-testid="select-domain">
                        <SelectValue placeholder="--Select Domain--" />
                      </SelectTrigger>
                      <SelectContent>
                        {domains.map((domain) => (
                          <SelectItem key={domain.id} value={domain.id}>
                            {domain.id} - {domain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="indicator">
                      Monitorable Indicator <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={formData.indicator} 
                      onValueChange={(value) => setFormData({ ...formData, indicator: value })}
                      disabled={!formData.domain}
                    >
                      <SelectTrigger id="indicator" data-testid="select-indicator">
                        <SelectValue placeholder="--Select Indicator--" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDomain?.indicators.map((ind) => (
                          <SelectItem key={ind.id} value={ind.id}>
                            {ind.id} - {ind.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead className="w-16">S.No.</TableHead>
                      <TableHead>Particulars</TableHead>
                      <TableHead className="w-48">Status/No./Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>
                        Total length (in Metres) of internal roads in the village <span className="text-destructive">*</span>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={particulars["1"] || ""}
                          onChange={(e) => setParticulars({ ...particulars, "1": e.target.value })}
                          placeholder="5000"
                          data-testid="input-particular-1"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>
                        Total length (in Metres) of drains already available along internal roads <span className="text-destructive">*</span>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={particulars["2"] || ""}
                          onChange={(e) => setParticulars({ ...particulars, "2": e.target.value })}
                          placeholder="6"
                          data-testid="input-particular-2"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>
                        Total length (in Metres) of drains still to be constructed along internal roads <span className="text-destructive">*</span>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={particulars["3"] || ""}
                          onChange={(e) => setParticulars({ ...particulars, "3": e.target.value })}
                          placeholder="2"
                          data-testid="input-particular-3"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-chart-3/10">
                      <TableHead className="w-16">S.No.</TableHead>
                      <TableHead>
                        Details of action plan for construction of drains along all internal roads (Please provide itemised list of works / initiatives identified) <span className="text-destructive">*</span>
                      </TableHead>
                      <TableHead className="w-16">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {actionPlans.map((plan, index) => (
                      <TableRow key={plan.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Textarea
                            value={plan.details}
                            onChange={(e) => updateActionPlan(plan.id, e.target.value)}
                            placeholder="Minimum 25 characters required."
                            className="min-h-20 resize-none"
                            data-testid={`textarea-action-plan-${plan.id}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeActionPlan(plan.id)}
                            className="text-destructive hover:text-destructive"
                            disabled={actionPlans.length <= 1}
                            data-testid={`button-remove-action-plan-${plan.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addActionPlan}
                className="gap-1"
                data-testid="button-add-action-plan"
              >
                <Plus className="h-4 w-4" />
                Add Action Plan
              </Button>

              <div className="flex justify-end">
                <Button type="submit" data-testid="button-submit-format-2">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
