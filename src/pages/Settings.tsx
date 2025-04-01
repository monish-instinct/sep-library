
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  Mail,
  Bell,
  User,
  Lock,
  Globe,
  Download,
  Database,
  AlertTriangle,
  Trash2,
  ArrowRight,
  Shield,
  BookOpen,
  Terminal,
  Loader2
} from "lucide-react";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleGenerateApiKey = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "API Key generated",
        description: "Your new API key has been generated",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully",
        variant: "destructive",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <PageHeader
            title="Settings"
            description="Manage your account settings and preferences"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
            {/* Settings Tabs - Vertical on desktop, horizontal on mobile */}
            <div className="lg:hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-8">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="hidden lg:block space-y-1">
              <div className="text-sm font-medium text-gray-500 mb-2">User Settings</div>
              <Button 
                variant={activeTab === "account" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("account")}
              >
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button 
                variant={activeTab === "security" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("security")}
              >
                <Lock className="h-4 w-4 mr-2" />
                Security
              </Button>
              <Button 
                variant={activeTab === "notifications" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              
              <div className="text-sm font-medium text-gray-500 mt-6 mb-2">System Settings</div>
              <Button 
                variant={activeTab === "system" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("system")}
              >
                <Globe className="h-4 w-4 mr-2" />
                General
              </Button>
              <Button 
                variant={activeTab === "api" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("api")}
              >
                <Terminal className="h-4 w-4 mr-2" />
                API Access
              </Button>
              <Button 
                variant={activeTab === "database" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("database")}
              >
                <Database className="h-4 w-4 mr-2" />
                Database
              </Button>
            </div>
            
            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "account" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        Update your account information and profile details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                        <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-10 w-10 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Profile Picture</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload a profile picture to personalize your account
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm">
                              Upload
                            </Button>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" defaultValue="John" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" defaultValue="Library Administrator" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Tell us a little about yourself"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleSaveSettings} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-600 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Danger Zone
                      </CardTitle>
                      <CardDescription>
                        Irreversible and destructive actions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p className="mb-2">
                          Once you delete your account, there is no going back. All your data will be permanently deleted.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="destructive" onClick={handleDeleteAccount} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              )}
              
              {activeTab === "security" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="two-factor" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Enable Two-Factor Authentication
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch id="two-factor" />
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Login Sessions</h3>
                      <div className="space-y-3">
                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-muted-foreground">
                                Chrome on Windows • 192.168.1.1
                              </p>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Previous Session</p>
                              <p className="text-sm text-muted-foreground">
                                Safari on macOS • 192.168.1.2
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">Sign Out</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveSettings} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Update Security
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="email-books" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Book Due Reminders
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications when books are due
                          </p>
                        </div>
                        <Switch id="email-books" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="email-reservations" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Reservation Notifications
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications for book reservations
                          </p>
                        </div>
                        <Switch id="email-reservations" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="email-system" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            System Notifications
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications about system updates
                          </p>
                        </div>
                        <Switch id="email-system" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="push-books" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Book Due Reminders
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications for due books
                          </p>
                        </div>
                        <Switch id="push-books" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="push-returns" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Book Returns
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications when books are returned
                          </p>
                        </div>
                        <Switch id="push-returns" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="push-new-books" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            New Book Arrivals
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications for new book arrivals
                          </p>
                        </div>
                        <Switch id="push-new-books" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSaveSettings} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {activeTab === "system" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      System Settings
                    </CardTitle>
                    <CardDescription>
                      Configure general system settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Library Settings</h3>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="library-name">Library Name</Label>
                        <Input id="library-name" defaultValue="Main Street Library" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main St, Anytown, USA" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="(555) 123-4567" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email-contact">Contact Email</Label>
                          <Input id="email-contact" defaultValue="contact@mainstreetlibrary.com" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Book Lending Settings</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="loan-duration">Default Loan Duration (days)</Label>
                          <Input id="loan-duration" type="number" defaultValue="14" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="max-renewals">Maximum Renewals</Label>
                          <Input id="max-renewals" type="number" defaultValue="2" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="max-books">Maximum Books per Member</Label>
                          <Input id="max-books" type="number" defaultValue="5" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="fine-rate">Fine Rate (per day)</Label>
                          <Input id="fine-rate" type="number" defaultValue="0.50" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">System Preferences</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="dark-mode" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Dark Mode
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Enable dark mode for the interface
                          </p>
                        </div>
                        <Switch id="dark-mode" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label 
                            htmlFor="auto-backup" 
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Automatic Backups
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Enable automatic database backups
                          </p>
                        </div>
                        <Switch id="auto-backup" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSaveSettings} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {activeTab === "api" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Terminal className="h-5 w-5 mr-2" />
                      API Access
                    </CardTitle>
                    <CardDescription>
                      Manage API keys and access for integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium">API Keys</h3>
                          <p className="text-sm text-muted-foreground">
                            Manage your API keys for external integrations
                          </p>
                        </div>
                        <Button onClick={handleGenerateApiKey} disabled={isLoading}>
                          Generate New Key
                        </Button>
                      </div>
                      
                      <div className="border rounded-lg">
                        <div className="p-4 border-b">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <p className="font-medium">Production API Key</p>
                              <p className="text-sm text-muted-foreground">
                                Created: Jun 15, 2023
                              </p>
                            </div>
                            <Badge className="md:ml-auto" variant="outline">Active</Badge>
                          </div>
                        </div>
                        <div className="p-4 flex flex-wrap items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <Input value="sk_live_3T52e1WA9zSVJXDQXDwrMj5K" readOnly className="font-mono text-xs" />
                          </div>
                          <Button variant="outline" size="sm">
                            Copy
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Revoke
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg">
                        <div className="p-4 border-b">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <p className="font-medium">Development API Key</p>
                              <p className="text-sm text-muted-foreground">
                                Created: Feb 3, 2023
                              </p>
                            </div>
                            <Badge className="md:ml-auto" variant="outline">Active</Badge>
                          </div>
                        </div>
                        <div className="p-4 flex flex-wrap items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <Input value="sk_test_7R42s1wA9aFVJXDKLPwrMj5K" readOnly className="font-mono text-xs" />
                          </div>
                          <Button variant="outline" size="sm">
                            Copy
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">API Usage</h3>
                      <div className="border rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <p className="text-sm">Requests this month</p>
                            <p className="text-sm font-medium">12,543 / 50,000</p>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: "25%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Total Requests</p>
                          <p className="text-xl font-bold mt-1">156,289</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Average Response Time</p>
                          <p className="text-xl font-bold mt-1">245ms</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Error Rate</p>
                          <p className="text-xl font-bold mt-1">0.12%</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Documentation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4 flex items-center gap-4">
                            <BookOpen className="h-8 w-8 text-primary" />
                            <div>
                              <h4 className="font-medium">API Documentation</h4>
                              <p className="text-sm text-muted-foreground">
                                Comprehensive API reference and guides
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 flex items-center gap-4">
                            <Download className="h-8 w-8 text-primary" />
                            <div>
                              <h4 className="font-medium">Download SDK</h4>
                              <p className="text-sm text-muted-foreground">
                                Download SDKs for various programming languages
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === "database" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      Database Settings
                    </CardTitle>
                    <CardDescription>
                      Manage database operations and backups
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Database Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Database Size</p>
                          <p className="text-xl font-bold mt-1">248.5 MB</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Last Backup</p>
                          <p className="text-xl font-bold mt-1">Today, 04:30 AM</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium">Backup & Restore</h3>
                          <p className="text-sm text-muted-foreground">
                            Create and manage database backups
                          </p>
                        </div>
                        <Button>
                          <Download className="mr-2 h-4 w-4" />
                          Backup Now
                        </Button>
                      </div>
                      
                      <div className="border rounded-lg divide-y">
                        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <p className="font-medium">Daily Backup</p>
                            <p className="text-sm text-muted-foreground">
                              June 22, 2023 - 04:30 AM
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              Restore
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <p className="font-medium">Weekly Backup</p>
                            <p className="text-sm text-muted-foreground">
                              June 18, 2023 - 05:00 AM
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              Restore
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <p className="font-medium">Monthly Backup</p>
                            <p className="text-sm text-muted-foreground">
                              June 1, 2023 - 03:30 AM
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              Restore
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Backup Schedule</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label 
                              htmlFor="daily-backup" 
                              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Daily Backup
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Automatically backup database daily
                            </p>
                          </div>
                          <Switch id="daily-backup" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label 
                              htmlFor="weekly-backup" 
                              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Weekly Backup
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Automatically backup database weekly
                            </p>
                          </div>
                          <Switch id="weekly-backup" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label 
                              htmlFor="monthly-backup" 
                              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Monthly Backup
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Automatically backup database monthly
                            </p>
                          </div>
                          <Switch id="monthly-backup" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">Reset Settings</Button>
                    <Button onClick={handleSaveSettings} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
