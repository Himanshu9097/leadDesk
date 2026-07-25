import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterValues = z.infer<typeof registerSchema>;

const AdminRegister: React.FC = () => {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const onSubmit = async (data: RegisterValues) => {
    try {
      const response = await api.post('/auth/register', data);
      login(response.data);
      toast.success('Account created successfully!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to register account'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent-secondary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-card p-10 rounded-2xl shadow-xl shadow-accent/5 border border-border relative z-10"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mb-6 shadow-accent-lg shadow-accent/30">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-serif text-foreground mb-2">Create Account</h2>
          <p className="text-muted-foreground text-sm">Set up your admin credentials</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Jane Doe"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@leaddesk.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
            Register
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/admin/login" className="text-accent hover:text-accent-secondary font-medium transition-colors">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
