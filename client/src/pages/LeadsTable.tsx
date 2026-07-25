import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import { Search, Filter, Download, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { SectionBadge } from '../components/ui/SectionBadge';
import { motion } from 'framer-motion';

interface Lead {
  _id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
}

const LeadsTable: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/leads', {
        params: {
          search: debouncedSearch,
          status: statusFilter,
          page,
          limit: 10,
        },
      });
      setLeads(data.leads);
      setTotalPages(data.pages);
      setTotalLeads(data.total);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch, statusFilter, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const previousLeads = [...leads];
    setLeads(leads.map((l) => (l._id === leadId ? { ...l, status: newStatus as any } : l)));

    try {
      await api.patch(`/leads/${leadId}/status`, { status: newStatus });
      toast.success('Status updated');
    } catch (error) {
      setLeads(previousLeads);
      toast.error('Failed to update status');
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return toast.error('No data to export');
    
    const headers = ['Name', 'Email', 'Budget', 'Status', 'Date', 'Message'];
    const csvContent = [
      headers.join(','),
      ...leads.map((l) => 
        `"${l.name}","${l.email}","${l.budget}","${l.status}","${format(new Date(l.createdAt), 'yyyy-MM-dd')}","${l.message.replace(/"/g, '""')}"`
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Closed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-[calc(100vh-10rem)]"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <SectionBadge className="mb-2" animateDot={false}>Leads</SectionBadge>
          <h2 className="text-3xl font-serif text-foreground">Pipeline Management</h2>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border flex flex-col flex-1 overflow-hidden relative">
        {/* Toolbar */}
        <div className="p-5 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search leads..." 
              className="pl-10 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                className="w-full pl-10 h-11 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all font-medium text-slate-700"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <Button variant="outline" size="sm" className="h-11 px-5" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 sticky top-0 border-b border-border text-muted-foreground font-medium z-10">
              <tr>
                <th className="px-8 py-5">Name & Email</th>
                <th className="px-8 py-5">Budget</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 max-w-[200px]">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse bg-white">
                    <td className="px-8 py-5"><div className="h-10 bg-muted rounded-xl w-48"></div></td>
                    <td className="px-8 py-5"><div className="h-5 bg-muted rounded-md w-24"></div></td>
                    <td className="px-8 py-5"><div className="h-8 bg-muted rounded-full w-32"></div></td>
                    <td className="px-8 py-5"><div className="h-5 bg-muted rounded-md w-24"></div></td>
                    <td className="px-8 py-5"><div className="h-5 bg-muted rounded-md w-48"></div></td>
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-muted-foreground bg-white">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-xl font-serif text-foreground mb-1">No leads found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-muted/30 transition-colors bg-white group">
                    <td className="px-8 py-5">
                      <p className="font-semibold text-foreground">{lead.name}</p>
                      <p className="text-muted-foreground text-xs mt-1">{lead.email}</p>
                    </td>
                    <td className="px-8 py-5 text-foreground font-medium">{lead.budget}</td>
                    <td className="px-8 py-5">
                      <select
                        className={cn(
                          "h-8 text-xs font-bold rounded-full px-4 pr-8 appearance-none border cursor-pointer focus:ring-2 focus:ring-accent focus:outline-none transition-colors",
                          getStatusBadge(lead.status)
                        )}
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      >
                        <option value="New" className="bg-white text-foreground">New</option>
                        <option value="Contacted" className="bg-white text-foreground">Contacted</option>
                        <option value="Closed" className="bg-white text-foreground">Closed</option>
                      </select>
                    </td>
                    <td className="px-8 py-5 text-muted-foreground text-sm font-mono">
                      {format(new Date(lead.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-8 py-5 max-w-[200px] truncate text-muted-foreground">
                      {lead.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="p-5 border-t border-border flex items-center justify-between bg-white/50">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{leads.length}</span> of <span className="font-medium text-foreground">{totalLeads}</span> leads
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LeadsTable;
