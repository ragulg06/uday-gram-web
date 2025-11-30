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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Lock, Unlock, ChevronLeft, ChevronRight } from "lucide-react";
import { mockVdps, mockVillages } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function VDPUnlock() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);
  const [selectedVdp, setSelectedVdp] = useState<string | null>(null);
  const [unlockReason, setUnlockReason] = useState("");

  const vdpList = mockVdps.map((vdp) => {
    const village = mockVillages.find((v) => v.id === vdp.villageId);
    return {
      ...vdp,
      villageName: village?.villageName || "Unknown",
      gramPanchayat: village?.gramPanchayat || "Unknown",
      selectionYear: village?.selectionYear || "Unknown",
    };
  });

  const filteredVdps = vdpList.filter(
    (vdp) =>
      vdp.villageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vdp.gramPanchayat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUnlockRequest = () => {
    if (!unlockReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for unlock request",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Unlock request submitted successfully",
    });
    setUnlockDialogOpen(false);
    setUnlockReason("");
    setSelectedVdp(null);
  };

  const openUnlockDialog = (vdpId: string) => {
    setSelectedVdp(vdpId);
    setUnlockDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "submitted":
        return <Badge variant="default">Submitted</Badge>;
      case "approved":
        return <Badge className="bg-primary">Approved</Badge>;
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
              Unlock VDP Request
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-muted-foreground">Search:</span>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by village..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search-vdp"
                />
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">S.No.</TableHead>
                    <TableHead>Gram Panchayat</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Selection Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Estimated Cost (Rs.)</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead className="w-32">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVdps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No VDPs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVdps.map((vdp, index) => (
                      <TableRow key={vdp.id} data-testid={`row-vdp-${vdp.id}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{vdp.gramPanchayat}</TableCell>
                        <TableCell className="font-medium">{vdp.villageName}</TableCell>
                        <TableCell>{vdp.selectionYear}</TableCell>
                        <TableCell>{getStatusBadge(vdp.status)}</TableCell>
                        <TableCell>
                          {vdp.totalEstimatedCost?.toLocaleString("en-IN") || "-"}
                        </TableCell>
                        <TableCell>
                          {vdp.submittedAt
                            ? new Date(vdp.submittedAt).toLocaleDateString("en-IN")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {vdp.status === "submitted" || vdp.status === "approved" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => openUnlockDialog(vdp.id)}
                              data-testid={`button-unlock-${vdp.id}`}
                            >
                              <Unlock className="h-4 w-4" />
                              Request Unlock
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="gap-1" disabled>
                              <Lock className="h-4 w-4" />
                              Not Locked
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing 1 to {filteredVdps.length} of {filteredVdps.length} entries</span>
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

        <Dialog open={unlockDialogOpen} onOpenChange={setUnlockDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request VDP Unlock</DialogTitle>
              <DialogDescription>
                Please provide a reason for requesting to unlock this VDP for editing.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Unlock <span className="text-destructive">*</span></Label>
                <Textarea
                  id="reason"
                  value={unlockReason}
                  onChange={(e) => setUnlockReason(e.target.value)}
                  placeholder="Enter the reason for unlock request..."
                  rows={4}
                  data-testid="textarea-unlock-reason"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUnlockDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUnlockRequest} data-testid="button-submit-unlock">
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
