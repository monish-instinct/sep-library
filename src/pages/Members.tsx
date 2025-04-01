
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { PageHeader } from "@/components/PageHeader";
import { Search } from "@/components/Search";
import AnalyticsCard from "@/components/AnalyticsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  BadgeCheck,
  BookOpen,
  ChevronDown,
  Clock,
  Filter,
  Loader2,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  Search as SearchIcon,
  User,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  ListFilter,
  Edit,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock10,
  UserCog,
  Calendar,
  CreditCard,
  ArrowUpDown,
  UserCircle,
  History
} from "lucide-react";

// Sample member data
const memberData = [
  {
    id: "M001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    membershipType: "Standard",
    status: "active",
    joinedDate: "2022-01-15",
    expiryDate: "2023-01-15",
    profileImage: "",
    address: "123 Main St, Anytown, USA",
    borrowedBooks: [
      { id: "B002", title: "To Kill a Mockingbird", dueDate: "2023-05-30" }
    ],
    borrowingHistory: [
      { id: "T001", bookId: "B001", title: "The Great Gatsby", borrowDate: "2022-12-10", returnDate: "2022-12-30" },
      { id: "T002", bookId: "B003", title: "1984", borrowDate: "2022-11-05", returnDate: "2022-11-25" }
    ]
  },
  {
    id: "M002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    membershipType: "Premium",
    status: "active",
    joinedDate: "2022-03-22",
    expiryDate: "2023-03-22",
    profileImage: "",
    address: "456 Oak Ave, Somewhere, USA",
    borrowedBooks: [
      { id: "B003", title: "1984", dueDate: "2023-06-15" }
    ],
    borrowingHistory: [
      { id: "T003", bookId: "B004", title: "The Hobbit", borrowDate: "2022-10-15", returnDate: "2022-11-05" }
    ]
  },
  {
    id: "M003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "555-456-7890",
    membershipType: "Standard",
    status: "inactive",
    joinedDate: "2021-11-05",
    expiryDate: "2022-11-05",
    profileImage: "",
    address: "789 Pine St, Elsewhere, USA",
    borrowedBooks: [],
    borrowingHistory: [
      { id: "T004", bookId: "B001", title: "The Great Gatsby", borrowDate: "2022-08-20", returnDate: "2022-09-10" },
      { id: "T005", bookId: "B005", title: "Pride and Prejudice", borrowDate: "2022-07-15", returnDate: "2022-08-05" }
    ]
  },
  {
    id: "M004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-789-0123",
    membershipType: "Premium",
    status: "active",
    joinedDate: "2022-05-10",
    expiryDate: "2023-05-10",
    profileImage: "",
    address: "101 Cedar Rd, Nowhere, USA",
    borrowedBooks: [],
    borrowingHistory: []
  },
  {
    id: "M005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "555-321-6547",
    membershipType: "Standard",
    status: "expired",
    joinedDate: "2021-08-15",
    expiryDate: "2022-08-15",
    profileImage: "",
    address: "202 Maple Dr, Anystate, USA",
    borrowedBooks: [],
    borrowingHistory: [
      { id: "T006", bookId: "B002", title: "To Kill a Mockingbird", borrowDate: "2022-06-10", returnDate: "2022-07-01" },
      { id: "T007", bookId: "B004", title: "The Hobbit", borrowDate: "2022-05-05", returnDate: "2022-05-25" }
    ]
  }
];

