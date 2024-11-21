import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Eye, EyeOff, UserIcon, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const LoginModal = ({ onClose, isOpen }: Props) => {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      onClose();
      navigate("/dashboard");
    } catch (err) {
      // Error is handled by the auth slice
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Log In</h2>
          <button
            onClick={onClose}
            data-testid="close-button"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <div className="text-red-500 text-sm">{authError}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#419DB4] hover:bg-[#419DB4]/90"
              disabled={authStatus === "loading"}
            >
              {authStatus === "loading" ? "Logging in..." : "LOG IN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
