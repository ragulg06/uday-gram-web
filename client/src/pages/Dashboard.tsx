import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Home, 
  Users, 
  Wrench, 
  CheckCircle2, 
  TrendingUp,
  ChevronRight
} from "lucide-react";
import {
  dashboardStats,
  adarshGramDeclarationData,
  schemeWiseFundAllocation,
  completionOfInfraWorks,
  householdsSurveyData,
  infrastructureWorkInfo,
  villageVdpData,
  estimationWorksConvergence,
  estimationWorksGapFilling,
} from "@/lib/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color = "primary" 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType; 
  color?: "primary" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    "chart-2": "bg-chart-2/10 text-chart-2",
    "chart-3": "bg-chart-3/10 text-chart-3",
    "chart-4": "bg-chart-4/10 text-chart-4",
    "chart-5": "bg-chart-5/10 text-chart-5",
  };

  return (
    <Card className="hover-elevate" data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-2 rounded-full ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <Button variant="link" size="sm" className="text-xs gap-1 h-auto p-0" data-testid={`button-more-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            More <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(2)} L`;
    }
    return value.toLocaleString();
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              No. of Villages covered{" "}
              <Badge variant="default" className="ml-1 text-lg px-3" data-testid="badge-villages-count">
                {dashboardStats.villagesCovered}
              </Badge>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Villages Covered"
            value={dashboardStats.villagesCovered}
            icon={Home}
            color="primary"
          />
          <StatCard
            title="Households Surveyed"
            value={dashboardStats.householdsSurveyed.toLocaleString()}
            icon={Users}
            color="chart-2"
          />
          <StatCard
            title="Infra Works In Progress"
            value={dashboardStats.infraWorksInProgress}
            icon={Wrench}
            color="chart-3"
          />
          <StatCard
            title="Infra Works Completed"
            value={dashboardStats.infraWorksCompleted}
            icon={CheckCircle2}
            color="primary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard title="Adarsh Gram Declaration">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adarshGramDeclarationData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="totalVillages" fill="hsl(var(--chart-2))" name="Total Villages" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="declared" fill="hsl(var(--primary))" name="Declared" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-chart-2" />
                <span className="text-xs text-muted-foreground">Total Villages</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-xs text-muted-foreground">Declared</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Scheme wise fund allocation for VDP">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={schemeWiseFundAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                    labelLine={false}
                  >
                    {schemeWiseFundAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {schemeWiseFundAllocation.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Completion of Infrastructure works">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completionOfInfraWorks}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                    labelLine={false}
                  >
                    {completionOfInfraWorks.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {completionOfInfraWorks.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Households Survey">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={householdsSurveyData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Infrastructure Work Information">
            <p className="text-xs text-muted-foreground mb-2">Top 10 villages with completed works</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={infrastructureWorkInfo}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="domain" tick={{ fontSize: 8 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="inProgress" stackId="a" fill="#F59E0B" name="In Progress" />
                  <Bar dataKey="completed" stackId="a" fill="#22C55E" name="Completed" />
                  <Bar dataKey="gapFilling" stackId="a" fill="#3B82F6" name="Gap-filling Funds" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
                <span className="text-xs text-muted-foreground">In Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#22C55E]" />
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#3B82F6]" />
                <span className="text-xs text-muted-foreground">Gap-filling Funds</span>
              </div>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard title="Village VDP">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={villageVdpData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ value }) => value}
                    labelLine={false}
                  >
                    {villageVdpData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              {villageVdpData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Estimation of works through Convergence">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={estimationWorksConvergence}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ value }) => value}
                    labelLine={false}
                  >
                    {estimationWorksConvergence.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {estimationWorksConvergence.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Estimation of works through Gap-filling fund">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={estimationWorksGapFilling}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ value }) => value}
                    labelLine={false}
                  >
                    {estimationWorksGapFilling.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {estimationWorksGapFilling.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Beneficiaries Identified and Saturated</CardTitle>
              <Button variant="link" size="sm" className="text-xs gap-1 h-auto p-0">
                More <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Non-saturated: <strong className="text-foreground">{dashboardStats.beneficiariesIdentified - dashboardStats.beneficiariesSaturated}</strong></span>
                </div>
                <div className="h-6 bg-chart-2 rounded-md relative overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-primary"
                    style={{ width: `${(dashboardStats.beneficiariesSaturated / dashboardStats.beneficiariesIdentified) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Saturated: <strong className="text-foreground">{dashboardStats.beneficiariesSaturated}</strong></span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Beneficiaries: {dashboardStats.beneficiariesIdentified}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-chart-2" />
                    <span className="text-xs text-muted-foreground">Non-saturated</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                    <span className="text-xs text-muted-foreground">Saturated</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-destructive" />
                    <span className="text-xs text-muted-foreground">Beneficiaries</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
