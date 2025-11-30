import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userName="Nodal Officer"
          userRole="SOUTH WEST (DELHI)"
          lastLogin="03-04-2024 2:40 pm"
        />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          {children}
        </main>

        <footer className="border-t bg-destructive py-2 px-4 text-center">
          <p className="text-xs text-destructive-foreground">
            Technical Support: <span className="font-medium">support[dot]pmagy-msje[at]gov[dot]in</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
