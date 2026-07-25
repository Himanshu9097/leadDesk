import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, UserPlus, PhoneCall, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionBadge } from '../components/ui/SectionBadge';

interface Stats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  closedLeads: number;
}

const StatCard = ({ title, value, icon, delay }: { title: string, value: number | string, icon: ReactNode, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
  >
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
      <h4 className="text-3xl font-bold text-foreground font-serif tracking-tight">{value}</h4>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/leads/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-card rounded-2xl p-6 border border-border h-[160px] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <SectionBadge className="mb-4" animateDot={false}>Overview</SectionBadge>
        <h2 className="text-3xl font-serif text-foreground">Pipeline Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Leads" 
          value={stats?.totalLeads || 0} 
          icon={<Users className="w-6 h-6" />} 
          delay={0.1}
        />
        <StatCard 
          title="New Leads" 
          value={stats?.newLeads || 0} 
          icon={<UserPlus className="w-6 h-6" />} 
          delay={0.2}
        />
        <StatCard 
          title="Contacted" 
          value={stats?.contactedLeads || 0} 
          icon={<PhoneCall className="w-6 h-6" />} 
          delay={0.3}
        />
        <StatCard 
          title="Closed" 
          value={stats?.closedLeads || 0} 
          icon={<CheckCircle2 className="w-6 h-6" />} 
          delay={0.4}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-card rounded-2xl p-10 shadow-sm border border-border mt-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-secondary" />
        <h3 className="text-2xl font-serif text-foreground mb-3">Welcome to LeadDesk Mini</h3>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Your pipeline is looking healthy. Navigate to the Leads section to view detailed information, filter your contacts, and manage relationships.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
