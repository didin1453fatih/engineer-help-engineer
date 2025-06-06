import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2, Sparkles } from 'lucide-react';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-5',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
  color?: string;
}

export function Spinner({ size, show, children, className, color='white' }: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Sparkles height={15} className={cn(loaderVariants({ size }), className)} color={color} />
      {children}
    </span>
  );
}
