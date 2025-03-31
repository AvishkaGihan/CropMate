export const useRoleClasses = (role) => {
  return useMemo(() => {
    switch (role) {
      case "farmer":
        return {
          bg: "bg-cal-poly-green-800",
          hover: "hover:bg-cal-poly-green-700",
          active: "bg-cal-poly-green-600",
          border: "border-cal-poly-green-700",
          text: "text-cal-poly-green-800",
          accent: "bg-cal-poly-green-600",
        };
      case "driver":
        return {
          bg: "bg-cambridge-blue-800",
          hover: "hover:bg-cambridge-blue-700",
          active: "bg-cambridge-blue-600",
          border: "border-cambridge-blue-700",
          text: "text-cambridge-blue-800",
          accent: "bg-cambridge-blue-600",
        };
      case "vendor":
        return {
          bg: "bg-golden-brown-800",
          hover: "hover:bg-golden-brown-700",
          active: "bg-golden-brown-600",
          border: "border-golden-brown-700",
          text: "text-golden-brown-800",
          accent: "bg-golden-brown-600",
        };
      default:
        return {
          bg: "bg-cal-poly-green-800",
          hover: "hover:bg-cal-poly-green-700",
          active: "bg-cal-poly-green-600",
          border: "border-cal-poly-green-700",
          text: "text-cal-poly-green-800",
          accent: "bg-cal-poly-green-600",
        };
    }
  }, [role]);
};
