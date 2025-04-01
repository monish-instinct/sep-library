
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { PageHeader } from "@/components/PageHeader";
import { Search } from "@/components/Search";
import BookCard, { BookData } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/ui/pagination";
import AnalyticsCard from "@/components/AnalyticsCard";
import { useToast } from "@/hooks/use-toast";
import {
  Search as SearchIcon,
  Filter,
  Plus,
  BookOpen,
  BookX,
  BookUp,
  Upload,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

// Sample data - in a real app this would come from an API
const allBooks: BookData[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://m.media-amazon.com/images/I/81tCtHFtOgL._AC_UF1000,1000_QL80_.jpg",
    genre: "Fiction",
    status: "available",
    rating: 4.5,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",
    genre: "Self-Help",
    status: "borrowed",
    rating: 5,
  },
  {
    id: "3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://m.media-amazon.com/images/I/91vS2L5YsOL._AC_UF1000,1000_QL80_.jpg",
    genre: "Sci-Fi",
    status: "available",
    rating: 4,
  },
  {
    id: "4",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    cover: "https://m.media-amazon.com/images/I/71Nv7aR8iBL._AC_UF1000,1000_QL80_.jpg",
    genre: "Fantasy",
    status: "reserved",
    rating: 4.5,
  },
  {
    id: "5",
    title: "Educated",
    author: "Tara Westover",
    cover: "https://m.media-amazon.com/images/I/71yNgTMEcpL._AC_UF1000,1000_QL80_.jpg",
    genre: "Memoir",
    status: "available",
    rating: 4.5,
  },
  {
    id: "6",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "https://m.media-amazon.com/images/I/81JJPDNlxSL._AC_UF1000,1000_QL80_.jpg",
    genre: "Thriller",
    status: "borrowed",
    rating: 4,
  },
  {
    id: "7",
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://m.media-amazon.com/images/I/91Fq9Amx0pL._AC_UF1000,1000_QL80_.jpg",
    genre: "Sci-Fi",
    status: "available",
    rating: 5,
  },
  {
    id: "8",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg",
    genre: "Classic",
    status: "available",
    rating: 4.5,
  },
  {
    id: "9",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
    genre: "Classic",
    status: "borrowed",
    rating: 5,
  },
  {
    id: "10",
    title: "1984",
    author: "George Orwell",
    cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    genre: "Dystopian",
    status: "available",
    rating: 4.5,
  },
  {
    id: "11",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
    genre: "Fantasy",
    status: "available",
    rating: 5,
  },
  {
    id: "12",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
    genre: "Romance",
    status: "available",
    rating: 4.5,
  },
];

