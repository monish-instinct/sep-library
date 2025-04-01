
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { PageHeader } from "@/components/PageHeader";
import { Search } from "@/components/Search";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  BookCheck,
  BookOpen,
  BookX,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Filter,
  Loader2,
  RotateCcw,
  Search as SearchIcon,
  User,
  Users
} from "lucide-react";

// Sample book and member data
const books = [
  {
    id: "B001",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "available",
    isbn: "9780743273565",
    genre: "Classic Fiction",
    shelf: "A-12",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: "B002",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "borrowed",
    isbn: "9780061120084",
    genre: "Classic Fiction",
    shelf: "A-14",
    coverImage: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
    borrower: {
      id: "M001",
      name: "John Doe",
      dueDate: "2023-05-30"
    }
  },
  {
    id: "B003",
    title: "1984",
    author: "George Orwell",
    status: "borrowed",
    isbn: "9780451524935",
    genre: "Dystopian Fiction",
    shelf: "B-23",
    coverImage: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    borrower: {
      id: "M002",
      name: "Jane Smith",
      dueDate: "2023-06-15"
    }
  },
  {
    id: "B004",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    status: "available",
    isbn: "9780547928227",
    genre: "Fantasy",
    shelf: "C-05",
    coverImage: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: "B005",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    status: "available",
    isbn: "9780141439518",
    genre: "Classic Fiction",
    shelf: "A-18",
    coverImage: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg"
  }
];

const members = [
  {
    id: "M001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    membershipType: "Standard",
    status: "active",
    joinedDate: "2022-01-15",
    borrowedBooks: 1
  },
  {
    id: "M002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    membershipType: "Premium",
    status: "active",
    joinedDate: "2022-03-22",
    borrowedBooks: 1
  },
  {
    id: "M003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "555-456-7890",
    membershipType: "Standard",
    status: "inactive",
    joinedDate: "2021-11-05",
    borrowedBooks: 0
  },
  {
    id: "M004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-789-0123",
    membershipType: "Premium",
    status: "active",
    joinedDate: "2022-05-10",
    borrowedBooks: 0
  }
];

// Recent transactions
const transactions = [
  {
    id: "T001",
    type: "borrow",
    bookId: "B002",
    bookTitle: "To Kill a Mockingbird",
    memberId: "M001",
    memberName: "John Doe",
    date: "2023-05-02",
    dueDate: "2023-05-30"
  },
  {
    id: "T002",
    type: "borrow",
    bookId: "B003",
    bookTitle: "1984",
    memberId: "M002",
    memberName: "Jane Smith",
    date: "2023-05-15",
    dueDate: "2023-06-15"
  },
  {
    id: "T003",
    type: "return",
    bookId: "B001",
    bookTitle: "The Great Gatsby",
    memberId: "M003",
    memberName: "Robert Johnson",
    date: "2023-05-18",
    condition: "Good"
  }
];

