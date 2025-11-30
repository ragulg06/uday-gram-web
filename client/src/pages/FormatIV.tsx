import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, Plus, Save, Check } from "lucide-react";
import { mockAgencies } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function FormatIV() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("estimation");

  const [formData, setFormData] = useState({
    state: "DELHI",
    district: "SOUTH WEST",
    gramPanchayat: "Delhi West - 450010",
    village: "Rewla Khanm Pur - 64014",
    domain: "1 - Drinking water and Sanitation",
    indicator: "I1 - Whether there are adequate sustainable drinking water sources to cover the village population?",
    workName: "3 hand pumps will be installed to provide adequate water, and 1 small pound will be created for water harvesting to recharge under ground water.",
  });

  const [fundingDetails, setFundingDetails] = useState({
    estimatedCost: 60000,
    centralScheme: "mnrega",
    centralFunds: 5000,
    stateScheme: "kksht",
    stateFunds: 0,
    stateShare: 4,
    gapFilling: 100000,
    totalFunds: 45000,
    agency: "",
  });

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Format IV data saved successfully",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => setLocation("/format-2-edit")}
          data-testid="button-back"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="estimation"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  data-testid="tab-estimation"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                      <Check className="h-3 w-3" />
                    </div>
                    Estimation
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="release"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  data-testid="tab-release"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">2</div>
                    Release
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="utilization"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  data-testid="tab-utilization"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">3</div>
                    Utilization
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="progress"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  data-testid="tab-progress"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">4</div>
                    Work Progress
                  </div>
                </TabsTrigger>
              </TabsList>

              <div className="p-4">
                <Accordion type="single" collapsible defaultValue="work-info" className="mb-4">
                  <AccordionItem value="work-info" className="bg-primary/5 border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-primary">
                      Format-IV: Action Plan and Progress Report of Infrastructure works
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">State:</Label>
                          <p className="text-sm font-medium">{formData.state}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">District:</Label>
                          <p className="text-sm font-medium">{formData.district}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Gram Panchayat:</Label>
                          <p className="text-sm font-medium">{formData.gramPanchayat}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Village:</Label>
                          <p className="text-sm font-medium">{formData.village}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Domain:</Label>
                          <p className="text-sm font-medium">{formData.domain}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Monitorable Indicator:</Label>
                          <p className="text-sm font-medium">{formData.indicator}</p>
                        </div>
                        <div className="md:col-span-2 space-y-1">
                          <Label className="text-xs text-muted-foreground">Name of/Detail of the Works/Activities identified:</Label>
                          <p className="text-sm font-medium">{formData.workName}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <TabsContent value="estimation" className="mt-0 space-y-4">
                  <Accordion type="single" collapsible defaultValue="gap-filling" className="space-y-4">
                    <AccordionItem value="gap-filling" className="bg-primary/5 border rounded-lg">
                      <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-primary">
                        Gap-Filling funds details
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Allocated Gap-Filling funds (Rs.):</Label>
                            <p className="text-sm font-medium">20,00,000</p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Balance Amount of Gap-Filling funds (Rs.):</Label>
                            <p className="text-sm font-medium">19,60,000</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="scheme-details" className="bg-chart-3/5 border rounded-lg">
                      <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-chart-3">
                        Details of scheme from where funds are being sourced
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Estimated Cost in Rs (As provided by concerned authority) <span className="text-destructive">*</span></Label>
                            <Input
                              type="number"
                              value={fundingDetails.estimatedCost}
                              onChange={(e) => setFundingDetails({ ...fundingDetails, estimatedCost: Number(e.target.value) })}
                              data-testid="input-estimated-cost"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Estimated Cost in Rs (As provided by concerned authority) <span className="text-destructive">*</span></Label>
                            <Input type="number" value={50000} disabled className="bg-muted" />
                          </div>
                        </div>

                        <div className="border rounded-lg p-4 space-y-4">
                          <h4 className="text-sm font-medium">Central Govt. Scheme(other than PMAGY)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Name of Scheme</Label>
                              <Input
                                value={fundingDetails.centralScheme}
                                onChange={(e) => setFundingDetails({ ...fundingDetails, centralScheme: e.target.value })}
                                placeholder="mnrega"
                                data-testid="input-central-scheme"
                              />
                              <Button variant="outline" size="sm" className="gap-1 w-full">
                                <Plus className="h-4 w-4" />
                                Name of Scheme
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Label>Funds Allocated in Rs.</Label>
                              <Input
                                type="number"
                                value={fundingDetails.centralFunds}
                                onChange={(e) => setFundingDetails({ ...fundingDetails, centralFunds: Number(e.target.value) })}
                                data-testid="input-central-funds"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4 space-y-4">
                          <h4 className="text-sm font-medium">State Govt. Scheme <span className="text-destructive">*</span></h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Name of Scheme</Label>
                              <Input
                                value={fundingDetails.stateScheme}
                                onChange={(e) => setFundingDetails({ ...fundingDetails, stateScheme: e.target.value })}
                                placeholder="kksht"
                                data-testid="input-state-scheme"
                              />
                              <Button variant="outline" size="sm" className="gap-1 w-full">
                                <Plus className="h-4 w-4" />
                                Name of Scheme
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Label>Funds Allocated in Rs.</Label>
                              <Input
                                type="number"
                                value={fundingDetails.stateFunds}
                                onChange={(e) => setFundingDetails({ ...fundingDetails, stateFunds: Number(e.target.value) })}
                                data-testid="input-state-funds"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>State Govt. Share Under PMAGY <span className="text-destructive">*</span></Label>
                            <Input
                              type="number"
                              value={fundingDetails.stateShare}
                              onChange={(e) => setFundingDetails({ ...fundingDetails, stateShare: Number(e.target.value) })}
                              placeholder="Amount in Rs *"
                              data-testid="input-state-share"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Amount in Rs <span className="text-destructive">*</span></Label>
                            <Input type="number" value={0} disabled className="bg-muted" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Gap-Filling funds, under PMAGY <span className="text-destructive">*</span></Label>
                            <p className="text-xs text-muted-foreground">(Funding for indicator 5.2 is not allowed. Refer letter.)</p>
                            <Input
                              type="number"
                              value={fundingDetails.gapFilling}
                              onChange={(e) => setFundingDetails({ ...fundingDetails, gapFilling: Number(e.target.value) })}
                              data-testid="input-gap-filling"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Amount in Rs <span className="text-destructive">*</span></Label>
                            <Input type="number" value={4} disabled className="bg-muted" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Total Funds Allocated in Rs. <span className="text-destructive">*</span></Label>
                            <Input
                              type="number"
                              value={fundingDetails.totalFunds}
                              onChange={(e) => setFundingDetails({ ...fundingDetails, totalFunds: Number(e.target.value) })}
                              data-testid="input-total-funds"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Amount in Rs <span className="text-destructive">*</span></Label>
                            <Input type="number" value={45000} disabled className="bg-muted" />
                          </div>
                        </div>

                        <div className="border rounded-lg p-4 space-y-4">
                          <h4 className="text-sm font-medium">Agency / Department for implementation <span className="text-destructive">*</span></h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Agency Name <span className="text-destructive">*</span></Label>
                              <Select
                                value={fundingDetails.agency}
                                onValueChange={(value) => setFundingDetails({ ...fundingDetails, agency: value })}
                              >
                                <SelectTrigger data-testid="select-agency">
                                  <SelectValue placeholder="Select agency" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockAgencies.map((agency) => (
                                    <SelectItem key={agency.id} value={agency.id}>
                                      {agency.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-end">
                              <Button variant="link" size="sm" className="text-primary">
                                Add New Agency
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex justify-end">
                    <Button onClick={handleSave} className="gap-1" data-testid="button-save-format-4">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="release" className="mt-0 space-y-4">
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="text-sm font-semibold">Details of scheme from where funds are being sourced</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Central Govt. Scheme(other than PMAGY) <span className="text-destructive">*</span></Label>
                        <Input placeholder="Name of Scheme *" />
                      </div>
                      <div className="space-y-2">
                        <Label>Funds Allocated in Rs.</Label>
                        <Input type="number" value={0} disabled className="bg-muted" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>State Govt. Scheme <span className="text-destructive">*</span></Label>
                        <Input placeholder="Name of Scheme *" />
                      </div>
                      <div className="space-y-2">
                        <Label>Funds Allocated in Rs.</Label>
                        <Input type="number" value={0} disabled className="bg-muted" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>State Govt. Share Under PMAGY <span className="text-destructive">*</span></Label>
                        <Input type="number" value={0} disabled className="bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <Label>Amount in Rs <span className="text-destructive">*</span></Label>
                        <Input type="number" value={0} disabled className="bg-muted" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Gap-Filling funds, under PMAGY <span className="text-destructive">*</span></Label>
                        <Input type="number" value={0} disabled className="bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <Label>Amount in Rs <span className="text-destructive">*</span></Label>
                        <Input type="number" value={0} disabled className="bg-muted" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Total Funds Allocated in Rs. <span className="text-destructive">*</span></Label>
                        <Input type="number" value={100000} disabled className="bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <Label>Amount in Rs <span className="text-destructive">*</span></Label>
                        <Input type="number" value={100000} disabled className="bg-muted" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSave} className="gap-1">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="utilization" className="mt-0 space-y-4">
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="text-sm font-semibold">Utilization Details</h4>
                    <p className="text-sm text-muted-foreground">Utilization tracking for funds released</p>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSave} className="gap-1">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="mt-0 space-y-4">
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="text-sm font-semibold">Work Progress</h4>
                    <p className="text-sm text-muted-foreground">Track physical progress of infrastructure works</p>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSave} className="gap-1">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
