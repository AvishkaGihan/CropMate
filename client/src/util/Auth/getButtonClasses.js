// Button classes based on role
export const getButtonClasses = (role) => {
  const baseClasses = "shadow-sm hover:shadow-md transition-shadow";

  if (role === "farmer") {
    return `${baseClasses} bg-cal-poly-green-600 hover:bg-cal-poly-green-700 text-white`;
  } else if (role === "driver") {
    return `${baseClasses} bg-cambridge-blue-600 hover:bg-cambridge-blue-700 text-white`;
  } else if (role === "vendor") {
    return `${baseClasses} bg-golden-brown-600 hover:bg-golden-brown-700 text-white`;
  }

  return `${baseClasses} bg-cal-poly-green-600 hover:bg-cal-poly-green-700 text-white`;
};