// Calculate member statistics
const totalMembers = memberData.length;
const activeMembers = memberData.filter(m => m.status === "active").length;
const inactiveMembers = memberData.filter(m => m.status === "inactive").length;
const expiredMembers = memberData.filter(m => m.status === "expired").length;
const standardMembers = memberData.filter(m => m.membershipType === "Standard").length;
const premiumMembers = memberData.filter(m => m.membershipType === "Premium").length;
const borrowedBooksCount = memberData.reduce((acc, member) => acc + member.borrowedBooks.length, 0);

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [memberTypeFilter, setMemberTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const { toast } = useToast();

  // Filter members based on search query and filters
  const filteredMembers = memberData.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);
    
    const matchesStatus = 
      statusFilter === "all" || 
      member.status === statusFilter;
    
    const matchesType = 
      memberTypeFilter === "all" || 
      member.membershipType.toLowerCase() === memberTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === "joined") {
      return sortOrder === "asc" 
        ? new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
        : new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    } else if (sortBy === "expiry") {
      return sortOrder === "asc" 
        ? new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
        : new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime();
    }
    return 0;
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Member added successfully",
        description: "New member has been added to the system",
      });
      setIsLoading(false);
      setIsAddingMember(false);
    }, 1500);
  };

  const handleEditMember = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Member updated successfully",
        description: `${selectedMember.name}'s information has been updated`,
      });
      setIsLoading(false);
      setIsEditingMember(false);
    }, 1500);
  };

  const handleRenewMembership = (member: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Membership renewed",
        description: `${member.name}'s membership has been renewed for 1 year`,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleDeactivateMember = (member: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Member deactivated",
        description: `${member.name}'s account has been deactivated`,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleReactivateMember = (member: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Member reactivated",
        description: `${member.name}'s account has been reactivated`,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleDeleteMember = () => {
    if (!selectedMember) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Member deleted",
        description: `${selectedMember.name}'s account has been permanently deleted`,
        variant: "destructive",
      });
      setIsLoading(false);
      setSelectedMember(null);
    }, 1500);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <PageHeader
            title="Members Management"
            description="Manage library members and their memberships"
            action={{
              label: "Add Member",
              icon: <UserPlus className="h-4 w-4" />,
              onClick: () => setIsAddingMember(true)
            }}
          >
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: "Member list exported",
                  description: "The member list has been exported to CSV",
                });
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </PageHeader>
          
          {/* Member Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard 
              title="Total Members" 
              value={totalMembers.toString()} 
              icon={<Users className="h-5 w-5" />}
              iconClassName="bg-blue-100 text-blue-600"
            />
            <AnalyticsCard 
              title="Active Members" 
              value={activeMembers.toString()} 
              change={`${Math.round((activeMembers / totalMembers) * 100)}% of total`}
              changeType="positive"
              icon={<UserCheck className="h-5 w-5" />}
              iconClassName="bg-green-100 text-green-600"
            />
            <AnalyticsCard 
              title="Premium Members" 
              value={premiumMembers.toString()} 
              change={`${Math.round((premiumMembers / totalMembers) * 100)}% of total`}
              changeType="neutral"
              icon={<BadgeCheck className="h-5 w-5" />}
              iconClassName="bg-purple-100 text-purple-600"
            />
            <AnalyticsCard 
              title="Books Borrowed" 
              value={borrowedBooksCount.toString()} 
              icon={<BookOpen className="h-5 w-5" />}
              iconClassName="bg-orange-100 text-orange-600"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters and Members List */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle>Library Members</CardTitle>
                    <Search
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-[260px]"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-3 mb-4">
                    <div className="flex flex-1 items-center gap-2 flex-wrap">
                      <p className="text-sm text-muted-foreground whitespace-nowrap">Filters:</p>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="h-8 w-full md:w-[150px]">
                          <div className="flex items-center gap-2">
                            <Filter size={12} className="text-gray-400" />
                            <SelectValue placeholder="Member status" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={memberTypeFilter}
                        onValueChange={setMemberTypeFilter}
                      >
                        <SelectTrigger className="h-8 w-full md:w-[150px]">
                          <div className="flex items-center gap-2">
                            <BadgeCheck size={12} className="text-gray-400" />
                            <SelectValue placeholder="Membership type" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={sortBy}
                        onValueChange={setSortBy}
                      >
                        <SelectTrigger className="h-8 w-full md:w-[160px]">
                          <div className="flex items-center gap-2">
                            <ArrowUpDown size={12} className="text-gray-400" />
                            <SelectValue placeholder="Sort by" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Sort by Name</SelectItem>
                          <SelectItem value="joined">Sort by Join Date</SelectItem>
                          <SelectItem value="expiry">Sort by Expiry Date</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={toggleSortOrder}
                      >
                        {sortOrder === "asc" ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4 rotate-180" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      Showing {filteredMembers.length} of {memberData.length} members
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {sortedMembers.length > 0 ? (
                      sortedMembers.map((member) => (
                        <div
                          key={member.id}
                          className="border rounded-lg p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                          onClick={() => {
                            setSelectedMember(member);
                            setIsEditingMember(false);
                          }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 bg-primary/10">
                                <AvatarImage src={member.profileImage} alt={member.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{member.name}</h3>
                                  <Badge
                                    variant={
                                      member.status === "active" ? "success" :
                                      member.status === "inactive" ? "secondary" :
                                      "destructive"
                                    }
                                    className="h-5"
                                  >
                                    {member.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    <span>{member.email}</span>
                                  </div>
                                  <div className="hidden md:flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    <span>{member.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                              <div className="text-sm">
                                <div className="flex items-center gap-1">
                                  <BadgeCheck className="h-3 w-3 text-primary" />
                                  <span>{member.membershipType}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {new Date(member.expiryDate) < new Date() ? (
                                      <span className="text-red-500">Expired: {new Date(member.expiryDate).toLocaleDateString()}</span>
                                    ) : (
                                      <>Expires: {new Date(member.expiryDate).toLocaleDateString()}</>
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-background">
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  {member.borrowedBooks.length}
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedMember(member);
                                      setIsEditingMember(false);
                                    }}>
                                      <User className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedMember(member);
                                      setIsEditingMember(true);
                                    }}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Member
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => {
                                      e.stopPropagation();
                                      handleRenewMembership(member);
                                    }}>
                                      <RefreshCw className="h-4 w-4 mr-2" />
                                      Renew Membership
                                    </DropdownMenuItem>
                                    {member.status === "active" ? (
                                      <DropdownMenuItem onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeactivateMember(member);
                                      }}>
                                        <UserMinus className="h-4 w-4 mr-2" />
                                        Deactivate
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem onClick={(e) => {
                                        e.stopPropagation();
                                        handleReactivateMember(member);
                                      }}>
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Reactivate
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No members found matching your search criteria</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                            setMemberTypeFilter("all");
                          }}
                          className="mt-2"
                        >
                          Reset filters
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Total {memberData.length} members
                  </p>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export List
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Member Stats */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Membership Stats</CardTitle>
                  <CardDescription>Overview of membership distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Active Members</span>
                      </div>
                      <span className="text-sm font-medium">
                        {activeMembers}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ 
                          width: `${(activeMembers / totalMembers) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                        <span className="text-sm">Inactive Members</span>
                      </div>
                      <span className="text-sm font-medium">
                        {inactiveMembers}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-500 rounded-full"
                        style={{ 
                          width: `${(inactiveMembers / totalMembers) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Expired Members</span>
                      </div>
                      <span className="text-sm font-medium">
                        {expiredMembers}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ 
                          width: `${(expiredMembers / totalMembers) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm">Standard Membership</span>
                        </div>
                        <span className="text-sm font-medium">
                          {standardMembers}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ 
                            width: `${(standardMembers / totalMembers) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm">Premium Membership</span>
                        </div>
                        <span className="text-sm font-medium">
                          {premiumMembers}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ 
                            width: `${(premiumMembers / totalMembers) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest member activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4 text-green-500" />
                        <p className="text-sm font-medium">New Member Joined</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Emily Davis joined as Premium member
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-blue-500" />
                        <p className="text-sm font-medium">Membership Renewed</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        John Doe renewed Standard membership
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <UserMinus className="h-4 w-4 text-red-500" />
                        <p className="text-sm font-medium">Member Deactivated</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Robert Johnson's membership deactivated
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Member Details Dialog */}
          {selectedMember && (
            <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{isEditingMember ? "Edit Member" : "Member Details"}</DialogTitle>
                  <DialogDescription>
                    {isEditingMember 
                      ? "Edit member information and preferences" 
                      : "View and manage member information"
                    }
                  </DialogDescription>
                </DialogHeader>
                
                {isEditingMember ? (
                  <form onSubmit={handleEditMember} className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback className="bg-primary/10 text-primary text-xl">
                            {selectedMember.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={selectedMember.name} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={selectedMember.email} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={selectedMember.phone} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="membership-type">Membership Type</Label>
                        <Select defaultValue={selectedMember.membershipType.toLowerCase()}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue={selectedMember.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input 
                          id="expiry-date" 
                          type="date"
                          defaultValue={selectedMember.expiryDate}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea 
                        id="address" 
                        defaultValue={selectedMember.address}
                        rows={2}
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditingMember(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                ) : (
                  <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="info">Information</TabsTrigger>
                      <TabsTrigger value="books">Borrowed Books</TabsTrigger>
                      <TabsTrigger value="history">Borrowing History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="info" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-14 w-14">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {selectedMember.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-medium">{selectedMember.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={
                                    selectedMember.status === "active" ? "success" :
                                    selectedMember.status === "inactive" ? "secondary" :
                                    "destructive"
                                  }
                                >
                                  {selectedMember.status}
                                </Badge>
                                <Badge variant="outline">{selectedMember.membershipType}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <div className="w-32 text-sm font-medium">Member ID</div>
                              <div className="text-sm">{selectedMember.id}</div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-32 text-sm font-medium">Email</div>
                              <div className="text-sm text-primary underline">{selectedMember.email}</div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-32 text-sm font-medium">Phone</div>
                              <div className="text-sm">{selectedMember.phone}</div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-32 text-sm font-medium">Address</div>
                              <div className="text-sm">{selectedMember.address}</div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-32 text-sm font-medium">Joined Date</div>
                              <div className="text-sm">{new Date(selectedMember.joinedDate).toLocaleDateString()}</div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-32 text-sm font-medium">Expiry Date</div>
                              <div className={`text-sm ${
                                new Date(selectedMember.expiryDate) < new Date() ? "text-red-500 font-medium" : ""
                              }`}>
                                {new Date(selectedMember.expiryDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Membership Status</h4>
                            <div className="border rounded-lg p-4 bg-muted/50">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm">Type:</span>
                                <span className="text-sm font-medium">{selectedMember.membershipType}</span>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm">Status:</span>
                                <span className={`text-sm font-medium ${
                                  selectedMember.status === "active" ? "text-green-600" :
                                  selectedMember.status === "inactive" ? "text-gray-600" :
                                  "text-red-600"
                                }`}>
                                  {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Books Borrowed:</span>
                                <span className="text-sm font-medium">{selectedMember.borrowedBooks.length}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Actions</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <Button 
                                onClick={() => handleRenewMembership(selectedMember)}
                                disabled={isLoading}
                                className="flex-1"
                              >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Renew Membership
                              </Button>
                              <Button 
                                onClick={() => setIsEditingMember(true)}
                                className="flex-1"
                                variant="outline"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Member
                              </Button>
                              
                              {selectedMember.status === "active" ? (
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleDeactivateMember(selectedMember)}
                                  className="flex-1"
                                  disabled={isLoading}
                                >
                                  <UserMinus className="h-4 w-4 mr-2" />
                                  Deactivate Member
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleReactivateMember(selectedMember)}
                                  className="flex-1"
                                  disabled={isLoading}
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Reactivate Member
                                </Button>
                              )}
                              <Button 
                                variant="destructive" 
                                onClick={handleDeleteMember}
                                className="flex-1"
                                disabled={isLoading}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Member
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="books" className="space-y-4 pt-4">
                      {selectedMember.borrowedBooks.length > 0 ? (
                        <div className="space-y-4">
                          {selectedMember.borrowedBooks.map((book: any) => (
                            <div key={book.id} className="border rounded-lg p-4 flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <BookOpen className="h-6 w-6 text-primary" />
                                <div>
                                  <h3 className="font-medium">{book.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Due: {new Date(book.dueDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Return</Button>
                                <Button variant="outline" size="sm">Renew</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No books currently borrowed</p>
                          <Button className="mt-4" variant="outline" size="sm">
                            Issue a Book
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="history" className="space-y-4 pt-4">
                      {selectedMember.borrowingHistory.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Borrowing History</h4>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export History
                            </Button>
                          </div>
                          {selectedMember.borrowingHistory.map((item: any) => (
                            <div key={item.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{item.title}</h3>
                                <Badge variant="outline">{item.id}</Badge>
                              </div>
                              <div className="grid grid-cols-2 text-sm gap-2">
                                <div>
                                  <p className="text-muted-foreground">Borrowed:</p>
                                  <p>{new Date(item.borrowDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Returned:</p>
                                  <p>{new Date(item.returnDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <History className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No borrowing history available</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </DialogContent>
            </Dialog>
          )}
          
          {/* Add Member Dialog */}
          <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>
                  Enter the details to add a new library member
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <UserCircle className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter first name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter last name" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Enter address"
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="membershipType">Membership Type</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="membershipType">
                        <SelectValue placeholder="Select membership type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input 
                      id="expiry-date" 
                      type="date"
                      defaultValue={new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsAddingMember(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Members;
