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
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Help() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your query has been submitted. We will respond shortly.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      message: "",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Submit a Query</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Your Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        data-testid="input-phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Query Category <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger id="category" data-testid="select-category">
                          <SelectValue placeholder="--Select Category--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="login">Login Issues</SelectItem>
                          <SelectItem value="data-entry">Data Entry</SelectItem>
                          <SelectItem value="reports">Reports</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="general">General Query</SelectItem>
                          <SelectItem value="feedback">Feedback/Suggestion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Enter subject"
                      data-testid="input-subject"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Your Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your query or issue in detail..."
                      rows={5}
                      data-testid="textarea-message"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="gap-1" data-testid="button-submit-query">
                      <Send className="h-4 w-4" />
                      Submit Query
                    </Button>
                  </div>
                </form>
              </div>

              <div className="space-y-4">
                <Card className="bg-primary/5">
                  <CardContent className="p-4 space-y-4">
                    <h4 className="font-semibold">Contact Information</h4>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground break-all">
                          support[dot]pmagy-msje[at]gov[dot]in
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Helpdesk</p>
                        <p className="text-sm text-muted-foreground">1800-XXX-XXXX (Toll Free)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Working Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Mon - Fri: 9:30 AM - 6:00 PM<br />
                          (Except Government Holidays)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          Department of Social Justice and Empowerment<br />
                          Ministry of Social Justice and Empowerment<br />
                          Shastri Bhawan, New Delhi - 110001
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-chart-3/5">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="/faq" className="text-primary hover:underline">Frequently Asked Questions</a>
                      </li>
                      <li>
                        <a href="/tutorials" className="text-primary hover:underline">Tutorial Videos</a>
                      </li>
                      <li>
                        <a href="/sitemap" className="text-primary hover:underline">Site Map</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">User Manual (PDF)</a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
