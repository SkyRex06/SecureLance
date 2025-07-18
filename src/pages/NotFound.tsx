import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-web3-primary to-web3-secondary inline-block text-transparent bg-clip-text">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Button asChild className="glow-btn rounded-md">
        <a href="/">Return to Dashboard</a>
      </Button>
    </div>
  );
};
export default NotFound;
