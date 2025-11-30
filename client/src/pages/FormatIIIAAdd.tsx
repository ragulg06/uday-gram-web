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
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Search, Plus, Edit, Trash2 } from "lucide-react";
import { mockHouseholds, domains } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function FormatIIIAAdd() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    state: "DELHI",
    district: "SOUTH WEST",
    block: "",
    gramPanchayat: "",
    village: "",
    category: "",
  });

  const [newHousehold, setNewHousehold] = useState({
    householdId: "",
    headName: "",
    address: "",
    caste: "",
    category: "SC",
    members: "",
    incomeBracket: "",
    contactNo: "",
  });

  const filteredHouseholds = mockHouseholds.filter(
    (h) =>
      h.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.householdId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHousehold = () => {
    if (!newHousehold.headName || !newHousehold.address) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Household added successfully",
    });

    setNewHousehold({
      householdId: "",
      headName: "",
      address: "",
      caste: "",
      category: "SC",
      members: "",
      incomeBracket: "",
      contactNo: "",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Format – III(A): Household Survey
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input value={formData.state} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>District</Label>
                  <Input value={formData.district} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="block">Block <span className="text-destructive">*</span></Label>
                  <Select value={formData.block} onValueChange={(value) => setFormData({ ...formData, block: value })}>
                    <SelectTrigger id="block" data-testid="select-block">
                      <SelectValue placeholder="--Select Block--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DWE">Delhi W EST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="gramPanchayat">Gram Panchayat <span className="text-destructive">*</span></Label>
                  <Select value={formData.gramPanchayat} onValueChange={(value) => setFormData({ ...formData, gramPanchayat: value })}>
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
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger id="category" data-testid="select-category">
                      <SelectValue placeholder="--Select Category--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-primary mb-4">Add New Household</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="headName">Head of Household <span className="text-destructive">*</span></Label>
                  <Input
                    id="headName"
                    value={newHousehold.headName}
                    onChange={(e) => setNewHousehold({ ...newHousehold, headName: e.target.value })}
                    placeholder="Enter name"
                    data-testid="input-head-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">House No. / Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="address"
                    value={newHousehold.address}
                    onChange={(e) => setNewHousehold({ ...newHousehold, address: e.target.value })}
                    placeholder="Enter address"
                    data-testid="input-address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="members">Household Members</Label>
                  <Input
                    id="members"
                    type="number"
                    value={newHousehold.members}
                    onChange={(e) => setNewHousehold({ ...newHousehold, members: e.target.value })}
                    placeholder="Number of members"
                    data-testid="input-members"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNo">Contact Number</Label>
                  <Input
                    id="contactNo"
                    type="tel"
                    value={newHousehold.contactNo}
                    onChange={(e) => setNewHousehold({ ...newHousehold, contactNo: e.target.value })}
                    placeholder="Mobile number"
                    data-testid="input-contact"
                  />
                </div>
              </div>
              <Button className="mt-4 gap-1" onClick={handleAddHousehold} data-testid="button-add-household">
                <Plus className="h-4 w-4" />
                Add Household
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Household List</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Search:</span>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by ID, Name, Address..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      data-testid="input-search-households"
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">S.No.</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>Household ID</TableHead>
                      <TableHead>Head of the Household</TableHead>
                      <TableHead>House Number / Address</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Survey Progress</TableHead>
                      <TableHead className="w-24">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHouseholds.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          No households found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredHouseholds.map((household, index) => (
                        <TableRow key={household.id} data-testid={`row-household-${household.id}`}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>Rewla Khanm Pur</TableCell>
                          <TableCell className="font-mono text-xs">{household.householdId}</TableCell>
                          <TableCell>{household.headName}</TableCell>
                          <TableCell>{household.address}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{household.category}</Badge>
                          </TableCell>
                          <TableCell>{household.members}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={(household.domainsCompleted / 8) * 100} 
                                className="h-2 w-20"
                              />
                              <span className="text-xs text-muted-foreground">
                                {household.domainsCompleted}/8
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                data-testid={`button-edit-household-${household.id}`}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                data-testid={`button-delete-household-${household.id}`}
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
                <span>Showing 1 to {filteredHouseholds.length} of {filteredHouseholds.length} entries</span>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
