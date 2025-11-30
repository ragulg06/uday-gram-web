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
import { Search, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { mockBeneficiaryInitiatives, mockVillages } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function ProgressFormat5() {
  const { toast } = useToast();
  const [selectedVillage, setSelectedVillage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusUpdates, setStatusUpdates] = useState<Record<string, { status: string; sanctionDate: string; completionDate: string }>>({});

  const handleStatusChange = (id: string, status: string) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [id]: { ...prev[id], status },
    }));
  };

  const handleDateChange = (id: string, field: "sanctionDate" | "completionDate", value: string) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Beneficiary progress saved successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "identified":
        return <Badge variant="secondary">Identified</Badge>;
      case "sanctioned":
        return <Badge className="bg-chart-2 text-white">Sanctioned</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-chart-3 text-white">In Progress</Badge>;
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredInitiatives = mockBeneficiaryInitiatives.filter(
    (init) =>
      init.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      init.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      init.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Submit Progress - Format V (Beneficiary Initiatives)
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
                    View Beneficiaries
                  </Button>
                </div>
              </div>
            </div>

            {selectedVillage && (
              <>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-muted-foreground">Search:</span>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search beneficiaries..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      data-testid="input-search-beneficiaries"
                    />
                  </div>
                </div>

                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-12">S.No.</TableHead>
                        <TableHead>Beneficiary Name</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Scheme</TableHead>
                        <TableHead>Current Status</TableHead>
                        <TableHead>Update Status</TableHead>
                        <TableHead>Sanction Date</TableHead>
                        <TableHead>Completion Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInitiatives.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No beneficiaries found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInitiatives.map((init, index) => (
                          <TableRow key={init.id} data-testid={`row-beneficiary-${init.id}`}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{init.beneficiaryName}</TableCell>
                            <TableCell>{init.domain}</TableCell>
                            <TableCell>{init.schemeName}</TableCell>
                            <TableCell>{getStatusBadge(init.status)}</TableCell>
                            <TableCell>
                              <Select
                                value={statusUpdates[init.id]?.status || init.status}
                                onValueChange={(value) => handleStatusChange(init.id, value)}
                              >
                                <SelectTrigger className="w-32" data-testid={`select-status-${init.id}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="identified">Identified</SelectItem>
                                  <SelectItem value="sanctioned">Sanctioned</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="date"
                                value={
                                  statusUpdates[init.id]?.sanctionDate ||
                                  (init.sanctionDate ? new Date(init.sanctionDate).toISOString().split("T")[0] : "")
                                }
                                onChange={(e) => handleDateChange(init.id, "sanctionDate", e.target.value)}
                                className="w-36"
                                data-testid={`input-sanction-date-${init.id}`}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="date"
                                value={
                                  statusUpdates[init.id]?.completionDate ||
                                  (init.completionDate ? new Date(init.completionDate).toISOString().split("T")[0] : "")
                                }
                                onChange={(e) => handleDateChange(init.id, "completionDate", e.target.value)}
                                className="w-36"
                                data-testid={`input-completion-date-${init.id}`}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 1 to {filteredInitiatives.length} of {filteredInitiatives.length} entries
                  </div>
                  <div className="flex items-center gap-3">
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
                    <Button className="gap-1" onClick={handleSave} data-testid="button-save-progress">
                      <Save className="h-4 w-4" />
                      Save All
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
