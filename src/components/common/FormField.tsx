
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ErrorMessage from "@/components/ErrorMessage";

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'textarea' | 'select';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string; }[];
}

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required,
  options 
}: FormFieldProps) => {
  const baseClasses = "mt-1";
  const errorClasses = error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "";

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
            rows={4}
          />
        );
      
      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={`${baseClasses} ${errorClasses}`}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return (
          <Input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FormField;
