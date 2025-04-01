
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Users, QrCode, BarChart2, Bell, Shield, ChevronRight } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="dashboard-card group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl border-library-200/50 backdrop-blur-sm">
      <div className="feature-icon mb-4 group-hover:bg-library-200 group-hover:text-library-700 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-library-50/80 via-white to-white"></div>
        
        {/* Digital abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-70 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-library-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="mb-2 inline-block px-3 py-1 rounded-full bg-library-100 text-library-700 text-sm font-medium">
                Next-Gen Library Management
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-library-800 via-library-700 to-library-600">
                Revolutionize Your Reading Experience
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Discover, borrow, and manage books seamlessly with our digital library platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button className="w-full sm:w-auto text-base px-8 py-6 group relative overflow-hidden" size="lg">
                    <span className="absolute inset-0 w-0 bg-library-700 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative flex items-center transition-colors group-hover:text-white">
                      Get Started <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6 border-library-200 hover:bg-library-50 transition-all duration-300" size="lg">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg">
                {/* Digital Library Illustration - using SVG for more digital feel */}
                <svg 
                  className="w-full h-auto relative z-20" 
                  viewBox="0 0 616 502" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1_247)">
                    <rect x="171.901" y="98.2324" width="230.992" height="324.525" rx="9.03144" transform="rotate(4 171.901 98.2324)" fill="white" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <rect x="186.562" y="131.328" width="199.474" height="137.344" rx="3.87063" transform="rotate(4 186.562 131.328)" fill="#F9FAFB"/>
                    <rect x="186.562" y="131.328" width="199.474" height="137.344" rx="3.87063" transform="rotate(4 186.562 131.328)" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M197.887 370.8L416.249 385.233" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M195.48 346.5L413.843 360.933" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M217.883 180.533L197.883 180.533L197.883 300.533L217.883 300.533L217.883 180.533Z" transform="rotate(4 208.883 240.533)" fill="#D1E9FF"/>
                    <path d="M247.883 180.533L227.883 180.533L227.883 300.533L247.883 300.533L247.883 180.533Z" transform="rotate(4 237.883 240.533)" fill="#EAECF0"/>
                    <path d="M277.883 180.533L257.883 180.533L257.883 300.533L277.883 300.533L277.883 180.533Z" transform="rotate(4 267.883 240.533)" fill="#FEE4E2"/>
                    <path d="M307.883 180.533L287.883 180.533L287.883 300.533L307.883 300.533L307.883 180.533Z" transform="rotate(4 297.883 240.533)" fill="#D1FADF"/>
                    <path d="M337.883 180.533L317.883 180.533L317.883 300.533L337.883 300.533L337.883 180.533Z" transform="rotate(4 327.883 240.533)" fill="#F9F5FF"/>
                    <path d="M367.883 180.533L347.883 180.533L347.883 300.533L367.883 300.533L367.883 180.533Z" transform="rotate(4 357.883 240.533)" fill="#FCE7F6"/>
                    <path d="M397.883 180.533L377.883 180.533L377.883 300.533L397.883 300.533L397.883 180.533Z" transform="rotate(4 387.883 240.533)" fill="#FEF0C7"/>
                  </g>
                  <g filter="url(#filter1_d_1_247)">
                    <rect x="80.0986" y="77.2266" width="230.992" height="324.525" rx="9.03144" fill="white" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <rect x="94.4556" y="109.979" width="199.474" height="137.344" rx="3.87063" fill="#F9FAFB" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M94.4556 348.5L293.929 348.5" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M94.4556 324.5L293.929 324.5" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M124.456 159.5L104.456 159.5L104.456 279.5L124.456 279.5L124.456 159.5Z" fill="#D1E9FF"/>
                    <path d="M154.456 159.5L134.456 159.5L134.456 279.5L154.456 279.5L154.456 159.5Z" fill="#EAECF0"/>
                    <path d="M184.456 159.5L164.456 159.5L164.456 279.5L184.456 279.5L184.456 159.5Z" fill="#FEE4E2"/>
                    <path d="M214.456 159.5L194.456 159.5L194.456 279.5L214.456 279.5L214.456 159.5Z" fill="#D1FADF"/>
                    <path d="M244.456 159.5L224.456 159.5L224.456 279.5L244.456 279.5L244.456 159.5Z" fill="#F9F5FF"/>
                    <path d="M274.456 159.5L254.456 159.5L254.456 279.5L274.456 279.5L274.456 159.5Z" fill="#FCE7F6"/>
                    <path d="M304.456 159.5L284.456 159.5L284.456 279.5L304.456 279.5L304.456 159.5Z" fill="#FEF0C7"/>
                  </g>
                  <g filter="url(#filter2_d_1_247)">
                    <rect x="261.07" y="35.0312" width="230.992" height="324.525" rx="9.03144" transform="rotate(-4 261.07 35.0312)" fill="white" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <rect x="258.105" y="70.5391" width="199.474" height="137.344" rx="3.87063" transform="rotate(-4 258.105 70.5391)" fill="#F9FAFB" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M230.114 310.307L448.476 295.874" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M227.707 286.007L446.07 271.574" stroke="#EAECF0" strokeWidth="1.29021"/>
                    <path d="M249.883 120.467L229.883 120.467L229.883 240.467L249.883 240.467L249.883 120.467Z" transform="rotate(-4 239.883 180.467)" fill="#D1E9FF"/>
                    <path d="M279.883 120.467L259.883 120.467L259.883 240.467L279.883 240.467L279.883 120.467Z" transform="rotate(-4 269.883 180.467)" fill="#EAECF0"/>
                    <path d="M309.883 120.467L289.883 120.467L289.883 240.467L309.883 240.467L309.883 120.467Z" transform="rotate(-4 299.883 180.467)" fill="#FEE4E2"/>
                    <path d="M339.883 120.467L319.883 120.467L319.883 240.467L339.883 240.467L339.883 120.467Z" transform="rotate(-4 329.883 180.467)" fill="#D1FADF"/>
                    <path d="M369.883 120.467L349.883 120.467L349.883 240.467L369.883 240.467L369.883 120.467Z" transform="rotate(-4 359.883 180.467)" fill="#F9F5FF"/>
                    <path d="M399.883 120.467L379.883 120.467L379.883 240.467L399.883 240.467L399.883 120.467Z" transform="rotate(-4 389.883 180.467)" fill="#FCE7F6"/>
                    <path d="M429.883 120.467L409.883 120.467L409.883 240.467L429.883 240.467L429.883 120.467Z" transform="rotate(-4 419.883 180.467)" fill="#FEF0C7"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_1_247" x="162.875" y="92.1953" width="262.376" height="358.967" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="12.9021"/>
                      <feGaussianBlur stdDeviation="4.30068"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_247"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_247" result="shape"/>
                    </filter>
                    <filter id="filter1_d_1_247" x="71.498" y="71.498" width="248.136" height="354.358" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="12.9021"/>
                      <feGaussianBlur stdDeviation="4.30068"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_247"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_247" result="shape"/>
                    </filter>
                    <filter id="filter2_d_1_247" x="210.859" y="29.7769" width="257.311" height="356.193" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="12.9021"/>
                      <feGaussianBlur stdDeviation="4.30068"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_247"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_247" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-2 inline-block px-3 py-1 rounded-full bg-library-100 text-library-700 text-sm font-medium">
              Powerful Features
            </div>
            <h2 className="text-3xl font-bold mb-4">Streamlined Library Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a comprehensive set of tools designed to modernize library management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Smart Book Search"
              description="Powerful search engine with filters for quick and accurate book discovery"
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Personalized Recommendations"
              description="AI-powered suggestions based on reading history and preferences"
            />
            <FeatureCard 
              icon={<QrCode className="h-6 w-6" />}
              title="QR Code Based Borrowing"
              description="Seamless borrowing and returns using QR code technology"
            />
            <FeatureCard 
              icon={<BarChart2 className="h-6 w-6" />}
              title="Analytics Dashboard"
              description="Comprehensive insights on library usage and book popularity"
            />
            <FeatureCard 
              icon={<Bell className="h-6 w-6" />}
              title="Real-time Notifications"
              description="Stay updated with due dates, new arrivals, and reservation status"
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6" />}
              title="Role-based Access"
              description="Secure platform with customized access for librarians and members"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-library-50/50 -z-10"></div>
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-library-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-2 inline-block px-3 py-1 rounded-full bg-library-100 text-library-700 text-sm font-medium">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold mb-4">Trusted by Libraries Worldwide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our users are saying about how LibraryOS has transformed their library experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-library-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-library-100 flex items-center justify-center text-library-600 font-bold text-lg">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-500">City Public Library</p>
                </div>
              </div>
              <p className="text-gray-600">
                "LibraryOS has completely transformed how we manage our collection. The analytics provide valuable insights we never had access to before."
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-library-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-library-100 flex items-center justify-center text-library-600 font-bold text-lg">
                  AS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Amanda Smith</h4>
                  <p className="text-sm text-gray-500">University Library</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Our students love the QR code borrowing feature. It's made the process so much faster and has increased our circulation rates."
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-library-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-library-100 flex items-center justify-center text-library-600 font-bold text-lg">
                  RJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-gray-500">School Librarian</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The recommendation system has helped our students discover books they would have never found otherwise. It's been a game-changer."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-library-600 to-library-700 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-library-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-library-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Library?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of libraries already using LibraryOS to enhance their operations
          </p>
          <Link to="/login">
            <Button variant="secondary" className="text-library-700 bg-white hover:bg-gray-100 transition-colors text-base px-8 py-6 animate-pulse-shadow" size="lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
