import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AgencyAdd() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    district: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Agency added successfully",
    });

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      name: "",
      type: "",
      district: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Add New Agency
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Agency Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter agency name"
                    data-testid="input-agency-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">
                    Agency Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger id="type" data-testid="select-agency-type">
                      <SelectValue placeholder="--Select Agency Type--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Central Government</SelectItem>
                      <SelectItem value="state">State Government</SelectItem>
                      <SelectItem value="psu">Public Sector Undertaking</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="ngo">NGO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData({ ...formData, district: value })}
                  >
                    <SelectTrigger id="district" data-testid="select-district">
                      <SelectValue placeholder="--Select District--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      <SelectItem value="SW">SOUTH WEST</SelectItem>
                      <SelectItem value="NW">NORTH WEST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Enter contact person name"
                    data-testid="input-contact-person"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      data-testid="input-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email address"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter agency address"
                    rows={3}
                    data-testid="textarea-address"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="gap-1"
                  data-testid="button-reset"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button type="submit" className="gap-1" data-testid="button-save-agency">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
