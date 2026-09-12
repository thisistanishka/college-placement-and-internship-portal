import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function StudentLoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginStudent } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your Email or Student ID.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    loginStudent(identifier, password);
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    setIdentifier('STU2023089');
    setPassword('student@123');
    loginStudent('STU2023089', 'student@123');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-sky-50/40">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Student Portal Login
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Access your college placement dashboard and apply for opportunities.
            </p>
          </div>

          {/* Quick Demo Fill Alert for Viva presentation */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 mb-5 flex items-center justify-between">
            <div className="text-xs text-sky-800">
              <span className="font-bold block">Quick Demo Login:</span>
              <span className="text-[11px] text-sky-600">Click to instantly test student view</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 px-3 py-1.5 rounded shadow-xs transition"
            >
              1-Click Login
            </button>
          </div>

          {error && (
            <div className="p-3 mb-4 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address or Student ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. STU2023089 or student@college.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your registered college email.')}
                  className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 transition"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Login to Student Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Footer Register Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-sky-600 hover:text-sky-700 text-decoration-none">
                Register Here
              </Link>
            </p>
            <div className="mt-2 text-[11px] text-slate-400">
              Placement Cell Officer?{' '}
              <Link to="/admin-login" className="font-semibold text-slate-600 hover:text-sky-600 text-decoration-none">
                Go to Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLoginPage;
