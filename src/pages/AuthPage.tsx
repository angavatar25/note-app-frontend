import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useLogin, useRegister } from '../hooks/useAuth';
import Toast from '../components/Toast';
import classNames from 'classnames';

// Types
interface LoginForm {
  email: string;
  passwords: string;
  rememberMe: boolean;
}

interface SignupForm {
  fullName: string;
  email: string;
  passwords: string;
}

const AuthPage: React.FC = () => {
  const login = useLogin();
  const register = useRegister();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    passwords: '',
    rememberMe: false,
  });

  const [signupForm, setSignupForm] = useState<SignupForm>({
    fullName: '',
    email: '',
    passwords: '',
  });

  const isFormValid = (form: LoginForm | SignupForm) => {
    return Object.values(form).every(value => value.trim() !== '');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, passwords } = loginForm;

    login.mutate(
      { email, passwords },
      {
        onError: (error) => {
          showToast(error.message, 'error');
        }
      }
    )
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid(signupForm)) return;

    const { fullName, email, passwords } = signupForm;

    register.mutate(
      { name: fullName, email, passwords },
      {
        onSuccess: () => {
          showToast('Registration successful! Please log in.', 'success');
          setIsLogin(true);
          setSignupForm({ fullName: '', email: '', passwords: '' });
        },
        onError: (error) => {
          showToast(error.message, 'error');
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className="text-gray-500">
              {isLogin ? "Welcome back, you've been missed!" : 'Create your account to get started'}
            </p>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="ahmed@gmail.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="passwords"
                    value={loginForm.passwords}
                    onChange={handleLoginChange}
                    placeholder="hwahmed07"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={classNames({
                  'w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/30': true,
                  'opacity-50 cursor-not-allowed': !isFormValid(loginForm),
                })}
              >
                Sign In
              </button>
            </form>
          ) : (
            /* Signup Form */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={signupForm.fullName}
                    onChange={handleSignupChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="passwords"
                    value={signupForm.passwords}
                    onChange={handleSignupChange}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={classNames({
                  'w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/30 mt-6': true,
                  'opacity-50 cursor-not-allowed': !isFormValid(signupForm),
                })}
              >
                Sign Up
              </button>
            </form>
          )}

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">
              {isLogin ? "You haven't any account? " : 'Already have an account? '}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;