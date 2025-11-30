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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Eye, Printer, BarChart3 } from "lucide-react";
import { mockVillages, dashboardStats } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface ReportType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

const reportTypes: ReportType[] = [
  { id: "village-summary", name: "Village Summary Report", description: "Summary of all village data and progress", icon: FileText },
  { id: "household-survey", name: "Household Survey Report", description: "Details of household surveys conducted", icon: FileText },
  { id: "infrastructure", name: "Infrastructure Works Report", description: "Status of all infrastructure works", icon: FileText },
  { id: "beneficiary", name: "Beneficiary Status Report", description: "Beneficiary-wise scheme linkage status", icon: FileText },
  { id: "vdp-status", name: "VDP Status Report", description: "Village Development Plan status", icon: FileText },
  { id: "fund-utilization", name: "Fund Utilization Report", description: "Financial progress and fund utilization", icon: BarChart3 },
  { id: "adarsh-gram", name: "Adarsh Gram Report", description: "Status of Adarsh Gram declarations", icon: FileText },
  { id: "monthly-progress", name: "Monthly Progress Report", description: "Month-wise progress summary", icon: FileText },
];

export default function Reports() {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState("");
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    village: "",
    fromDate: "",
    toDate: "",
  });

  const handleGenerate = () => {
    if (!selectedReport) {
      toast({
        title: "Error",
        description: "Please select a report type",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Report generated successfully",
    });
  };

  const handleDownload = (format: "pdf" | "excel") => {
    toast({
      title: "Success",
      description: `Report downloading as ${format.toUpperCase()}`,
    });
  };

  const summaryData = [
    { metric: "Total Villages Covered", value: dashboardStats.villagesCovered },
    { metric: "Total Households Surveyed", value: dashboardStats.householdsSurveyed.toLocaleString() },
    { metric: "Infrastructure Works - In Progress", value: dashboardStats.infraWorksInProgress },
    { metric: "Infrastructure Works - Completed", value: dashboardStats.infraWorksCompleted },
    { metric: "Beneficiaries Identified", value: dashboardStats.beneficiariesIdentified.toLocaleString() },
    { metric: "Beneficiaries Saturated", value: dashboardStats.beneficiariesSaturated.toLocaleString() },
    { metric: "Funds Released (Rs.)", value: dashboardStats.fundsReleased.toLocaleString("en-IN") },
    { metric: "Funds Utilized (Rs.)", value: dashboardStats.fundsUtilized.toLocaleString("en-IN") },
    { metric: "Adarsh Grams Recommended", value: dashboardStats.adarshGramsRecommended },
    { metric: "Adarsh Grams Declared", value: dashboardStats.adarshGramsDeclared },
  ];

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <Tabs defaultValue="generate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="generate" data-testid="tab-generate">Generate Report</TabsTrigger>
                <TabsTrigger value="summary" data-testid="tab-summary">Quick Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="mt-4 space-y-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-4">Select Report Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {reportTypes.map((report) => (
                      <div
                        key={report.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedReport === report.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover-elevate"
                        }`}
                        onClick={() => setSelectedReport(report.id)}
                        data-testid={`report-type-${report.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <report.icon className={`h-5 w-5 ${selectedReport === report.id ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <p className="text-sm font-medium">{report.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-4">Filter Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select value={filters.state} onValueChange={(value) => setFilters({ ...filters, state: value })}>
                        <SelectTrigger id="state" data-testid="select-state">
                          <SelectValue placeholder="All States" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All States</SelectItem>
                          <SelectItem value="DL">DELHI</SelectItem>
                          <SelectItem value="JK">JAMMU AND KASHMIR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Select value={filters.district} onValueChange={(value) => setFilters({ ...filters, district: value })}>
                        <SelectTrigger id="district" data-testid="select-district">
                          <SelectValue placeholder="All Districts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Districts</SelectItem>
                          <SelectItem value="SW">SOUTH WEST</SelectItem>
                          <SelectItem value="DODA">DODA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="village">Village</Label>
                      <Select value={filters.village} onValueChange={(value) => setFilters({ ...filters, village: value })}>
                        <SelectTrigger id="village" data-testid="select-village">
                          <SelectValue placeholder="All Villages" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Villages</SelectItem>
                          {mockVillages.map((v) => (
                            <SelectItem key={v.id} value={v.id}>{v.villageName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromDate">From Date</Label>
                      <input
                        type="date"
                        id="fromDate"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={filters.fromDate}
                        onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                        data-testid="input-from-date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toDate">To Date</Label>
                      <input
                        type="date"
                        id="toDate"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={filters.toDate}
                        onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                        data-testid="input-to-date"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" className="gap-1" onClick={() => handleDownload("pdf")} data-testid="button-download-pdf">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="gap-1" onClick={() => handleDownload("excel")} data-testid="button-download-excel">
                    <Download className="h-4 w-4" />
                    Download Excel
                  </Button>
                  <Button variant="outline" className="gap-1" data-testid="button-print">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button className="gap-1" onClick={handleGenerate} data-testid="button-generate-report">
                    <Eye className="h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="mt-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-12">S.No.</TableHead>
                        <TableHead>Metric</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summaryData.map((item, index) => (
                        <TableRow key={item.metric}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">{item.metric}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary" className="font-mono">
                              {item.value}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