const IssueReturn = () => {
  const [activeTab, setActiveTab] = useState("issue");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [dueDate, setDueDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  // Filter books based on search and status
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    
    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "available" && book.status === "available") ||
      (statusFilter === "borrowed" && book.status === "borrowed");
    
    return matchesSearch && matchesStatus;
  });

  // Filter members based on search
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIssueBook = () => {
    if (!selectedBook || !selectedMember || !dueDate) {
      toast({
        title: "Missing information",
        description: "Please select a book, member, and due date",
        variant: "destructive"
      });
      return;
    }

    if (selectedBook.status !== "available") {
      toast({
        title: "Book unavailable",
        description: "This book is already borrowed by someone else",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Book issued successfully",
        description: `${selectedBook.title} has been issued to ${selectedMember.name} until ${new Date(dueDate).toLocaleDateString()}`,
      });
      
      // Update the book status in our local data
      const updatedBooks = books.map(book => {
        if (book.id === selectedBook.id) {
          return {
            ...book,
            status: "borrowed",
            borrower: {
              id: selectedMember.id,
              name: selectedMember.name,
              dueDate: dueDate
            }
          };
        }
        return book;
      });
      
      // Reset form
      setSelectedBook(null);
      setSelectedMember(null);
      setDueDate("");
      setIsProcessing(false);
    }, 1500);
  };

  const handleReturnBook = (book: any) => {
    if (!book) {
      toast({
        title: "No book selected",
        description: "Please select a book to return",
        variant: "destructive"
      });
      return;
    }

    if (book.status !== "borrowed") {
      toast({
        title: "Invalid operation",
        description: "This book is not currently borrowed",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Book returned successfully",
        description: `${book.title} has been returned to the library`,
      });
      
      // Update the book status in our local data
      const updatedBooks = books.map(b => {
        if (b.id === book.id) {
          return {
            ...b,
            status: "available",
            borrower: null
          };
        }
        return b;
      });
      
      setIsProcessing(false);
      setSelectedBook(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <PageHeader
            title="Issue & Return Books"
            description="Manage book circulation for library members"
          />
          
          <Tabs defaultValue="issue" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
              <TabsTrigger value="issue">Issue Books</TabsTrigger>
              <TabsTrigger value="return">Return Books</TabsTrigger>
            </TabsList>
            
            <TabsContent value="issue">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid gap-6">
                  {/* Book Selection Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Select Book
                      </CardTitle>
                      <CardDescription>
                        Choose an available book to issue to a member
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <Search
                          placeholder="Search books by title, author, or ID..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                        <Select
                          value={statusFilter}
                          onValueChange={setStatusFilter}
                        >
                          <SelectTrigger className="w-full md:w-[180px]">
                            <div className="flex items-center gap-2">
                              <Filter className="h-4 w-4" />
                              <SelectValue placeholder="Filter by status" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Books</SelectItem>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="borrowed">Borrowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {filteredBooks.length > 0 ? (
                          filteredBooks.map((book) => (
                            <div
                              key={book.id}
                              className={`border rounded-lg p-4 flex gap-4 cursor-pointer transition-colors ${
                                selectedBook?.id === book.id
                                  ? "bg-primary/5 border-primary"
                                  : "hover:bg-muted/50"
                              } ${
                                book.status !== "available" ? "opacity-60" : ""
                              }`}
                              onClick={() => book.status === "available" && setSelectedBook(book)}
                            >
                              <div className="h-24 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                {book.coverImage ? (
                                  <img 
                                    src={book.coverImage} 
                                    alt={book.title} 
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center bg-gray-200">
                                    <BookOpen className="h-8 w-8 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h3 className="font-medium text-sm leading-tight">{book.title}</h3>
                                  <Badge variant={book.status === "available" ? "success" : "secondary"} className="ml-2">
                                    {book.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{book.author}</p>
                                <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                                  <span>ID: {book.id}</span>
                                  <span>•</span>
                                  <span>Shelf: {book.shelf}</span>
                                </div>
                                {book.status === "borrowed" && book.borrower && (
                                  <div className="mt-1 text-xs flex items-center gap-1 text-amber-600">
                                    <User className="h-3 w-3" />
                                    <span>{book.borrower.name}</span>
                                    <span>•</span>
                                    <span>Due: {new Date(book.borrower.dueDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-8">
                            <p className="text-muted-foreground">No books found matching your search criteria</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Member Selection Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Select Member
                      </CardTitle>
                      <CardDescription>
                        Choose a member to issue the book to
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Search
                        placeholder="Search members by name, email, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full mb-4"
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {filteredMembers.length > 0 ? (
                          filteredMembers.map((member) => (
                            <div
                              key={member.id}
                              className={`border rounded-lg p-4 flex gap-3 cursor-pointer transition-colors ${
                                selectedMember?.id === member.id
                                  ? "bg-primary/5 border-primary"
                                  : "hover:bg-muted/50"
                              } ${
                                member.status !== "active" ? "opacity-60" : ""
                              }`}
                              onClick={() => member.status === "active" && setSelectedMember(member)}
                            >
                              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h3 className="font-medium">{member.name}</h3>
                                  <Badge variant={member.status === "active" ? "success" : "secondary"} className="ml-2">
                                    {member.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                                <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                                  <span>ID: {member.id}</span>
                                  <span>•</span>
                                  <span>Type: {member.membershipType}</span>
                                  <span>•</span>
                                  <span>Books: {member.borrowedBooks}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-8">
                            <p className="text-muted-foreground">No members found matching your search criteria</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Issue Summary & Confirm Section */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Issue Summary
                      </CardTitle>
                      <CardDescription>
                        Review and confirm book issuance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Selected Book Preview */}
                      <div>
                        <Label>Selected Book</Label>
                        {selectedBook ? (
                          <div className="mt-2 p-3 border rounded-lg flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{selectedBook.title}</p>
                              <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 p-3 border rounded-lg bg-muted/50 text-center text-muted-foreground">
                            <p>No book selected</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Selected Member Preview */}
                      <div>
                        <Label>Selected Member</Label>
                        {selectedMember ? (
                          <div className="mt-2 p-3 border rounded-lg flex items-center gap-3">
                            <User className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{selectedMember.name}</p>
                              <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 p-3 border rounded-lg bg-muted/50 text-center text-muted-foreground">
                            <p>No member selected</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Due Date Selection */}
                      <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <div className="relative mt-2">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="dueDate"
                            type="date"
                            className="pl-10"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        disabled={!selectedBook || !selectedMember || !dueDate || isProcessing}
                        className="w-full"
                        onClick={handleIssueBook}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <BookCheck className="mr-2 h-4 w-4" />
                            Issue Book
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Recent Transactions */}
                  <Card className="mt-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {transactions.map((transaction) => (
                          <div 
                            key={transaction.id}
                            className="text-xs p-2 border rounded flex items-center gap-2"
                          >
                            {transaction.type === "borrow" ? (
                              <BookCheck className="h-3 w-3 text-blue-500" />
                            ) : (
                              <RotateCcw className="h-3 w-3 text-green-500" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium">
                                {transaction.type === "borrow" ? "Borrowed:" : "Returned:"} {transaction.bookTitle}
                              </p>
                              <div className="flex justify-between text-muted-foreground">
                                <span>{transaction.memberName}</span>
                                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="return">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookX className="h-5 w-5" />
                        Return Book
                      </CardTitle>
                      <CardDescription>
                        Process book returns by searching for borrowed books
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Search
                        placeholder="Search by book title, ID, or borrower name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full mb-4"
                      />
                      
                      <div className="space-y-4">
                        {books.filter(book => book.status === "borrowed").map((book) => (
                          <div
                            key={book.id}
                            className={`border rounded-lg p-4 flex gap-4 cursor-pointer transition-colors ${
                              selectedBook?.id === book.id
                                ? "bg-primary/5 border-primary"
                                : "hover:bg-muted/50"
                            }`}
                            onClick={() => setSelectedBook(book)}
                          >
                            <div className="h-24 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                              {book.coverImage ? (
                                <img 
                                  src={book.coverImage} 
                                  alt={book.title} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                                  <BookOpen className="h-8 w-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h3 className="font-medium">{book.title}</h3>
                                <Badge variant="secondary" className="ml-2">
                                  Borrowed
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{book.author}</p>
                              <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                                <span>ID: {book.id}</span>
                                <span>•</span>
                                <span>Shelf: {book.shelf}</span>
                              </div>
                              {book.borrower && (
                                <div className="mt-1 text-sm flex flex-col gap-1">
                                  <div className="flex items-center gap-1 text-primary">
                                    <User className="h-3 w-3" />
                                    <span>{book.borrower.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-amber-600">
                                    <Calendar className="h-3 w-3" />
                                    <span>Due: {new Date(book.borrower.dueDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {books.filter(book => book.status === "borrowed").length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No books are currently borrowed</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Return Confirmation
                      </CardTitle>
                      <CardDescription>
                        Review and confirm book return
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Selected Book Preview */}
                      <div>
                        <Label>Selected Book</Label>
                        {selectedBook ? (
                          <div className="mt-2 p-3 border rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                              <BookOpen className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{selectedBook.title}</p>
                                <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
                              </div>
                            </div>
                            
                            {selectedBook.borrower && (
                              <div className="mt-2 pt-2 border-t text-sm">
                                <div className="flex justify-between mb-1">
                                  <span className="text-muted-foreground">Borrowed by:</span>
                                  <span className="font-medium">{selectedBook.borrower.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Due date:</span>
                                  <span className={`font-medium ${
                                    new Date(selectedBook.borrower.dueDate) < new Date() 
                                      ? "text-red-500" 
                                      : ""
                                  }`}>
                                    {new Date(selectedBook.borrower.dueDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-2 p-3 border rounded-lg bg-muted/50 text-center text-muted-foreground">
                            <p>No book selected</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Book Condition */}
                      <div>
                        <Label htmlFor="condition">Book Condition</Label>
                        <Select defaultValue="good">
                          <SelectTrigger id="condition">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                            <SelectItem value="damaged">Damaged</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Notes */}
                      <div>
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Input 
                          id="notes" 
                          placeholder="Add any notes about the returned book"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        disabled={!selectedBook || isProcessing}
                        className="w-full"
                        onClick={() => handleReturnBook(selectedBook)}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Confirm Return
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Quick Help */}
                  <Card className="mt-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Quick Help</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>• Select a book from the list to begin the return process</p>
                      <p>• Verify the borrower details before confirming</p>
                      <p>• Check the book's condition and add any notes if needed</p>
                      <p>• Late returns may incur fines based on library policy</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default IssueReturn;
