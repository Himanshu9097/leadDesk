import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import api from '../services/api';
import toast from 'react-hot-toast';

const budgetRanges = [
  'Under ₹50,000',
  '₹50,000–₹2,00,000',
  '₹2,00,000–₹5,00,000',
  '₹5,00,000+',
] as const;

const leadSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.enum(budgetRanges, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const LeadForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      // Save to local DB to keep CRM functionality
      await api.post('/leads', data);
      
      // Send notification via Formspree
      await fetch('https://formspree.io/f/xgogpaqw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      toast.success('Thank you! Your inquiry has been submitted successfully.');
      reset();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Full Name"
        placeholder="Jane Doe"
        {...register('name')}
        error={errors.name?.message}
        className="bg-transparent border-border rounded-xl"
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="jane@example.com"
        {...register('email')}
        error={errors.email?.message}
        className="bg-transparent border-border rounded-xl"
      />
      
      <div className="w-full">
        <label className="block text-sm font-medium text-foreground mb-2">
          Budget Range
        </label>
        <select
          {...register('budget')}
          className={`flex h-12 w-full rounded-xl border ${
            errors.budget ? 'border-red-500 focus:ring-red-500' : 'border-border'
          } bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all text-foreground appearance-none`}
        >
          <option value="" disabled className="text-muted-foreground">Select a budget...</option>
          <option value="Under ₹50,000">Under ₹50,000</option>
          <option value="₹50,000–₹2,00,000">₹50,000–₹2,00,000</option>
          <option value="₹2,00,000–₹5,00,000">₹2,00,000–₹5,00,000</option>
          <option value="₹5,00,000+">₹5,00,000+</option>
        </select>
        {errors.budget && (
          <p className="mt-1.5 text-sm text-red-500 ml-1">{errors.budget.message}</p>
        )}
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <textarea
          {...register('message')}
          placeholder="Tell us about your project..."
          rows={4}
          className={`flex w-full rounded-xl border ${
            errors.message ? 'border-red-500 focus:ring-red-500' : 'border-border'
          } bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none`}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500 ml-1">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Submit Inquiry
      </Button>
    </form>
  );
};

export default LeadForm;
