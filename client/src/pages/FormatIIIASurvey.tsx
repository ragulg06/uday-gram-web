import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Search, Save } from "lucide-react";
import { domains } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from "wouter";

export default function FormatIIIASurvey() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [selectedDomain, setSelectedDomain] = useState("1");
  const [responses, setResponses] = useState<Record<string, string>>({});

  const householdData = {
    id: "1",
    householdId: "dl-sw-450010-64014-00001",
    headName: "Pratap Singh",
    address: "abd 233, loadthi ladif",
    village: "Rewla Khanm Pur",
    members: 8,
  };

  const currentDomain = domains.find((d) => d.id === selectedDomain);

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Survey data saved successfully",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Format – III(A): Survey Edit
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => setLocation("/format-3a-add")}
              data-testid="button-back"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">State</Label>
                  <Input value="DELHI" disabled className="bg-muted h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">District</Label>
                  <Input value="SOUTH WEST" disabled className="bg-muted h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Village</Label>
                  <Input value={householdData.village} disabled className="bg-muted h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Household ID</Label>
                  <Input value={householdData.householdId} disabled className="bg-muted h-9 font-mono text-xs" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Head of the household</Label>
                  <Input value={householdData.headName} disabled className="bg-primary/10 h-9 font-medium" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">House Number / Address</Label>
                  <Input value={householdData.address} disabled className="bg-muted h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Household Member</Label>
                  <Input value={householdData.members.toString()} disabled className="bg-muted h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Domain <span className="text-destructive">*</span></Label>
                  <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                    <SelectTrigger data-testid="select-domain">
                      <SelectValue />
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
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-primary mb-4">
                Monitorable Indicator: {selectedDomain}.3 - % of households having Individual Household Latrines (IHHL)
              </h3>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">S.No.</TableHead>
                      <TableHead>Particulars</TableHead>
                      <TableHead className="w-48">Status/No./Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDomain?.indicators.map((indicator, index) => (
                      <TableRow key={indicator.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {indicator.name} {indicator.type !== "text" && <span className="text-destructive">*</span>}
                        </TableCell>
                        <TableCell>
                          {indicator.type === "yes_no" ? (
                            <Select
                              value={responses[indicator.id] || ""}
                              onValueChange={(value) => setResponses({ ...responses, [indicator.id]: value })}
                            >
                              <SelectTrigger data-testid={`select-response-${indicator.id}`}>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              type={indicator.type === "number" ? "number" : "text"}
                              value={responses[indicator.id] || ""}
                              onChange={(e) => setResponses({ ...responses, [indicator.id]: e.target.value })}
                              data-testid={`input-response-${indicator.id}`}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-chart-3/10">
                      <TableHead className="w-12">S.No.</TableHead>
                      <TableHead>Particulars</TableHead>
                      <TableHead className="w-48">Status/No./Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>
                        Is the household eligible for IHHL under Swachh Bharat Mission - Gramin (SBM-G) / any other scheme(s)?
                        <span className="text-destructive">*</span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={responses["scheme_eligible"] || ""}
                          onValueChange={(value) => setResponses({ ...responses, scheme_eligible: value })}
                        >
                          <SelectTrigger data-testid="select-scheme-eligible">
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="already_covered">Already Covered</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-1" data-testid="button-save-survey">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
