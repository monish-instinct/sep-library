
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import AnalyticsCard from "@/components/AnalyticsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  BookOpenCheck, 
  User, 
  CalendarClock, 
  BookMarked, 
  TrendingUp, 
  BookOpen, 
  Clock,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CreditCard,
  DollarSign,
  Library
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/PageHeader";
import { Search } from "@/components/Search";

// Sample data for the dashboard
const recentActivities = [
  {
    id: "1",
    action: "Book borrowed",
    book: "The Midnight Library",
    user: "John Doe",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    action: "Book returned",
    book: "Atomic Habits",
    user: "Jane Smith",
    timestamp: "3 hours ago",
  },
  {
    id: "3",
    action: "New member joined",
    user: "Alex Johnson",
    timestamp: "5 hours ago",
  },
  {
    id: "4",
    action: "Book reservation",
    book: "Project Hail Mary",
    user: "Sarah Williams",
    timestamp: "Yesterday",
  },
  {
    id: "5",
    action: "Overdue notice sent",
    book: "Dune",
    user: "Michael Brown",
    timestamp: "Yesterday",
  },
];

const overdueBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    borrower: "Emma Wilson",
    dueDate: "3 days ago",
    status: "critical",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    borrower: "James Taylor",
    dueDate: "1 week ago",
    status: "critical",
  },
  {
    id: "3",
    title: "1984",
    borrower: "David Miller",
    dueDate: "2 days ago",
    status: "warning",
  },
];

const popularBooks = [
  { id: "1", title: "The Midnight Library", author: "Matt Haig", borrowCount: 42, genre: "Fiction" },
  { id: "2", title: "Atomic Habits", author: "James Clear", borrowCount: 38, genre: "Self-Help" },
  { id: "3", title: "Project Hail Mary", author: "Andy Weir", borrowCount: 35, genre: "Sci-Fi" },
  { id: "4", title: "The House in the Cerulean Sea", author: "TJ Klune", borrowCount: 31, genre: "Fantasy" },
  { id: "5", title: "Educated", author: "Tara Westover", borrowCount: 28, genre: "Memoir" },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleAction = (action: string, item: any) => {
    toast({
      title: "Action taken",
      description: `${action} for "${item.title || item.book || item.user}"`,
    });
  };

  // Filter activities based on search query
  const filteredActivities = recentActivities.filter(
    (activity) => 
      activity.book?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      activity.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <PageHeader
            title="Library Dashboard"
            description="Overview of your library's key metrics and activities"
            action={{
              label: "Generate Report",
              icon: <BarChart2 className="h-4 w-4" />,
              onClick: () => handleNavigation("/reports"),
            }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard 
              title="Total Books"
              value="2,541"
              change="+12% from last month"
              changeType="positive"
              icon={<BookOpen className="h-6 w-6" />}
              onClick={() => handleNavigation("/books")}
            />
            <AnalyticsCard 
              title="Active Members"
              value="842"
              change="+5% from last month"
              changeType="positive"
              icon={<User className="h-6 w-6" />}
              onClick={() => handleNavigation("/members")}
            />
            <AnalyticsCard 
              title="Books Borrowed"
              value="128"
              change="-3% from last month"
              changeType="negative"
              icon={<BookOpenCheck className="h-6 w-6" />}
              onClick={() => handleNavigation("/issue-return")}
            />
            <AnalyticsCard 
              title="Overdue Books"
              value="16"
              change="+4 from last week"
              changeType="negative"
              icon={<CalendarClock className="h-6 w-6" />}
              onClick={() => handleNavigation("/reports")}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities Section */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Latest actions in the library</CardDescription>
                </div>
                <Search 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search activities..."
                  className="w-full max-w-[260px]"
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={activity.action.includes("borrowed") ? "info" : 
                                  activity.action.includes("returned") ? "success" : 
                                  activity.action.includes("overdue") ? "destructive" : "secondary"}>
                              {activity.action}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                          </div>
                          {activity.book && (
                            <p className="text-sm font-medium">{activity.book}</p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {activity.user}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAction("View details", activity)}
                        >
                          Details
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No activities found</p>
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={() => handleNavigation("/reports")}
                >
                  View All Activities
                </Button>
              </CardContent>
            </Card>
            
            {/* Overdue Books Section */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarClock className="h-5 w-5 text-red-500" />
                    Overdue Books
                  </CardTitle>
                  <Badge variant="destructive" className="ml-2">{overdueBooks.length}</Badge>
                </div>
                <CardDescription>Books past their return date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overdueBooks.map((book) => (
                    <div 
                      key={book.id} 
                      className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{book.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={book.status === "critical" ? "destructive" : "warning"}>
                            {book.dueDate}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{book.borrower}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => handleAction("Send reminder", book)}
                        >
                          Remind
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => handleNavigation("/issue-return")}
                        >
                          Process
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={() => handleNavigation("/reports")}
                >
                  View All Overdue
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Popular Books Section */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookMarked className="h-5 w-5 text-primary" />
                      Popular Books
                    </CardTitle>
                    <CardDescription>Most borrowed books this month</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleNavigation("/books")}
                    className="hidden md:flex"
                  >
                    View Catalogue
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularBooks.map((book, index) => (
                    <div
                      key={book.id}
                      className="flex flex-col p-4 rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer"
                      onClick={() => handleAction("View book details", book)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-1">
                            {book.genre}
                          </Badge>
                          <p className="font-medium leading-tight">{book.title}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <div className="flex items-center gap-1 text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                          <TrendingUp className="h-3 w-3" />
                          {book.borrowCount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-6 w-full md:hidden"
                  onClick={() => handleNavigation("/books")}
                >
                  Go to Book Catalogue
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
