import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Devis from "@/pages/Devis";
import Factures from "@/pages/Factures";
import Clients from "@/pages/Clients";
import Parametres from "@/pages/Parametres";
import NouveauDevis from "@/pages/NouveauDevis";
import NouvelleFacture from "@/pages/NouvelleFacture";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/devis" component={Devis} />
      <Route path="/devis/nouveau" component={NouveauDevis} />
      <Route path="/factures" component={Factures} />
      <Route path="/factures/nouvelle" component={NouvelleFacture} />
      <Route path="/clients" component={Clients} />
      <Route path="/parametres" component={Parametres} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;