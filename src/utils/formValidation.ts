
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export const validateField = (value: any, rules: ValidationRule): string | null => {
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return 'This field is required';
  }

  if (value && typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`;
    }

    if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }

    if (rules.phone && !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
      return 'Please enter a valid phone number';
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Please enter a valid format';
    }
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (data: Record<string, any>, schema: ValidationSchema): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(data[field], rules);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
};

export const commonValidationSchemas = {
  appointmentForm: {
    doctorName: { required: true },
    date: { required: true },
    time: { required: true },
    reason: { required: true, minLength: 10, maxLength: 500 }
  },
  patientProfile: {
    firstName: { required: true, minLength: 2 },
    lastName: { required: true, minLength: 2 },
    email: { required: true, email: true },
    phone: { required: true, phone: true }
  },
  medicalRecord: {
    title: { required: true, minLength: 3 },
    date: { required: true },
    provider: { required: true }
  }
};
