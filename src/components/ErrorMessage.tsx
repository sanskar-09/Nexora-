
import { AlertCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
  variant?: 'inline' | 'card';
}

const ErrorMessage = ({ 
  title = "Error", 
  message, 
  onDismiss, 
  onRetry, 
  variant = 'inline' 
}: ErrorMessageProps) => {
  if (variant === 'card') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">{title}</h3>
            <p className="text-sm text-red-700 mt-1">{message}</p>
            {(onRetry || onDismiss) && (
              <div className="mt-3 flex space-x-2">
                {onRetry && (
                  <Button size="sm" variant="outline" onClick={onRetry}>
                    Try Again
                  </Button>
                )}
                {onDismiss && (
                  <Button size="sm" variant="ghost" onClick={onDismiss}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center text-red-600 text-sm">
      <AlertCircle className="w-4 h-4 mr-2" />
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="ml-2 text-red-400 hover:text-red-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
