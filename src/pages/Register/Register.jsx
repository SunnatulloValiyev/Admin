import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "../../hooks/useRegister"; 

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useRegister(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    await register(name, email, password);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <img src="src/photo/Sidebar.png" alt="sidebar" className="w-4/5 max-w-[560px]" />
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-10 py-16 bg-white">
        <div className="w-full max-w-lg space-y-8">
          <h2 className="text-4xl font-bold text-center text-gray-800">Sign Up</h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-md text-sm">{error}</div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-5 py-4 mb-[10px] text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e1e2d]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 mb-[10px] text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e1e2d]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e1e2d]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Eye className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-right mt-1">
                Passwords must be at least 8 characters
              </p>
            </div>

            <div>
              <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700 mb-2">
                Repeat Password
              </label>
              <input
                id="repeat-password"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                className="w-full p-4 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">
                I agree with the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white text-lg font-semibold py-4 rounded-lg bg-[#1e1e2d] hover:bg-[#2a2a3d] transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#1e1e2d] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;