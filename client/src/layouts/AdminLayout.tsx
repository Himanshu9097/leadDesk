import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Zap, LayoutDashboard, Users, LogOut, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

const AdminLayout: React.FC = () => {
  const { admin, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Leads', path: '/admin/leads', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex bg-background selection:bg-accent selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-background flex flex-col fixed inset-y-0 left-0 z-20 border-r border-border/10">
        <div className="h-20 flex items-center px-6 border-b border-border/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-accent">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl tracking-tight text-white">LeadDesk</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group',
                  isActive 
                    ? 'bg-accent/10 text-accent border border-accent/20' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white border border-transparent'
                )}
              >
                <span className={cn("transition-colors", isActive ? "text-accent" : "text-white/60 group-hover:text-white")}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/10 bg-white/5 m-4 rounded-2xl">
          <div className="flex items-center gap-3 px-2 py-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-sm font-bold text-accent">
              {admin.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{admin.name}</p>
              <p className="text-xs text-white/50 truncate font-mono mt-0.5">{admin.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-medium border border-transparent hover:border-border/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center px-10 sticky top-0 z-10">
          <h1 className="text-2xl font-serif text-foreground capitalize">
            {location.pathname.split('/').pop()}
          </h1>
        </header>
        <div className="p-10 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
