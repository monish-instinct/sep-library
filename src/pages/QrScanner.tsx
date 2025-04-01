
import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Scan, 
  Camera, 
  BookOpenCheck, 
  FileText, 
  AlertTriangle, 
  Check, 
  X,
  BookOpen,
  User,
  Clock,
  Loader2,
  SearchIcon
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const QrScanner = () => {
  const [activeTab, setActiveTab] = useState("scan");
  const [isScanning, setIsScanning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [scannedItem, setScannedItem] = useState<any>(null);
  const [lastScanned, setLastScanned] = useState<any[]>([]);
  const { toast } = useToast();

  // Simulate scanning process
  const startScanning = () => {
    setIsScanning(true);
    setScannedItem(null);
    
    // Simulate a scan after 2 seconds
    setTimeout(() => {
      const demoItems = [
        {
          type: "book",
          id: "B" + Math.floor(Math.random() * 1000),
          title: "The Midnight Library",
          author: "Matt Haig",
          status: "available"
        },
        {
          type: "book",
          id: "B" + Math.floor(Math.random() * 1000),
          title: "Atomic Habits",
          author: "James Clear",
          status: "borrowed"
        },
        {
          type: "member",
          id: "M" + Math.floor(Math.random() * 1000),
          name: "John Doe",
          email: "john.doe@example.com",
          status: "active"
        }
      ];
      
      const result = demoItems[Math.floor(Math.random() * demoItems.length)];
      setScannedItem(result);
      setLastScanned([result, ...lastScanned.slice(0, 4)]);
      setIsScanning(false);
      
      toast({
        title: `${result.type === "book" ? "Book" : "Member"} Scanned`,
        description: result.type === "book" ? result.title : result.name,
      });
    }, 2000);
  };
  
  const stopScanning = () => {
    setIsScanning(false);
  };
  
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!manualInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid code",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate processing the manual input
    setIsScanning(true);
    setTimeout(() => {
      const result = {
        type: "book",
        id: manualInput,
        title: "Project Hail Mary",
        author: "Andy Weir",
        status: "available"
      };
      
      setScannedItem(result);
      setLastScanned([result, ...lastScanned.slice(0, 4)]);
      setIsScanning(false);
      setManualInput("");
      
      toast({
        title: "Book Found",
        description: result.title,
      });
    }, 1000);
  };
  
  const handleBookAction = (action: string) => {
    if (!scannedItem) return;
    
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      
      if (action === "borrow") {
        toast({
          title: "Book Borrowed",
          description: `"${scannedItem.title}" has been checked out successfully.`,
        });
        
        const updatedItem = { ...scannedItem, status: "borrowed" };
        setScannedItem(updatedItem);
        
        // Update the last scanned array
        setLastScanned([
          updatedItem,
          ...lastScanned.filter(item => item.id !== scannedItem.id).slice(0, 4)
        ]);
      } else if (action === "return") {
        toast({
          title: "Book Returned",
          description: `"${scannedItem.title}" has been returned successfully.`,
        });
        
        const updatedItem = { ...scannedItem, status: "available" };
        setScannedItem(updatedItem);
        
        // Update the last scanned array
        setLastScanned([
          updatedItem,
          ...lastScanned.filter(item => item.id !== scannedItem.id).slice(0, 4)
        ]);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <PageHeader
            title="QR Scanner"
            description="Scan book and member QR codes for quick checkout and returns"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs 
                defaultValue="scan" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                </TabsList>
                
                <TabsContent value="scan" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        QR Code Scanner
                      </CardTitle>
                      <CardDescription>
                        Position the QR code within the frame to scan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative aspect-video max-w-md mx-auto bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        {isScanning ? (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-48 h-48 border-2 border-white/50 rounded-lg"></div>
                              <div className="absolute w-48 h-0.5 bg-white/70 animate-scan"></div>
                            </div>
                            <p className="text-white z-10">Scanning...</p>
                          </>
                        ) : (
                          <div className="text-center text-white">
                            <Camera className="h-12 w-12 mx-auto mb-2 text-white/70" />
                            <p>Camera preview will appear here</p>
                            <p className="text-sm text-white/70 mt-2">Press "Start Scanning" to begin</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center space-x-4">
                      {isScanning ? (
                        <Button 
                          variant="outline" 
                          onClick={stopScanning}
                          className="w-full md:w-auto"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel Scan
                        </Button>
                      ) : (
                        <Button 
                          onClick={startScanning}
                          className="w-full md:w-auto"
                        >
                          <Scan className="mr-2 h-4 w-4" />
                          Start Scanning
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="manual" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Manual Code Entry
                      </CardTitle>
                      <CardDescription>
                        Enter the book ID or member ID manually
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleManualSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="code">Book/Member ID</Label>
                          <Input
                            id="code"
                            placeholder="Enter ID (e.g., B1234 or M5678)"
                            value={manualInput}
                            onChange={(e) => setManualInput(e.target.value)}
                            disabled={isScanning}
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isScanning || !manualInput.trim()}
                        >
                          {isScanning ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <SearchIcon className="mr-2 h-4 w-4" />
                              Look Up
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              {scannedItem && (
                <Card className="mt-6 border-2 border-primary animate-pulse-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      {scannedItem.type === "book" ? (
                        <BookOpen className="h-5 w-5 text-primary" />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                      {scannedItem.type === "book" ? "Book Details" : "Member Details"}
                    </CardTitle>
                    <CardDescription>
                      {scannedItem.type === "book" 
                        ? "Book information from the scan" 
                        : "Member information from the scan"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {scannedItem.type === "book" ? "Title" : "Name"}
                          </p>
                          <p className="text-lg font-semibold">
                            {scannedItem.type === "book" ? scannedItem.title : scannedItem.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {scannedItem.type === "book" ? "Author" : "Email"}
                          </p>
                          <p>
                            {scannedItem.type === "book" ? scannedItem.author : scannedItem.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">ID</p>
                          <p>{scannedItem.id}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Status</p>
                          <div>
                            <Badge 
                              variant={
                                scannedItem.status === "available" || scannedItem.status === "active"
                                  ? "success"
                                  : scannedItem.status === "borrowed"
                                  ? "info"
                                  : "warning"
                              }
                              className="mt-1"
                            >
                              {scannedItem.status.charAt(0).toUpperCase() + scannedItem.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        
                        {scannedItem.type === "book" && (
                          <div className="pt-4">
                            {scannedItem.status === "available" ? (
                              <Button 
                                onClick={() => handleBookAction("borrow")}
                                disabled={isScanning}
                                className="w-full"
                              >
                                <BookOpenCheck className="mr-2 h-4 w-4" />
                                Borrow Book
                              </Button>
                            ) : scannedItem.status === "borrowed" ? (
                              <Button 
                                onClick={() => handleBookAction("return")}
                                disabled={isScanning}
                                className="w-full"
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Return Book
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                disabled
                                className="w-full"
                              >
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Not Available
                              </Button>
                            )}
                          </div>
                        )}
                        
                        {scannedItem.type === "member" && (
                          <div className="pt-4">
                            <Button 
                              onClick={() => {
                                toast({
                                  title: "Member Profile",
                                  description: "Navigating to member profile...",
                                });
                              }}
                              disabled={isScanning}
                              className="w-full"
                            >
                              <User className="mr-2 h-4 w-4" />
                              View Member Profile
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Scans
                  </CardTitle>
                  <CardDescription>
                    History of recently scanned items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lastScanned.length > 0 ? (
                      lastScanned.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setScannedItem(item)}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mr-3">
                            {item.type === "book" ? (
                              <BookOpen className="h-5 w-5 text-primary" />
                            ) : (
                              <User className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                {item.type === "book" ? item.title : item.name}
                              </p>
                              <Badge 
                                variant={
                                  item.status === "available" || item.status === "active"
                                    ? "success"
                                    : item.status === "borrowed"
                                    ? "info"
                                    : "warning"
                                }
                              >
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.type === "book" ? `By: ${item.author}` : item.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ID: {item.id}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-3">
                          <Scan className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">No recent scans</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Scanned items will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Scanning QR Codes</h4>
                    <p className="text-muted-foreground">
                      Position the QR code within the center of the camera frame and hold steady until it scans.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Manual Entry</h4>
                    <p className="text-muted-foreground">
                      Use the manual entry tab when QR codes are damaged or unreadable.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Processing Books</h4>
                    <p className="text-muted-foreground">
                      After scanning a book, you can borrow or return it directly from the details panel.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QrScanner;