// Stats calculation
const totalBooks = allBooks.length;
const availableBooks = allBooks.filter(book => book.status === "available").length;
const borrowedBooks = allBooks.filter(book => book.status === "borrowed").length;
const reservedBooks = allBooks.filter(book => book.status === "reserved").length;

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditingBook, setIsEditingBook] = useState(false);
  const { toast } = useToast();

  const booksPerPage = 12;

  // Filter books based on search query, genre, and status
  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    const matchesStatus = selectedStatus ? book.status === selectedStatus : true;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  // Paginate the filtered books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Get unique genres for filter dropdown
  const uniqueGenres = Array.from(new Set(allBooks.map((book) => book.genre)));

  const handleBookClick = (book: BookData) => {
    setSelectedBook(book);
    setIsBookDialogOpen(true);
    setIsEditingBook(false);
  };

  const handleBorrowBook = () => {
    if (!selectedBook) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Book borrowed successfully",
        description: `"${selectedBook.title}" has been borrowed.`,
      });
      setIsLoading(false);
      setIsBookDialogOpen(false);
    }, 1000);
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Book added successfully",
        description: "The new book has been added to your collection.",
      });
      setIsLoading(false);
      setIsAddingBook(false);
    }, 1500);
  };

  const handleEditBook = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Book updated successfully",
        description: "The book details have been updated.",
      });
      setIsLoading(false);
      setIsEditingBook(false);
    }, 1000);
  };

  const handleDeleteBook = () => {
    if (!selectedBook) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Book deleted successfully",
        description: `"${selectedBook.title}" has been removed from your collection.`,
      });
      setIsLoading(false);
      setIsBookDialogOpen(false);
    }, 1000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just prevent the form submission and rely on the onChange handler
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <div className="flex flex-col gap-6">
            <PageHeader
              title="Book Catalogue"
              description="Browse and manage your library collection"
              action={{
                label: "Add New Book",
                icon: <Plus size={16} />,
                onClick: () => setIsAddingBook(true)
              }}
            />
            
            {/* Book Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnalyticsCard 
                title="Total Books" 
                value={totalBooks.toString()} 
                icon={<BookOpen className="h-5 w-5" />}
                iconClassName="bg-blue-100 text-blue-600"
              />
              <AnalyticsCard 
                title="Available Books" 
                value={availableBooks.toString()} 
                change={`${Math.round((availableBooks / totalBooks) * 100)}% of collection`}
                changeType="positive"
                icon={<CheckCircle2 className="h-5 w-5" />}
                iconClassName="bg-green-100 text-green-600"
              />
              <AnalyticsCard 
                title="Borrowed Books" 
                value={borrowedBooks.toString()} 
                change={`${Math.round((borrowedBooks / totalBooks) * 100)}% of collection`}
                changeType="neutral"
                icon={<BookUp className="h-5 w-5" />}
                iconClassName="bg-orange-100 text-orange-600"
              />
              <AnalyticsCard 
                title="Reserved Books" 
                value={reservedBooks.toString()} 
                change={`${Math.round((reservedBooks / totalBooks) * 100)}% of collection`}
                changeType="neutral"
                icon={<Clock className="h-5 w-5" />}
                iconClassName="bg-purple-100 text-purple-600"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
              <Search 
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSubmit={handleSearchSubmit}
              />
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="min-w-[150px]">
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-gray-400" />
                    <SelectValue placeholder="Genre" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Genres</SelectItem>
                  {uniqueGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="min-w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="borrowed">Borrowed</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full max-w-[200px] grid-cols-2 mb-4">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="grid" className="space-y-4">
                {filteredBooks.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {currentBooks.map((book) => (
                        <BookCard 
                          key={book.id} 
                          book={book}
                          onClick={() => handleBookClick(book)} 
                        />
                      ))}
                    </div>
                    
                    {/* Pagination Controls */}
                    {filteredBooks.length > booksPerPage && (
                      <div className="flex justify-center mt-6">
                        <Pagination>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={prevPage}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const pageNumber = i + 1;
                                return (
                                  <Button
                                    key={i}
                                    variant={currentPage === pageNumber ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setCurrentPage(pageNumber)}
                                  >
                                    {pageNumber}
                                  </Button>
                                );
                              })}
                              {totalPages > 5 && (
                                <span className="px-2">...</span>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={nextPage}
                              disabled={currentPage === totalPages}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </Pagination>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <BookX className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg font-medium">No books match your search criteria</p>
                    <p className="text-gray-400 mt-1 mb-4">Try adjusting your search parameters</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedGenre("");
                        setSelectedStatus("");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="list">
                {filteredBooks.length > 0 ? (
                  <>
                    <div className="rounded-md border overflow-hidden">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="bg-gray-50 [&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Cover
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Title
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Author
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Genre
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Status
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Rating
                              </th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            {currentBooks.map((book) => (
                              <tr 
                                key={book.id} 
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                                onClick={() => handleBookClick(book)}
                              >
                                <td className="p-4 align-middle">
                                  <img 
                                    src={book.cover} 
                                    alt={book.title} 
                                    className="h-12 w-8 object-cover rounded"
                                  />
                                </td>
                                <td className="p-4 align-middle font-medium">{book.title}</td>
                                <td className="p-4 align-middle">{book.author}</td>
                                <td className="p-4 align-middle">{book.genre}</td>
                                <td className="p-4 align-middle">
                                  <span 
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      book.status === 'available' 
                                        ? 'bg-green-100 text-green-800' 
                                        : book.status === 'borrowed'
                                          ? 'bg-orange-100 text-orange-800'
                                          : 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                                  </span>
                                </td>
                                <td className="p-4 align-middle">{book.rating}/5</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Pagination Controls */}
                    {filteredBooks.length > booksPerPage && (
                      <div className="flex justify-center mt-6">
                        <Pagination>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={prevPage}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const pageNumber = i + 1;
                                return (
                                  <Button
                                    key={i}
                                    variant={currentPage === pageNumber ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setCurrentPage(pageNumber)}
                                  >
                                    {pageNumber}
                                  </Button>
                                );
                              })}
                              {totalPages > 5 && (
                                <span className="px-2">...</span>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={nextPage}
                              disabled={currentPage === totalPages}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </Pagination>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <BookX className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg font-medium">No books match your search criteria</p>
                    <p className="text-gray-400 mt-1 mb-4">Try adjusting your search parameters</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedGenre("");
                        setSelectedStatus("");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      {/* Book Detail Dialog */}
      <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
        <DialogContent className="sm:max-w-[525px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{isEditingBook ? "Edit Book" : "Book Details"}</span>
              {!isEditingBook && selectedBook?.status === "available" && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Available
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              {isEditingBook ? "Edit book information" : "View information and manage this book"}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            {selectedBook && (
              <div className="py-4">
                {isEditingBook ? (
                  <form className="space-y-4">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img
                          src={selectedBook.cover}
                          alt={selectedBook.title}
                          className="h-40 object-contain rounded-md"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute bottom-2 right-2 h-8 bg-white"
                        >
                          <Upload className="h-4 w-4 mr-1" /> Change
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" defaultValue={selectedBook.title} />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" defaultValue={selectedBook.author} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="genre">Genre</Label>
                          <Select defaultValue={selectedBook.genre}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueGenres.map(genre => (
                                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                              ))}
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="status">Status</Label>
                          <Select defaultValue={selectedBook.status}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="borrowed">Borrowed</SelectItem>
                              <SelectItem value="reserved">Reserved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input id="isbn" defaultValue="978-3-16-148410-0" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea 
                          id="description" 
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        ></textarea>
                      </div>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center">
                        <img
                          src={selectedBook.cover}
                          alt={selectedBook.title}
                          className="h-52 object-contain rounded-md mb-4"
                        />
                        {selectedBook.status !== 'available' && (
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              selectedBook.status === 'borrowed'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {selectedBook.status.charAt(0).toUpperCase() + selectedBook.status.slice(1)}
                          </span>
                        )}
                      </div>
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="font-semibold text-lg">{selectedBook.title}</h3>
                          <p className="text-gray-500 text-sm">by {selectedBook.author}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Genre</p>
                            <p className="font-medium">{selectedBook.genre}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Rating</p>
                            <p className="font-medium">{selectedBook.rating}/5</p>
                          </div>
                          <div>
                            <p className="text-gray-500">ISBN</p>
                            <p className="font-medium">978-3-16-148410-0</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Publisher</p>
                            <p className="font-medium">Penguin Books</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <p className="text-gray-500 text-sm">Description</p>
                          <p className="text-sm mt-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium mb-2">Book Details</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Pages</p>
                          <p className="font-medium">342</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Language</p>
                          <p className="font-medium">English</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Publication Date</p>
                          <p className="font-medium">2020-09-29</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Edition</p>
                          <p className="font-medium">First Edition</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Shelf Location</p>
                          <p className="font-medium">F-32</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Dewey Decimal</p>
                          <p className="font-medium">823.92</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </ScrollArea>
          <DialogFooter className="gap-2 sm:gap-0">
            {isEditingBook ? (
              <>
                <Button variant="outline" onClick={() => setIsEditingBook(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button onClick={handleEditBook} disabled={isLoading}>
                  {isLoading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="flex gap-2 sm:flex-row flex-wrap">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsBookDialogOpen(false)}
                    className="flex-1 sm:flex-none"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditingBook(true)}
                    className="flex-1 sm:flex-none"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteBook}
                    className="flex-1 sm:flex-none"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <Button 
                  onClick={handleBorrowBook}
                  disabled={selectedBook?.status !== 'available' || isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" />
                      {selectedBook?.status === 'available' ? 'Borrow Book' : 'Not Available'}
                    </>
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Book Dialog */}
      <Dialog open={isAddingBook} onOpenChange={setIsAddingBook}>
        <DialogContent className="sm:max-w-[525px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new book to your collection
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBook}>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="py-4 space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="h-40 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-gray-400 transition-colors">
                    <Upload className="h-6 w-6 mb-2" />
                    <p className="text-xs text-center">
                      Click to upload<br />book cover
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="new-title">Title</Label>
                    <Input id="new-title" placeholder="Enter book title" required />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="new-author">Author</Label>
                    <Input id="new-author" placeholder="Enter author name" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="new-genre">Genre</Label>
                      <Select defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueGenres.map(genre => (
                            <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                          ))}
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="new-status">Status</Label>
                      <Select defaultValue="available">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="borrowed">Borrowed</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="new-isbn">ISBN</Label>
                    <Input id="new-isbn" placeholder="Enter ISBN" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="new-publisher">Publisher</Label>
                      <Input id="new-publisher" placeholder="Enter publisher" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="new-publication-date">Publication Date</Label>
                      <Input id="new-publication-date" type="date" />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="new-description">Description</Label>
                    <textarea 
                      id="new-description" 
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter book description"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="new-pages">Pages</Label>
                      <Input id="new-pages" type="number" placeholder="Number of pages" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="new-language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={() => setIsAddingBook(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>Adding Book...</>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Book
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Books;
