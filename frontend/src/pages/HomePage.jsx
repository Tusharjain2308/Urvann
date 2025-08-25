import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { Leaf } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-4 shadow-lg">
          <Leaf className="w-12 h-12 text-white" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-green-900">Welcome to Urvann</h1>
        <p className="text-lg text-green-800">
          Your botanical paradise awaits. Browse and order the perfect plants for your space.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Link to="/auth/user">
            <Button className="bg-green-500 hover:bg-green-600 text-white transition-all">
              User Login / Register
            </Button>
          </Link>
          <Link to="/auth/admin">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white transition-all">
              Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
