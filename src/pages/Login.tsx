
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail, Lock, ChevronRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - auto redirect without checking credentials for demo
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome to your dashboard",
      });
      navigate("/dashboard");
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social login - direct to dashboard
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `${provider} login successful`,
        description: "Welcome to your dashboard",
      });
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gray-50">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-library-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side - Digital Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-10 relative">
        <div className="relative z-10 max-w-lg animate-fade-in">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-library-400 to-blue-400 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/60">
              <svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="512" height="512" rx="30" fill="#F9FAFB"/>
                <g opacity="0.8">
                  <path d="M118 128H394V384H118V128Z" fill="#F0F9FF"/>
                  <path d="M142 160H178V352H142V160Z" fill="#7C3AED"/>
                  <path d="M190 160H226V352H190V160Z" fill="#D1D5DB"/>
                  <path d="M238 160H274V352H238V160Z" fill="#FECACA"/>
                  <path d="M286 160H322V352H286V160Z" fill="#A7F3D0"/>
                  <path d="M334 160H370V352H334V160Z" fill="#DDD6FE"/>
                </g>
                <path d="M118 128H394V384H118V128Z" stroke="#E5E7EB" strokeWidth="2"/>
                <path d="M142 160H178V352H142V160Z" stroke="#7C3AED" strokeWidth="2"/>
                <path d="M190 160H226V352H190V160Z" stroke="#D1D5DB" strokeWidth="2"/>
                <path d="M238 160H274V352H238V160Z" stroke="#FECACA" strokeWidth="2"/>
                <path d="M286 160H322V352H286V160Z" stroke="#A7F3D0" strokeWidth="2"/>
                <path d="M334 160H370V352H334V160Z" stroke="#DDD6FE" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div className="mt-8 text-center max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-library-800">Welcome to LibraryOS</h2>
            <p className="mt-2 text-gray-600">
              Your digital library management solution that simplifies book organization, discovery, and borrowing.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md relative z-10 animate-slide-up">
          {/* Glass card effect */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-library-400 to-blue-400 rounded-xl blur opacity-20"></div>
            <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/60">
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
                <h1 className="text-2xl font-bold text-gray-800">Sign in to your account</h1>
                <p className="text-gray-600 mt-2">
                  Enter your credentials to access the library dashboard
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <Button 
                  variant="outline" 
                  className="w-full relative overflow-hidden group hover:border-library-500 transition-all duration-300 bg-white/90" 
                  onClick={() => handleSocialLogin("GitHub")}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 w-3 bg-library-50 group-hover:w-full transition-all duration-300 ease-out -z-10"></div>
                  <Github className="mr-2 h-4 w-4" />
                  Continue with GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full relative overflow-hidden group hover:border-library-500 transition-all duration-300 bg-white/90" 
                  onClick={() => handleSocialLogin("Google")}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 w-3 bg-library-50 group-hover:w-full transition-all duration-300 ease-out -z-10"></div>
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
                  <span className="bg-white/90 px-4 text-gray-500">
                    Or sign in with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10 border-gray-300 focus:border-library-500 focus:ring-library-500 bg-white/90"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-library-600 hover:text-library-700 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      className="pl-10 border-gray-300 focus:border-library-500 focus:ring-library-500 bg-white/90"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full group relative overflow-hidden" 
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 w-0 bg-library-700 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center justify-center transition-colors group-hover:text-white">
                    {isLoading ? "Signing in..." : "Sign in"} <ChevronRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Don't have an account?</span>{" "}
                <Link to="/login" onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Creating account...",
                    description: "For demo purposes, use the sign in form instead",
                  })
                }} className="text-library-600 hover:text-library-700 font-medium transition-colors">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
