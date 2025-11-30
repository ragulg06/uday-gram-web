import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileDown, Printer, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { mockVillages } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function VillageVerification() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("2022-2023");
  const [verificationStatus, setVerificationStatus] = useState<Record<string, string>>({});

  const filteredVillages = mockVillages.filter(
    (village) =>
      village.selectionYear === selectedYear &&
      (village.villageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        village.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        village.state.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleVerificationChange = (villageId: string, status: string) => {
    setVerificationStatus((prev) => ({
      ...prev,
      [villageId]: status,
    }));
  };

  const handleSubmit = (villageId: string) => {
    const status = verificationStatus[villageId];
    if (!status) {
      toast({
        title: "Error",
        description: "Please select a verification status",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: `Village verification status updated to "${status}"`,
    });
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Village Verification 2021-22
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1" data-testid="button-view-other-year">
                  <ChevronLeft className="h-4 w-4" />
                  View for Other Selection Year
                </Button>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" data-testid="button-export-pdf">
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-export-excel">
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-print">
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>As On {formatDate()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-muted-foreground">Search:</span>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search-villages"
                />
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-16">S.No.</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Block Name</TableHead>
                    <TableHead>Gram Panchayat</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Selection Year</TableHead>
                    <TableHead>Verification Status</TableHead>
                    <TableHead>Edit Verification Status</TableHead>
                    <TableHead className="w-24">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVillages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                        No villages found for the selected criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVillages.map((village, index) => (
                      <TableRow key={village.id} data-testid={`row-village-${village.id}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{village.state}</TableCell>
                        <TableCell>{village.district}</TableCell>
                        <TableCell>{village.block}</TableCell>
                        <TableCell>{village.gramPanchayat}</TableCell>
                        <TableCell>{village.villageName}</TableCell>
                        <TableCell>{village.selectionYear}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              village.verificationStatus === "correct"
                                ? "default"
                                : village.verificationStatus === "incorrect"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {village.verificationStatus === "correct"
                              ? "Correct"
                              : village.verificationStatus === "incorrect"
                              ? "Incorrect"
                              : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <RadioGroup
                            value={verificationStatus[village.id] || ""}
                            onValueChange={(value) => handleVerificationChange(village.id, value)}
                            className="flex gap-4"
                          >
                            <div className="flex items-center gap-1.5">
                              <RadioGroupItem value="correct" id={`correct-${village.id}`} />
                              <Label htmlFor={`correct-${village.id}`} className="text-sm">
                                Correct
                              </Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <RadioGroupItem value="incorrect" id={`incorrect-${village.id}`} />
                              <Label htmlFor={`incorrect-${village.id}`} className="text-sm">
                                Incorrect
                              </Label>
                            </div>
                          </RadioGroup>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleSubmit(village.id)}
                            data-testid={`button-submit-${village.id}`}
                          >
                            Submit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing 1 to {filteredVillages.length} of {filteredVillages.length} entries</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button variant="default" size="sm" className="w-8">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
