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
import { Check, X, Save } from "lucide-react";
import { mockHouseholds, mockBeneficiaryInitiatives, domains } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function FormatIIIB() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    state: "DELHI",
    district: "SOUTH WEST",
    block: "DWE",
    gramPanchayat: "450010",
    village: "1",
    domain: "2",
    indicator: "2.3",
  });

  const [beneficiaryData, setBeneficiaryData] = useState<Record<string, { details: string; scheme: string }>>({});

  const indicatorBadges = [
    { id: "I3.1", filled: true },
    { id: "I3.2", filled: true },
    { id: "I3.3", filled: false },
    { id: "I3.4", filled: false },
    { id: "I3.5", filled: false },
    { id: "I3.6", filled: false },
  ];

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Beneficiary initiatives saved successfully",
    });
  };

  const consolidatedData = {
    eligibleChildren: 5,
    receivingScholarship: 4,
    notReceiving: 1,
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Format – III(B): Consolidation of Household Data for Beneficiary oriented initiatives and Action Plan for fulfilling needs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
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
                  <Label>State <span className="text-destructive">*</span></Label>
                  <Input value={formData.state} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>District <span className="text-destructive">*</span></Label>
                  <Input value={formData.district} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Block <span className="text-destructive">*</span></Label>
                  <Select value={formData.block} onValueChange={(value) => setFormData({ ...formData, block: value })}>
                    <SelectTrigger data-testid="select-block">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DWE">Delhi W EST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Gram Panchayat <span className="text-destructive">*</span></Label>
                  <Select value={formData.gramPanchayat} onValueChange={(value) => setFormData({ ...formData, gramPanchayat: value })}>
                    <SelectTrigger data-testid="select-gram-panchayat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="450010">Delhi West - 450010</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label>Village <span className="text-destructive">*</span></Label>
                  <Select value={formData.village} onValueChange={(value) => setFormData({ ...formData, village: value })}>
                    <SelectTrigger data-testid="select-village">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Rewla Khanm Pur - 64014 [ 2022-2023 ]</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Domain <span className="text-destructive">*</span></Label>
                  <Select value={formData.domain} onValueChange={(value) => setFormData({ ...formData, domain: value })}>
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
                <div className="space-y-2">
                  <Label>Monitorable Indicator <span className="text-destructive">*</span></Label>
                  <Select value={formData.indicator} onValueChange={(value) => setFormData({ ...formData, indicator: value })}>
                    <SelectTrigger data-testid="select-indicator">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2.3">2.3 - % of SC children receiving pre-matric scholarship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

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
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      No. of SC children in the village eligible for getting the Pre-matric Scholarship for SC Students <span className="text-destructive">*</span>
                    </TableCell>
                    <TableCell>
                      <Input value={consolidatedData.eligibleChildren} disabled className="bg-muted" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>
                      No. of children (out of 1 above) receiving Pre-matric Scholarship for SC students <span className="text-destructive">*</span>
                    </TableCell>
                    <TableCell>
                      <Input value={consolidatedData.receivingScholarship} disabled className="bg-muted" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>
                      No. of children (out of 1 above) not receiving Pre-matric Scholarship for SC students <span className="text-destructive">*</span>
                    </TableCell>
                    <TableCell>
                      <Input value={consolidatedData.notReceiving} disabled className="bg-muted" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-chart-3/10 p-3 border-b">
                <h4 className="text-sm font-medium">Household/beneficiaries Identified and initiatives planned:</h4>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">S.No.</TableHead>
                    <TableHead>Household Id</TableHead>
                    <TableHead>Category of beneficiary</TableHead>
                    <TableHead colSpan={2} className="text-center border-b">Details of beneficiaries</TableHead>
                    <TableHead colSpan={2} className="text-center border-b">Details of initiatives</TableHead>
                  </TableRow>
                  <TableRow className="bg-muted/30">
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead>Name of head of the household <span className="text-destructive">*</span></TableHead>
                    <TableHead>Name of Beneficiary <span className="text-destructive">*</span></TableHead>
                    <TableHead>Details <span className="text-destructive">*</span></TableHead>
                    <TableHead>Scheme <span className="text-destructive">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBeneficiaryInitiatives.slice(0, 2).map((initiative, index) => (
                    <TableRow key={initiative.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-mono text-xs">{initiative.householdId === "1" ? "dl-sw-450010-64014-00001" : "dl-sw-450010-64014-00002"}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">SC</Badge>
                      </TableCell>
                      <TableCell>{initiative.householdId === "1" ? "Pratap Singh" : "Ram Kumar"}</TableCell>
                      <TableCell>
                        <Input
                          value={initiative.beneficiaryName}
                          onChange={() => {}}
                          data-testid={`input-beneficiary-name-${initiative.id}`}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="details are necessary"
                          value={beneficiaryData[initiative.id]?.details || ""}
                          onChange={(e) => setBeneficiaryData({
                            ...beneficiaryData,
                            [initiative.id]: { ...beneficiaryData[initiative.id], details: e.target.value }
                          })}
                          data-testid={`input-details-${initiative.id}`}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={beneficiaryData[initiative.id]?.scheme || initiative.schemeName}
                          onValueChange={(value) => setBeneficiaryData({
                            ...beneficiaryData,
                            [initiative.id]: { ...beneficiaryData[initiative.id], scheme: value }
                          })}
                        >
                          <SelectTrigger data-testid={`select-scheme-${initiative.id}`}>
                            <SelectValue placeholder="Select scheme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pre-Matric Scholarship">Pre-Matric Scholarship</SelectItem>
                            <SelectItem value="Post-Matric Scholarship">Post-Matric Scholarship</SelectItem>
                            <SelectItem value="PMAY-G">PMAY-G</SelectItem>
                            <SelectItem value="SBM-G">SBM-G</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-1" data-testid="button-save-beneficiary">
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
