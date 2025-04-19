
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTripFormContext } from './TripFormContext';
import { toast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

interface UserContactFormProps {
  onComplete: () => void;
}

const UserContactForm: React.FC<UserContactFormProps> = ({ onComplete }) => {
  const { notifyVendors } = useTripFormContext();
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<'form' | 'processing' | 'complete'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to proceed.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.email.trim() && !formData.phone.trim()) {
      toast({
        title: "Contact Information Required",
        description: "Please provide either an email or phone number for booking confirmations.",
        variant: "destructive",
      });
      return false;
    }
    
    // Basic email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setFormStep('processing');
    
    try {
      // Contact info to display to the vendor
      const contactInfo = formData.email 
        ? formData.email 
        : (formData.phone || 'No contact provided');
        
      // Notify vendors about the booking
      const success = await notifyVendors(formData.name, contactInfo);
      
      if (success) {
        // Show a success message
        toast({
          title: "Vendors Notified",
          description: "All relevant service providers have been notified of your booking.",
        });
      }
      
      // Move to complete state
      setFormStep('complete');
      
      // Small delay before proceeding to checkout
      setTimeout(() => {
        onComplete();
      }, 1500);
      
    } catch (error) {
      console.error("Error processing vendor notifications:", error);
      toast({
        title: "Notification Error",
        description: "There was an error notifying vendors. Your booking will still proceed.",
        variant: "destructive",
      });
      // Still complete the process even if notifications fail
      onComplete();
    } finally {
      setLoading(false);
    }
  };

  if (formStep === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="text-center">Notifying service providers about your booking...</p>
      </div>
    );
  }

  if (formStep === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <p className="text-center text-lg font-medium">Vendors notified successfully!</p>
        <p className="text-sm text-gray-500">Redirecting to checkout...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500">
          Please provide either an email or phone number for booking confirmations.
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : "Continue to Checkout"}
      </Button>
    </form>
  );
};

export default UserContactForm;
