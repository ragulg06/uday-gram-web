import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Trash2 } from "lucide-react";
import { states, districts, blocks, gramPanchayats, mockVillages } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  mobileNo: string;
  email: string;
  address: string;
  remarks: string;
}

export default function FormatIAdd() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    block: "",
    gramPanchayat: "",
    village: "",
    scPopulation2011: "",
    householdsAsOnDate: "",
    currentScPopulation: "",
    surveyFromDate: "",
    surveyToDate: "",
    latitude: "",
    longitude: "",
  });

  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([
    { id: "1", name: "", designation: "", mobileNo: "", email: "", address: "", remarks: "" },
    { id: "2", name: "", designation: "", mobileNo: "", email: "", address: "", remarks: "" },
    { id: "3", name: "", designation: "", mobileNo: "", email: "", address: "", remarks: "" },
    { id: "4", name: "", designation: "", mobileNo: "", email: "", address: "", remarks: "" },
    { id: "5", name: "", designation: "", mobileNo: "", email: "", address: "", remarks: "" },
  ]);

  const filteredDistricts = districts.filter((d) => d.stateCode === formData.state);
  const filteredBlocks = blocks.filter((b) => b.districtCode === formData.district);
  const filteredGramPanchayats = gramPanchayats.filter((g) => g.blockCode === formData.block);

  const addMember = () => {
    const newId = (committeeMembers.length + 1).toString();
    setCommitteeMembers([
      ...committeeMembers,
      { id: newId, name: "", designation: "", mobileNo: "", email: "", address: "", remarks: "" },
    ]);
  };

  const removeMember = (id: string) => {
    if (committeeMembers.length <= 5) {
      toast({
        title: "Error",
        description: "Minimum 5 members are required in Village Level Convergence Committee",
        variant: "destructive",
      });
      return;
    }
    setCommitteeMembers(committeeMembers.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, field: keyof CommitteeMember, value: string) => {
    setCommitteeMembers(
      committeeMembers.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.state || !formData.district || !formData.gramPanchayat || !formData.village) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Format I data submitted successfully",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Need Assessment Format – I: Village Level Data
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-primary mb-4">1. Village Level Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData({ ...formData, state: value, district: "", block: "", gramPanchayat: "" })}
                    >
                      <SelectTrigger id="state" data-testid="select-state">
                        <SelectValue placeholder="--Select State--" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">
                      District <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.district}
                      onValueChange={(value) => setFormData({ ...formData, district: value, block: "", gramPanchayat: "" })}
                      disabled={!formData.state}
                    >
                      <SelectTrigger id="district" data-testid="select-district">
                        <SelectValue placeholder="--Select District--" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredDistricts.map((district) => (
                          <SelectItem key={district.code} value={district.code}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="block">
                      Block <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.block}
                      onValueChange={(value) => setFormData({ ...formData, block: value, gramPanchayat: "" })}
                      disabled={!formData.district}
                    >
                      <SelectTrigger id="block" data-testid="select-block">
                        <SelectValue placeholder="--Select Block--" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredBlocks.map((block) => (
                          <SelectItem key={block.code} value={block.code}>
                            {block.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gramPanchayat">
                      Gram Panchayat <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.gramPanchayat}
                      onValueChange={(value) => setFormData({ ...formData, gramPanchayat: value })}
                      disabled={!formData.block}
                    >
                      <SelectTrigger id="gramPanchayat" data-testid="select-gram-panchayat">
                        <SelectValue placeholder="--Select Gram Panchayat--" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredGramPanchayats.map((gp) => (
                          <SelectItem key={gp.code} value={gp.code}>
                            {gp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="village">
                      Village <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.village}
                      onValueChange={(value) => setFormData({ ...formData, village: value })}
                      disabled={!formData.gramPanchayat}
                    >
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

                  <div className="space-y-2">
                    <Label>Population of Village (Census 2011)</Label>
                    <Input
                      type="text"
                      placeholder="Auto-populated"
                      disabled
                      className="bg-muted"
                      data-testid="input-population-2011"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="scPopulation2011">SC Population of Village (Census 2011)</Label>
                    <Input
                      id="scPopulation2011"
                      type="number"
                      value={formData.scPopulation2011}
                      onChange={(e) => setFormData({ ...formData, scPopulation2011: e.target.value })}
                      data-testid="input-sc-population-2011"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="householdsAsOnDate">
                      No. of Households as on Date <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="householdsAsOnDate"
                      type="number"
                      value={formData.householdsAsOnDate}
                      onChange={(e) => setFormData({ ...formData, householdsAsOnDate: e.target.value })}
                      data-testid="input-households"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Currently Total Population of Village/GP</Label>
                    <Input
                      type="text"
                      placeholder="Auto-calculated"
                      disabled
                      className="bg-muted"
                      data-testid="input-current-population"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentScPopulation">Currently SC Population of Village/GP</Label>
                    <Input
                      id="currentScPopulation"
                      type="number"
                      value={formData.currentScPopulation}
                      onChange={(e) => setFormData({ ...formData, currentScPopulation: e.target.value })}
                      data-testid="input-current-sc-population"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surveyFromDate">
                      Period of Need Assessment/Household Survey From <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="surveyFromDate"
                      type="date"
                      value={formData.surveyFromDate}
                      onChange={(e) => setFormData({ ...formData, surveyFromDate: e.target.value })}
                      data-testid="input-survey-from-date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surveyToDate">
                      To <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="surveyToDate"
                      type="date"
                      value={formData.surveyToDate}
                      onChange={(e) => setFormData({ ...formData, surveyToDate: e.target.value })}
                      data-testid="input-survey-to-date"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-primary mb-4">2. GPS Data : GPS Coordinates of Village</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude (Eg- 28.62623)</Label>
                    <Input
                      id="latitude"
                      type="text"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      placeholder="e.g., 28.62623"
                      data-testid="input-latitude"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude (Eg- 77.21808)</Label>
                    <Input
                      id="longitude"
                      type="text"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      placeholder="e.g., 77.21808"
                      data-testid="input-longitude"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-primary">
                    3. Details of Village PMAGY Convergence Committee (Minimum 5 members should be in Village Level Convergence Committee (VLCC))
                  </h3>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-12">S.No.</TableHead>
                        <TableHead>
                          Name <span className="text-destructive">*</span>
                        </TableHead>
                        <TableHead>
                          Designation <span className="text-destructive">*</span>
                        </TableHead>
                        <TableHead>
                          Mobile Number <span className="text-destructive">*</span>
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>
                          Address <span className="text-destructive">*</span>
                        </TableHead>
                        <TableHead>Remarks</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {committeeMembers.map((member, index) => (
                        <TableRow key={member.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              placeholder="2-50 characters only."
                              value={member.name}
                              onChange={(e) => updateMember(member.id, "name", e.target.value)}
                              className="min-w-32"
                              data-testid={`input-member-name-${member.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={member.designation}
                              onValueChange={(value) => updateMember(member.id, "designation", value)}
                            >
                              <SelectTrigger className="min-w-36" data-testid={`select-member-designation-${member.id}`}>
                                <SelectValue placeholder="--Select Designation--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sarpanch">Sarpanch</SelectItem>
                                <SelectItem value="secretary">Secretary</SelectItem>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="anganwadi">Anganwadi Worker</SelectItem>
                                <SelectItem value="asha">ASHA Worker</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="tel"
                              placeholder="Mobile No."
                              value={member.mobileNo}
                              onChange={(e) => updateMember(member.id, "mobileNo", e.target.value)}
                              className="min-w-28"
                              data-testid={`input-member-mobile-${member.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="email"
                              placeholder="Email"
                              value={member.email}
                              onChange={(e) => updateMember(member.id, "email", e.target.value)}
                              className="min-w-36"
                              data-testid={`input-member-email-${member.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              placeholder="10-100 characters only."
                              value={member.address}
                              onChange={(e) => updateMember(member.id, "address", e.target.value)}
                              className="min-w-32"
                              data-testid={`input-member-address-${member.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              placeholder="150 characters only."
                              value={member.remarks}
                              onChange={(e) => updateMember(member.id, "remarks", e.target.value)}
                              className="min-w-28"
                              data-testid={`input-member-remarks-${member.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMember(member.id)}
                              className="text-destructive hover:text-destructive"
                              data-testid={`button-remove-member-${member.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
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
                  onClick={addMember}
                  className="mt-4 gap-1"
                  data-testid="button-add-member"
                >
                  <Plus className="h-4 w-4" />
                  Add Member
                </Button>
              </div>

              <div className="flex justify-end">
                <Button type="submit" data-testid="button-submit-format-1">
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
