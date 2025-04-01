
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ArrowDown, ArrowUp, Download, FileText, Search, Filter } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

// Sample data for charts
const monthlyData = [
  { month: "Jan", borrows: 65, returns: 42 },
  { month: "Feb", borrows: 59, returns: 55 },
  { month: "Mar", borrows: 80, returns: 72 },
  { month: "Apr", borrows: 81, returns: 78 },
  { month: "May", borrows: 56, returns: 60 },
  { month: "Jun", borrows: 55, returns: 50 },
  { month: "Jul", borrows: 40, returns: 45 },
  { month: "Aug", borrows: 75, returns: 70 },
  { month: "Sep", borrows: 90, returns: 85 },
  { month: "Oct", borrows: 65, returns: 60 },
  { month: "Nov", borrows: 68, returns: 63 },
  { month: "Dec", borrows: 45, returns: 40 },
];

const genreData = [
  { name: "Fiction", value: 35 },
  { name: "Non-Fiction", value: 25 },
  { name: "Science", value: 15 },
  { name: "Biography", value: 10 },
  { name: "History", value: 15 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const overdueBooksData = [
  { 
    id: "1", 
    title: "The Great Gatsby", 
    member: "John Doe", 
    borrowDate: "2023-08-15", 
    dueDate: "2023-08-29", 
    daysOverdue: 7,
    status: "critical"
  },
  { 
    id: "2", 
    title: "To Kill a Mockingbird", 
    member: "Jane Smith", 
    borrowDate: "2023-08-20", 
    dueDate: "2023-09-03", 
    daysOverdue: 2,
    status: "warning"
  },
  { 
    id: "3", 
    title: "The Catcher in the Rye", 
    member: "David Johnson", 
    borrowDate: "2023-08-10", 
    dueDate: "2023-08-24", 
    daysOverdue: 12,
    status: "critical"
  },
  { 
    id: "4", 
    title: "1984", 
    member: "Sarah Williams", 
    borrowDate: "2023-08-22", 
    dueDate: "2023-09-05", 
    daysOverdue: 1,
    status: "warning"
  },
  { 
    id: "5", 
    title: "Pride and Prejudice", 
    member: "Michael Brown", 
    borrowDate: "2023-08-05", 
    dueDate: "2023-08-19", 
    daysOverdue: 17,
    status: "critical"
  },
];

const popularBooksData = [
  { id: "1", title: "Atomic Habits", author: "James Clear", borrowCount: 42, rating: 4.8 },
  { id: "2", title: "The Midnight Library", author: "Matt Haig", borrowCount: 38, rating: 4.6 },
  { id: "3", title: "Project Hail Mary", author: "Andy Weir", borrowCount: 35, rating: 4.7 },
  { id: "4", title: "Where the Crawdads Sing", author: "Delia Owens", borrowCount: 32, rating: 4.5 },
  { id: "5", title: "The Silent Patient", author: "Alex Michaelides", borrowCount: 29, rating: 4.3 },
];

const Reports = () => {
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleGenerateReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `${type} report has been generated for ${reportPeriod} period.`,
    });
  };

  const handleDownload = (format: string) => {
    toast({
      title: "Download Started",
      description: `Report is being downloaded in ${format} format.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <PageHeader
            title="Library Reports"
            description="Analyze library data and generate reports"
            action={{
              label: "Export Data",
              icon: <Download className="h-4 w-4" />,
              onClick: () => handleDownload("PDF")
            }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">2,541</CardTitle>
                <CardDescription>Total Books</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">12%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">842</CardTitle>
                <CardDescription>Active Members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">5%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">128</CardTitle>
                <CardDescription>Books Borrowed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500 font-medium">3%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">16</CardTitle>
                <CardDescription>Overdue Books</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500 font-medium">4</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">
                Showing data for: <span className="font-medium">{reportPeriod.charAt(0).toUpperCase() + reportPeriod.slice(1)} Report</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleDownload("PDF")}>
                <FileText className="mr-2 h-4 w-4" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload("CSV")}>
                <FileText className="mr-2 h-4 w-4" /> CSV
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Activity</CardTitle>
                    <CardDescription>Book borrows and returns over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="borrows" name="Borrows" fill="#8884d8" />
                          <Bar dataKey="returns" name="Returns" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <Button 
                      className="mt-4 w-full"
                      onClick={() => handleGenerateReport("Activity")}
                    >
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Books by Genre</CardTitle>
                    <CardDescription>Distribution of library books by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={genreData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {genreData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <Button 
                      className="mt-4 w-full"
                      onClick={() => handleGenerateReport("Genre Distribution")}
                    >
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="books" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Books</CardTitle>
                  <CardDescription>Most borrowed books</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Book</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Author</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Borrows</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {popularBooksData.map((book) => (
                          <tr key={book.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{book.title}</td>
                            <td className="p-4 align-middle">{book.author}</td>
                            <td className="p-4 align-middle">{book.borrowCount}</td>
                            <td className="p-4 align-middle">{book.rating}/5</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button 
                    className="mt-6 w-full"
                    onClick={() => handleGenerateReport("Popular Books")}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="members" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Member Activity</CardTitle>
                  <CardDescription>Member registration and activity trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="borrows" name="Active Members" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <Button 
                    className="mt-4 w-full"
                    onClick={() => handleGenerateReport("Member Activity")}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="overdue" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
                  <div>
                    <CardTitle>Overdue Books</CardTitle>
                    <CardDescription>Books past their return date</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search" 
                        placeholder="Search overdue books..." 
                        className="pl-8 w-full md:w-auto"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Book</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Member</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Due Date</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Days Overdue</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {overdueBooksData
                          .filter(book => 
                            book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.member.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((book) => (
                          <tr key={book.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{book.title}</td>
                            <td className="p-4 align-middle">{book.member}</td>
                            <td className="p-4 align-middle">{book.dueDate}</td>
                            <td className="p-4 align-middle">{book.daysOverdue}</td>
                            <td className="p-4 align-middle">
                              <Badge 
                                variant={book.status === "critical" ? "destructive" : "warning"}
                              >
                                {book.status === "critical" ? "Critical" : "Warning"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button 
                    className="mt-6 w-full"
                    onClick={() => handleGenerateReport("Overdue Books")}
                  >
                    Generate Overdue Report
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Reports;
