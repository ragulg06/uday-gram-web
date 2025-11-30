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
import { CheckCircle, XCircle, Eye, FileText, Send } from "lucide-react";
import { mockVillages, mockVdps } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface VerificationItem {
  id: string;
  label: string;
  verified: boolean;
}

export default function VDPGenerate() {
  const { toast } = useToast();
  const [selectedGramPanchayat, setSelectedGramPanchayat] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [verificationItems, setVerificationItems] = useState<VerificationItem[]>([
    { id: "1", label: "Verify the completed household in village.", verified: false },
    { id: "2", label: "Verify the number of beneficiaries linked with scheme.", verified: false },
    { id: "3", label: "Verify the number of action plans and estimate submitted.", verified: false },
    { id: "4", label: "Verify the village score of current date.", verified: false },
    { id: "5", label: "Verify VDP Estimate.", verified: false },
  ]);

  const handleVerify = (id: string) => {
    setVerificationItems(
      verificationItems.map((item) =>
        item.id === id ? { ...item, verified: true } : item
      )
    );
    toast({
      title: "Verified",
      description: "Item verified successfully",
    });
  };

  const allVerified = verificationItems.every((item) => item.verified);

  const handleGenerateVDP = () => {
    if (!allVerified) {
      toast({
        title: "Error",
        description: "Please verify all items before generating VDP",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "VDP generated successfully",
    });
  };

  const handleSubmitVDP = () => {
    if (!allVerified) {
      toast({
        title: "Error",
        description: "Please verify all items before submitting VDP",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "VDP submitted to District successfully",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Generate Complete VDP
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gramPanchayat">Gram Panchayat <span className="text-destructive">*</span></Label>
                  <Select value={selectedGramPanchayat} onValueChange={setSelectedGramPanchayat}>
                    <SelectTrigger id="gramPanchayat" data-testid="select-gram-panchayat">
                      <SelectValue placeholder="--Select Gram Panchayat--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6950">Blandpur - 6950</SelectItem>
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
                      <SelectItem value="3">Buland Pur - 4186 [ 2018-2019 ]</SelectItem>
                      <SelectItem value="1">Rewla Khanm Pur - 64014 [ 2022-2023 ]</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="default" className="gap-1" data-testid="button-view">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </div>

            {selectedVillage && (
              <>
                <div className="text-sm">
                  Verify the Formats for Gram Panchayat -{" "}
                  <span className="font-semibold text-primary">
                    {selectedGramPanchayat === "6950" ? "Blandpur (6950)" : "Delhi West (450010)"}
                  </span>{" "}
                  & Village -{" "}
                  <span className="font-semibold text-primary">
                    {selectedVillage === "3" ? "Buland Pur (4186)" : "Rewla Khanm Pur (64014)"}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">VDP Generate Status</h3>
                  
                  <div className="space-y-3">
                    {verificationItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                        data-testid={`verification-item-${item.id}`}
                      >
                        <div className="flex items-center gap-3">
                          {item.verified ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <XCircle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="text-sm">
                            {String.fromCharCode(105 + index)}) {item.label}
                          </span>
                        </div>
                        <Button
                          variant={item.verified ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVerify(item.id)}
                          disabled={item.verified}
                          data-testid={`button-verify-${item.id}`}
                        >
                          {item.verified ? "Verified" : "Verify"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="gap-1"
                    onClick={handleGenerateVDP}
                    disabled={!allVerified}
                    data-testid="button-generate-vdp"
                  >
                    <FileText className="h-4 w-4" />
                    Generate Draft VDP
                  </Button>
                  <Button
                    className="gap-1"
                    onClick={handleSubmitVDP}
                    disabled={!allVerified}
                    data-testid="button-submit-vdp"
                  >
                    <Send className="h-4 w-4" />
                    Submit VDP to District
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
