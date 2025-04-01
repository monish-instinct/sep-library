
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Github, User, Mail, Lock } from "lucide-react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes - in a real app, this would be a proper auth flow
      if (fullName && email && password) {
        toast({
          title: "Account created",
          description: "You have successfully created your account",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: "Please fill in all required fields",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-library-50 items-center justify-center p-10">
        <div className="max-w-lg">
          <img
            src="https://cdn.midjourney.com/8ed0f2e0-d56e-435c-a733-c03fdaa6151c/0_0.webp"
            alt="Digital Library Illustration"
            className="rounded-xl shadow-xl"
          />
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-library-800">Join Our Community</h2>
            <p className="mt-2 text-gray-600">
              Sign up to access our digital library and discover a world of knowledge
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center mb-6">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-library-600"
              >
                <path 
                  d="M12 4.5c-2.248 0-4.5.5-6 1.5V17c1.5-1 3.752-1.5 6-1.5 2.248 0 4.5.5 6 1.5V6c-1.5-1-3.752-1.5-6-1.5z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 4.5C9.752 4.5 7.5 5 6 6M12 15.5c-2.248 0-4.5.5-6 1.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-library-700 to-library-500">LibraryOS</span>
            </Link>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-gray-600 mt-2">
              Sign up to get started with LibraryOS
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <Button variant="outline" className="w-full" onClick={() => navigate("/dashboard")}>
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/dashboard")}>
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.36 14.3c-.28.38-.75.6-1.24.6H7.88c-.49 0-.96-.22-1.24-.6-.58-.91-.35-2.12.52-2.71L11.09 10l-3.93-3.59c-.87-.59-1.1-1.8-.52-2.71.28-.38.75-.6 1.24-.6h8.24c.49 0 .96.22 1.24.6.58.91.35 2.12-.52 2.71L12.91 10l3.93 3.59c.87.59 1.1 1.8.52 2.71z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="fullName" 
                  placeholder="John Doe" 
                  className="pl-10"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{" "}
            <Link to="/login" className="text-library-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>

          <p className="mt-8 text-xs text-center text-gray-500">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-library-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-library-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
