
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Bell,
  BookOpenCheck,
  Calendar,
  Check,
  Info,
  AlertCircle,
  Trash2,
  User,
  Clock,
  BookOpen,
  RefreshCw,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { EmptyState } from "@/components/EmptyState";

// Sample notifications data
const allNotifications = [
  {
    id: "1",
    title: "Book Due Soon",
    message: "The Midnight Library is due in 2 days.",
    type: "reminder",
    isRead: false,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "New Book Available",
    message: "Project Hail Mary is now available for borrowing.",
    type: "info",
    isRead: false,
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    title: "Overdue Book",
    message: "Your book Atomic Habits is 3 days overdue. Please return it soon.",
    type: "alert",
    isRead: false,
    timestamp: "1 day ago",
  },
  {
    id: "4",
    title: "Book Return Confirmation",
    message: "Thank you for returning The Great Gatsby.",
    type: "success",
    isRead: true,
    timestamp: "3 days ago",
  },
  {
    id: "5",
    title: "Reservation Available",
    message: "Your reserved book Dune is now available for pickup.",
    type: "info",
    isRead: true,
    timestamp: "4 days ago",
  },
  {
    id: "6",
    title: "Account Update",
    message: "Your library membership has been renewed successfully.",
    type: "success",
    isRead: true,
    timestamp: "1 week ago",
  },
  {
    id: "7",
    title: "Maintenance Notice",
    message: "The library will be closed for maintenance on Sunday, October 15.",
    type: "info",
    isRead: true,
    timestamp: "1 week ago",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const unreadCount = notifications.filter((note) => !note.isRead).length;

  const filteredNotifications = notifications.filter((note) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !note.isRead;
    return note.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((note) =>
        note.id === id ? { ...note, isRead: true } : note
      )
    );
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((note) => ({ ...note, isRead: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((note) => note.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "All notifications have been deleted.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "reminder":
        return <Badge variant="info">Reminder</Badge>;
      case "info":
        return <Badge variant="info">Info</Badge>;
      case "alert":
        return <Badge variant="destructive">Alert</Badge>;
      case "success":
        return <Badge variant="success">Success</Badge>;
      default:
        return <Badge>General</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <PageHeader
            title="Notifications"
            description={`You have ${unreadCount} unread notifications`}
            action={{
              label: "Mark all as read",
              icon: <Check className="h-4 w-4" />,
              onClick: markAllAsRead
            }}
          />
          
          <div className="mb-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="all" className="relative">
                    All
                    {notifications.length > 0 && (
                      <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                        {notifications.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="relative">
                    Unread
                    {unreadCount > 0 && (
                      <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="reminder">Reminders</TabsTrigger>
                  <TabsTrigger value="alert">Alerts</TabsTrigger>
                </TabsList>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex"
                  onClick={clearAllNotifications}
                  disabled={notifications.length === 0}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
              
              <TabsContent value={activeTab} className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`p-4 ${
                        !notification.isRead
                          ? "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold">
                                {notification.title}
                              </h4>
                              {getNotificationBadge(notification.type)}
                              {!notification.isRead && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-end gap-2 pt-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Mark as read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <EmptyState
                    icon={<Bell className="h-12 w-12 text-muted-foreground/50" />}
                    title="No notifications"
                    description={
                      activeTab === "all"
                        ? "You don't have any notifications at the moment."
                        : activeTab === "unread"
                        ? "You don't have any unread notifications."
                        : `You don't have any ${activeTab} notifications.`
                    }
                    actionLabel="Refresh"
                    actionIcon={<RefreshCw className="mr-2 h-4 w-4" />}
                    onAction={() => {
                      toast({
                        title: "Refreshed",
                        description: "Checking for new notifications..."
                      });
                    }}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Upcoming Due Dates</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">The Midnight Library</h4>
                      <Badge variant="warning">Due in 2 days</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Due date: October 15, 2023
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Calendar className="mr-2 h-4 w-4" /> Renew
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">Project Hail Mary</h4>
                      <Badge variant="info">Due in 5 days</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Due date: October 18, 2023
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Calendar className="mr-2 h-4 w-4" /> Renew
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <BookOpenCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">The Great Gatsby</h4>
                      <Badge variant="success">Returned</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Returned on: October 10, 2023
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">Account Update</h4>
                      <Badge variant="info">Membership</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your library membership has been renewed for another year.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
