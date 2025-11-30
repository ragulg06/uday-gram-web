import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import VillageVerification from "@/pages/VillageVerification";
import FormatIAdd from "@/pages/FormatIAdd";
import FormatIIAdd from "@/pages/FormatIIAdd";
import FormatIIIAAdd from "@/pages/FormatIIIAAdd";
import FormatIIIASurvey from "@/pages/FormatIIIASurvey";
import FormatIIIB from "@/pages/FormatIIIB";
import FormatIV from "@/pages/FormatIV";
import AgencyAdd from "@/pages/AgencyAdd";
import AgencyList from "@/pages/AgencyList";
import VillageScore from "@/pages/VillageScore";
import VDPGenerate from "@/pages/VDPGenerate";
import VDPUnlock from "@/pages/VDPUnlock";
import ProgressFormat4 from "@/pages/ProgressFormat4";
import ProgressFormat5 from "@/pages/ProgressFormat5";
import ProgressFormat7 from "@/pages/ProgressFormat7";
import AdarshGramDeclare from "@/pages/AdarshGramDeclare";
import Reports from "@/pages/Reports";
import FAQ from "@/pages/FAQ";
import Help from "@/pages/Help";
import Tutorials from "@/pages/Tutorials";
import SiteMap from "@/pages/SiteMap";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/village-verification" component={VillageVerification} />
      <Route path="/format-1-add" component={FormatIAdd} />
      <Route path="/format-1-edit" component={FormatIAdd} />
      <Route path="/format-2-add" component={FormatIIAdd} />
      <Route path="/format-2-edit" component={FormatIIAdd} />
      <Route path="/format-3a-add" component={FormatIIIAAdd} />
      <Route path="/format-3a-survey" component={FormatIIIASurvey} />
      <Route path="/format-3a-household" component={FormatIIIASurvey} />
      <Route path="/format-3b" component={FormatIIIB} />
      <Route path="/format-4" component={FormatIV} />
      <Route path="/agency-add" component={AgencyAdd} />
      <Route path="/agency-list" component={AgencyList} />
      <Route path="/village-score" component={VillageScore} />
      <Route path="/vdp-generate" component={VDPGenerate} />
      <Route path="/vdp-unlock" component={VDPUnlock} />
      <Route path="/progress-format-4" component={ProgressFormat4} />
      <Route path="/progress-format-5" component={ProgressFormat5} />
      <Route path="/progress-format-7" component={ProgressFormat7} />
      <Route path="/adarsh-gram-declare" component={AdarshGramDeclare} />
      <Route path="/reports" component={Reports} />
      <Route path="/faq" component={FAQ} />
      <Route path="/help" component={Help} />
      <Route path="/tutorials" component={Tutorials} />
      <Route path="/sitemap" component={SiteMap} />
      <Route path="/contact" component={Contact} />
      <Route path="/contact-nodal-officer" component={Contact} />
      <Route path="/nodal-officer-details" component={Contact} />
      <Route path="/upload-media" component={Help} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
