import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "../../firebase/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <img src="src/photo/Sidebar.png" alt="sidebar" className="w-4/5 max-w-[560px]" />
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-10 py-16 bg-white">
        <div className="w-full max-w-lg space-y-8">
          <h2 className="text-4xl font-bold text-center text-gray-800">Login</h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
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
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e1e2d]"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white text-lg font-semibold  py-4 rounded-lg bg-[#1e1e2d] hover:bg-[#2a2a3d] transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-center text-base text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-[#1e1e2d] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
