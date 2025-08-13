import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addEmail } from '@/lib/emailService';

export const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleGetNotified = async () => {
    if (!isExpanded) {
      setIsExpanded(true);
      return;
    }

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Send email to your API
      const response = await fetch(import.meta.env.VITE_EMAIL_SUBSCRIBE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Also save to Firebase for management
        try {
          await addEmail(email);
        } catch (firebaseError) {
          console.warn('Failed to save to Firebase:', firebaseError);
          // Continue with success flow even if Firebase fails
        }
        
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Welcome email sent! Check your inbox for special rewards.",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit email. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center space-y-4 animate-fade-in-up">
        <div className="p-4 bg-primary/10 rounded-full">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            You're all set!
          </h3>
          <p className="text-muted-foreground">
            An Email has been sent to <span className="font-semibold">{email}</span>.
          Please check your inbox and spam folder.
            We'll notify you as soon as Clippy is ready
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className={`transition-all duration-500 ease-out ${
        isExpanded ? 'w-full max-w-md' : 'w-auto'
      }`}>
        {!isExpanded ? (
          <button
            onClick={handleGetNotified}
            className="btn-hero flex items-center space-x-3"
          >
            <Mail className="w-6 h-6" />
            <span>Get Notified</span>
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 w-full animate-fade-in-up">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-modern h-14 text-lg"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleGetNotified()}
              />
            </div>
            <Button
              onClick={handleGetNotified}
              disabled={isLoading}
              className="btn-secondary h-14 px-8 whitespace-nowrap"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Submit
                </>
              )}
            </Button>
          </div>
        )}
      </div>
      
      {isExpanded && !isSubmitted && (
        <p className="text-sm text-muted-foreground text-center animate-fade-in-up">
          Join thousands of creators waiting for the future of AI content generation
        </p>
      )}
    </div>
  );
};