import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, CreditCard, ArrowLeftRight, History, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/accounts', label: 'Accounts', icon: CreditCard },
    { path: '/transfer', label: 'Transfer', icon: ArrowLeftRight },
    { path: '/transactions', label: 'Transactions', icon: History },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const NavLink = ({ path, label, icon: Icon, mobile = false }) => {
    const isActive = location.pathname === path;
    const baseClasses = mobile 
      ? "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
      : "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium";
    
    const activeClasses = isActive 
      ? "bg-blue-100 text-blue-700" 
      : "text-gray-600 hover:text-blue-700 hover:bg-blue-50";

    return (
      <Link 
        to={path} 
        className={`${baseClasses} ${activeClasses}`}
        onClick={() => mobile && setIsOpen(false)}
      >
        <Icon className={mobile ? "h-5 w-5" : "h-4 w-4"} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BankApp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.path} {...item} />
            ))}
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 px-4 py-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">BankApp</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    {navItems.map((item) => (
                      <NavLink key={item.path} {...item} mobile />
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;