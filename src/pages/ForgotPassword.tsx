import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send a request to your backend here
    // to trigger the password reset email.
    console.log('Password reset request for:', email);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Password Reset Email Sent',
        description: 'If an account with that email exists, you will receive a password reset link shortly.',
      });
      navigate('/login'); // Redirect to login page after submission
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send password reset email. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">Forgot Your Password?</CardTitle>
          <CardDescription className="text-center">
            Enter your email address below to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Send Reset Link</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Remember your password?{' '}
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 p-0 font-medium hover:underline"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword; 