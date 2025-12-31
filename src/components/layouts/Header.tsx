// تخطيط الرأس الرئيسي
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Video, Settings, User, LogOut, Shield, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 xl:h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Video className="w-4 h-4 xl:w-6 xl:h-6 text-primary-foreground" />
          </div>
          <span className="text-lg xl:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ovlilive
          </span>
        </Link>

        <nav className="flex items-center gap-2 xl:gap-4">
          {user ? (
            <>
              {/* Desktop Navigation */}
              <Button variant="ghost" asChild className="hidden xl:flex">
                <Link to="/chat">
                  <Video className="w-4 h-4 ml-2" />
                  بدء الدردشة
                </Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="xl:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-4 mt-8">
                    <Link 
                      to="/chat" 
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Video className="w-5 h-5" />
                      <span>بدء الدردشة</span>
                    </Link>
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>الملف الشخصي</span>
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      <span>الإعدادات</span>
                    </Link>
                    {profile?.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Shield className="w-5 h-5" />
                        <span>لوحة الإدارة</span>
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted text-destructive"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 xl:h-10 xl:w-10 rounded-full">
                    <Avatar className="h-8 w-8 xl:h-10 xl:w-10">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.display_name || profile?.username} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {profile?.display_name?.[0] || profile?.username?.[0] || 'م'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 hidden xl:block" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{profile?.display_name || profile?.username}</p>
                      <p className="text-xs text-muted-foreground">{profile?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 ml-2" />
                      الملف الشخصي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="w-4 h-4 ml-2" />
                      الإعدادات
                    </Link>
                  </DropdownMenuItem>
                  {profile?.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Shield className="w-4 h-4 ml-2" />
                          لوحة الإدارة
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="text-sm">
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
              <Button size="sm" asChild className="text-sm">
                <Link to="/login">ابدأ الآن</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
