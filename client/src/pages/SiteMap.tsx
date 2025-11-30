import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { siteMapLinks } from "@/lib/mockData";

const routeMap: Record<string, string> = {
  "Home": "/",
  "Dashboard": "/dashboard",
  "Login": "/login",
  "Logout": "/login",
  "Village Verification": "/village-verification",
  "Format I - Village Profile": "/format-1-add",
  "Format II - Infrastructure": "/format-2-add",
  "Format III(A) - Household Survey": "/format-3a-add",
  "Format III(B) - Beneficiary Initiatives": "/format-3b",
  "Format IV - Costing": "/format-4",
  "Generate Village Score": "/village-score",
  "Manage VDP": "/vdp-generate",
  "Submit Progress": "/progress-format-4",
  "Adarsh Gram Declaration": "/adarsh-gram-declare",
  "Agency Management": "/agency-list",
  "Reports": "/reports",
  "Upload Video/Image": "/upload-media",
  "Tutorial Videos": "/tutorials",
  "FAQ": "/faq",
  "Contact Us": "/contact",
  "Site Map": "/sitemap",
  "Feedback": "/help",
};

export default function SiteMap() {
  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Site Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteMapLinks.map((category) => (
                <div key={category.category} className="space-y-3" data-testid={`sitemap-category-${category.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <h3 className="font-semibold text-primary border-b border-primary/20 pb-2">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link}>
                        <Link 
                          href={routeMap[link] || "#"}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ChevronRight className="h-3 w-3" />
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
