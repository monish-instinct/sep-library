
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader = () => {
  return (
    <header className="w-full h-16 border-b bg-white flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center w-full max-w-xs relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Search for books, members..." 
          className="pl-10"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer py-2">
                <div className="flex gap-2 w-full">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Book Return Overdue</p>
                    <p className="text-xs text-gray-500">
                      "The Midnight Library" is 3 days overdue from Jane Smith.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer py-2">
                <div className="flex gap-2 w-full">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">New Book Added</p>
                    <p className="text-xs text-gray-500">
                      "Project Hail Mary" has been added to the Science Fiction section.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer py-2">
                <div className="flex gap-2 w-full">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Book Reservation</p>
                    <p className="text-xs text-gray-500">
                      Michael Johnson has reserved "Atomic Habits".
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center">
              <span className="text-sm text-library-600 font-medium">View all notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2" size="sm">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@librarian" />
                <AvatarFallback>LB</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Alex Morgan</p>
                <p className="text-xs text-gray-500">Librarian</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

// Add the missing import
import { LogOut, Settings } from "lucide-react";

export default DashboardHeader;
