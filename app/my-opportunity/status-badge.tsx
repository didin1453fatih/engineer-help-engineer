import { Badge } from "@/components/ui/badge"; // Adjust import path as needed
import { cn } from "@/lib/utils"; // Optional classname helper

const statusConfig = {
  interested: {
    className: "bg-green-100 text-green-800 hover:bg-green-100",
    label: "Interested",
    icon: "🌱",
  },
  preparing: {
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    label: "Preparing",
    icon: "📚",
  },
  applied: {
    className: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
    label: "Applied",
    icon: "📨",
  },
  interview: {
    className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    label: "Interview",
    icon: "💼",
  },
  waiting_result: {
    className: "bg-amber-100 text-amber-800 hover:bg-amber-100",
    label: "Waiting Result",
    icon: "⏳",
  },
  rejected: {
    className: "bg-red-100 text-red-800 hover:bg-red-100",
    label: "Rejected",
    icon: "❌",
  },
  hired: {
    className: "bg-green-100 text-green-800 hover:bg-green-100",
    label: "Hired",
    icon: "🏆",
  },
  offer: {
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    label: "Offer",
    icon: "💰",
  },
  default: {
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    label: null,
    icon: null,
  },
} as const;

interface StatusBadgeProps {
  status: keyof typeof statusConfig | string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.default;

  return (
    <Badge
      variant="default"
      className={cn(
        "font-medium rounded-md inline-flex items-center gap-1 border",
        config.className,
        className
      )}
    >
      {config.label ? config.label : status}
      {config.icon && <span className="text-sm pl-1">{config.icon}</span>}
    </Badge>
  );
};
