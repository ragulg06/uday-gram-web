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
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { mockAgencies } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from "wouter";

export default function AgencyList() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);

  const filteredAgencies = mockAgencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agency.district?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const handleDelete = () => {
    toast({
      title: "Success",
      description: "Agency deleted successfully",
    });
    setDeleteDialogOpen(false);
    setSelectedAgency(null);
  };

  const confirmDelete = (agencyId: string) => {
    setSelectedAgency(agencyId);
    setDeleteDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Agency List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Button
                onClick={() => setLocation("/agency-add")}
                className="gap-1"
                data-testid="button-add-agency"
              >
                <Plus className="h-4 w-4" />
                Add New Agency
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Search:</span>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search agencies..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="input-search-agencies"
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">S.No.</TableHead>
                    <TableHead>Agency Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgencies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No agencies found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAgencies.map((agency, index) => (
                      <TableRow key={agency.id} data-testid={`row-agency-${agency.id}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{agency.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{agency.type}</Badge>
                        </TableCell>
                        <TableCell>{agency.district || "-"}</TableCell>
                        <TableCell>{agency.contactPerson || "-"}</TableCell>
                        <TableCell>{agency.phone || "-"}</TableCell>
                        <TableCell>{agency.email || "-"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              data-testid={`button-edit-agency-${agency.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => confirmDelete(agency.id)}
                              data-testid={`button-delete-agency-${agency.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing 1 to {filteredAgencies.length} of {filteredAgencies.length} entries</span>
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

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this agency? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} data-testid="button-confirm-delete">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
