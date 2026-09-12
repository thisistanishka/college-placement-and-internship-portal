import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, GraduationCap, Award, Calendar, BookOpen, Edit3, Check, X, ShieldCheck } from 'lucide-react';
import { coursesList } from '../data/mockData';

export function StudentProfilePage() {
  const { studentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...studentUser });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData({ ...studentUser });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>Academic Identity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Placement Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Verified academic credentials used for campus recruitment shortlisting.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Profile information updated successfully!</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-sky-100 shadow-xs overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 p-6 flex items-end">
          <div className="translate-y-8 flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-sky-700 shadow-md border-2 border-white flex items-center justify-center font-extrabold text-xl">
              {studentUser.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <div className="text-white pb-1">
              <h2 className="text-xl font-bold tracking-tight">{studentUser.name}</h2>
              <p className="text-xs text-sky-100">ID: {studentUser.studentId}</p>
            </div>
          </div>
        </div>

        {/* Form / View Section */}
        <div className="pt-12 p-6 sm:p-8">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>

                {/* Student ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course / Degree
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                  >
                    {coursesList.filter(c => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Year
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                {/* CGPA */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cumulative CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>

                {/* Graduation Year */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Graduation Year
                  </label>
                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Field Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {/* 1. Name */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Student Full Name
                  </div>
                  <div className="text-sm font-bold text-slate-900">{studentUser.name}</div>
                </div>

                {/* 2. Student ID */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Student ID / Roll No.
                  </div>
                  <div className="text-sm font-bold text-slate-900">{studentUser.studentId}</div>
                </div>

                {/* 3. Course */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Degree Program
                  </div>
                  <div className="text-sm font-bold text-sky-700">{studentUser.course}</div>
                </div>

                {/* 4. Department */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Department
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{studentUser.department}</div>
                </div>

                {/* 5. Year */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Current Year & Sem
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {studentUser.year} • {studentUser.semester || '6th Semester'}
                  </div>
                </div>

                {/* 6. CGPA */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Cumulative CGPA
                  </div>
                  <div className="text-sm font-extrabold text-emerald-700">
                    {studentUser.cgpa} / 10.0
                  </div>
                </div>

                {/* 7. Email */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Email Address
                  </div>
                  <div className="text-sm font-semibold text-slate-900 truncate">{studentUser.email}</div>
                </div>

                {/* 8. Phone */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Phone Number
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{studentUser.phone}</div>
                </div>

                {/* 9. Graduation Year */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Graduation Year
                  </div>
                  <div className="text-sm font-bold text-slate-900">{studentUser.graduationYear}</div>
                </div>
              </div>

              {/* Status Verification */}
              <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/70 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-sky-900 font-medium">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Verified TPO Status: Eligible for Campus Placement Drives 2025-26</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Approved
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProfilePage;
