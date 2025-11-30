import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, RefreshCw, Lock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    captchaInput: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setFormData(prev => ({ ...prev, captchaInput: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.loginId || !formData.password) {
      toast({
        title: "Error",
        description: "Please enter Login ID and Password",
        variant: "destructive",
      });
      return;
    }

    if (formData.captchaInput.toLowerCase() !== captcha.toLowerCase()) {
      toast({
        title: "Error",
        description: "Invalid captcha. Please try again.",
        variant: "destructive",
      });
      handleRefreshCaptcha();
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Login successful! Redirecting...",
      });
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%)",
      }}
    >
      <header className="bg-[#0a1628] border-b border-[#1e3a5f]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <span>भारत सरकार | सामाजिक न्याय और अधिकारिता मंत्रालय</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Ministry of Social Justice and Empowerment</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Government of India</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white/10">A-</Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white/10">A</Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white/10">A+</Button>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent border-white/30 text-white hover:bg-white/10">
                LOGIN
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent border-white/30 text-white hover:bg-white/10">
                DEMO LOGIN
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Government of India" 
                className="h-16 w-16"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  Pradhan Mantri Adarsh Gram Yojna (PMAGY)
                </h1>
                <p className="text-sm text-gray-600">
                  Department of Social Justice & Empowerment,
                </p>
                <p className="text-sm text-gray-600">Government of India.</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Azadi_Ka_Amrit_Mahotsav_logo.svg" 
                alt="Azadi Ka Amrit Mahotsav" 
                className="h-14"
              />
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-[#1a5f2a] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3 text-sm font-medium overflow-x-auto">
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap">Home</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap">About us</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap">Reports</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap">Gallery</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap">Downloads</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap">Contact us</a>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <Card className="w-full max-w-md relative bg-white/95 backdrop-blur shadow-2xl" data-testid="login-card">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="Government of India" 
                  className="h-10 w-10"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              For Authorized Users Of Village, District,<br />
              State & Ministry only
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginId">Login Id</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="loginId"
                    type="text"
                    placeholder="Login Id"
                    className="pl-10"
                    value={formData.loginId}
                    onChange={(e) => setFormData(prev => ({ ...prev, loginId: e.target.value }))}
                    data-testid="input-login-id"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline" data-testid="link-forgot-password">
                    Forgot password ?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    data-testid="input-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Captcha</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-10 bg-muted rounded-md flex items-center justify-center font-mono text-lg tracking-widest select-none"
                       style={{ 
                         background: "linear-gradient(45deg, #f3f4f6, #e5e7eb)",
                         textDecoration: "line-through",
                         fontStyle: "italic",
                       }}>
                    {captcha}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRefreshCaptcha}
                    className="gap-1"
                    data-testid="button-refresh-captcha"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Captcha"
                  value={formData.captchaInput}
                  onChange={(e) => setFormData(prev => ({ ...prev, captchaInput: e.target.value }))}
                  data-testid="input-captcha"
                />
                <p className="text-xs text-muted-foreground">
                  For captcha error message, please press<br />
                  Ctrl with F5 to clear browser cookies.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                data-testid="button-sign-in"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <footer className="bg-[#1a5f2a] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs mb-3">
            <a href="#" className="hover:text-yellow-300">Home</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-300">About Us</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-300">Feedback / Suggestion / Help</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-300">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-300">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-300">Copyright Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-300">Hyperlinking Policy</a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a href="#" className="hover:text-yellow-300">Web Information manager</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-300">Contact Us</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-300">Sitemap</a>
          </div>
        </div>
      </footer>

      <div className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/a/a7/National_Informatics_Centre_logo.png" 
                alt="NIC" 
                className="h-12"
              />
              <p className="text-xs text-gray-600">
                This site is designed, developed, hosted and maintained by National<br />
                Informatics Centre,Department of Social Justice and Empowerment, Ministry<br />
                of Social Justice and Empowerment, Government of India.
              </p>
            </div>
            <p className="text-xs text-gray-600">
              <strong>Help-desk Email:</strong> support[dot]pmagy-msje[at]gov[dot]in
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
            <p>No. Of Visitors <strong>2,12,28,501</strong></p>
            <p>Page last updated on: <strong className="text-primary">16-04-2024</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
