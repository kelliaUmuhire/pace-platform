import { Loading03Icon } from "hugeicons-react";

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <Loading03Icon />
    </div>
  );
};

export default LoadingSpinner;