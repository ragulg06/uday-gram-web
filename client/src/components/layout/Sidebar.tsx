import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckCircle,
  FileText,
  Building2,
  BarChart3,
  FolderKanban,
  TrendingUp,
  Award,
  FileBarChart,
  Video,
  Upload,
  Phone,
  Users,
  HelpCircle,
  MessageSquare,
  Map,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Village Verification 2021-22",
    href: "/village-verification",
    icon: CheckCircle,
  },
  {
    title: "Village Format I to IV",
    icon: FileText,
    children: [
      { title: "Format - I - Add", href: "/format-1-add" },
      { title: "Format - I - Edit", href: "/format-1-edit" },
      { title: "Format - II - Add", href: "/format-2-add" },
      { title: "Format - II - Edit", href: "/format-2-edit" },
      { title: "Format - III(A) Add", href: "/format-3a-add" },
      { title: "Format - III(A) Survey Edit", href: "/format-3a-survey" },
      { title: "Format - III(A) Household Edit", href: "/format-3a-household" },
      { title: "Format - III(B) Add/Edit", href: "/format-3b" },
      { title: "Format - IV", href: "/format-4" },
    ],
  },
  {
    title: "Agency",
    icon: Building2,
    children: [
      { title: "Add Agency", href: "/agency-add" },
      { title: "Agency List", href: "/agency-list" },
    ],
  },
  {
    title: "Generate Village Score",
    href: "/village-score",
    icon: BarChart3,
  },
  {
    title: "Manage VDP",
    icon: FolderKanban,
    children: [
      { title: "Generate Complete VDP", href: "/vdp-generate" },
      { title: "Unlock VDP Request", href: "/vdp-unlock" },
    ],
  },
  {
    title: "Submit Progress",
    icon: TrendingUp,
    children: [
      { title: "Format - IV Progress", href: "/progress-format-4" },
      { title: "Format - V", href: "/progress-format-5" },
      { title: "Format - VII", href: "/progress-format-7" },
    ],
  },
  {
    title: "Manage Adarsh Gram",
    icon: Award,
    children: [
      { title: "Declare Adarsh Gram", href: "/adarsh-gram-declare" },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileBarChart,
  },
  {
    title: "Tutorial Videos",
    href: "/tutorials",
    icon: Video,
  },
  {
    title: "Upload Video/Image",
    href: "/upload-media",
    icon: Upload,
  },
  {
    title: "Contact State Nodal Officer",
    href: "/contact-nodal-officer",
    icon: Phone,
  },
  {
    title: "Nodal Officer Details",
    href: "/nodal-officer-details",
    icon: Users,
  },
  {
    title: "FAQ",
    href: "/faq",
    icon: HelpCircle,
  },
  {
    title: "Help",
    href: "/help",
    icon: MessageSquare,
  },
  {
    title: "Contact Us",
    href: "/contact",
    icon: Phone,
  },
  {
    title: "Site Map",
    href: "/sitemap",
    icon: Map,
  },
];

function NavItemComponent({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const hasActiveChild = item.children?.some(child => location === child.href);
  const Icon = item.icon;

  if (item.children) {
    return (
      <Collapsible open={isOpen || hasActiveChild} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 px-3 py-2 h-auto font-normal",
              (isOpen || hasActiveChild) && "bg-sidebar-accent"
            )}
            data-testid={`nav-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left text-sm">{item.title}</span>
            {isOpen || hasActiveChild ? (
              <ChevronDown className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 mt-1 space-y-1">
          {item.children.map((child) => (
            <Link key={child.href} href={child.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 px-3 py-1.5 h-auto font-normal text-sm",
                  location === child.href && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                )}
                data-testid={`nav-item-${child.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <ChevronRight className="h-3 w-3 shrink-0" />
                <span className="text-left">{child.title}</span>
              </Button>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link href={item.href!}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 py-2 h-auto font-normal",
          isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
        )}
        data-testid={`nav-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="text-sm">{item.title}</span>
      </Button>
    </Link>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        data-testid="sidebar"
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Government of India" 
                className="h-7 w-7 filter invert brightness-0"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-primary leading-tight">PMAGY</span>
              <span className="text-xs text-muted-foreground">Adarsh Gram</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
            data-testid="button-sidebar-close"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItemComponent
                key={item.title}
                item={item}
                isActive={item.href === location}
              />
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="rounded-lg bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground mb-1">Technical Support:</p>
            <p className="text-xs font-medium text-primary break-all">
              support[dot]pmagy-msje[at]gov[dot]in
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
