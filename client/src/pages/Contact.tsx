import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Globe, Clock } from "lucide-react";

export default function Contact() {
  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Ministry Contact</h3>
                  <Card className="bg-primary/5">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full shrink-0">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Ministry of Social Justice and Empowerment</p>
                          <p className="text-sm text-muted-foreground">
                            Department of Social Justice and Empowerment<br />
                            Shastri Bhawan, Dr. Rajendra Prasad Road<br />
                            New Delhi - 110001
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full shrink-0">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">+91-11-23386627, 23383699</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full shrink-0">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <p className="text-sm text-muted-foreground">
                            <a href="https://socialjustice.gov.in" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                              https://socialjustice.gov.in
                            </a>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Technical Support</h3>
                  <Card className="bg-chart-3/5">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-chart-3/20 rounded-full shrink-0">
                          <Mail className="h-4 w-4 text-chart-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Help Desk Email</p>
                          <p className="text-sm text-muted-foreground">
                            support[dot]pmagy-msje[at]gov[dot]in
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-chart-3/20 rounded-full shrink-0">
                          <Clock className="h-4 w-4 text-chart-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Working Hours</p>
                          <p className="text-sm text-muted-foreground">
                            Monday to Friday<br />
                            9:30 AM - 6:00 PM IST<br />
                            (Except Government Holidays)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">National Informatics Centre</h3>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-full shrink-0">
                          <MapPin className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">NIC, Ministry of Electronics & IT</p>
                          <p className="text-sm text-muted-foreground">
                            A-Block, CGO Complex<br />
                            Lodhi Road, New Delhi - 110003
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-full shrink-0">
                          <Globe className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <p className="text-sm text-muted-foreground">
                            <a href="https://www.nic.in" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                              https://www.nic.in
                            </a>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Important Links</h3>
                  <Card className="bg-primary/5">
                    <CardContent className="p-4">
                      <ul className="space-y-3 text-sm">
                        <li>
                          <a href="https://india.gov.in" className="text-primary hover:underline flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                            National Portal of India
                          </a>
                        </li>
                        <li>
                          <a href="https://socialjustice.gov.in" className="text-primary hover:underline flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                            Ministry of Social Justice & Empowerment
                          </a>
                        </li>
                        <li>
                          <a href="https://pmagy.gov.in" className="text-primary hover:underline flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                            PM-AJAY Official Website
                          </a>
                        </li>
                        <li>
                          <a href="https://mygov.in" className="text-primary hover:underline flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                            MyGov Portal
                          </a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
