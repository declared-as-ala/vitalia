'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Phone, User, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm" id="public-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group" id="nav-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-900 via-brand-800 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-900/20 group-hover:scale-105 transition-transform">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-brand-900 block font-outfit">VIAITALIA</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-600 -mt-1 block">Study in Italy Agency</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 font-medium text-slate-700 text-sm">
            <Link href="/" className="hover:text-brand-600 transition-colors" id="nav-link-home">Home</Link>
            <Link href="/universities" className="hover:text-brand-600 transition-colors" id="nav-link-universities">Italian Universities</Link>
            <Link href="/testimonials" className="hover:text-brand-600 transition-colors" id="nav-link-testimonials">Student Avis</Link>
            <Link href="/about" className="hover:text-brand-600 transition-colors" id="nav-link-about">Why ViaItalia</Link>
            <Link href="/contact" className="hover:text-brand-600 transition-colors" id="nav-link-contact">Contact</Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-brand-900 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-all shadow-sm"
              id="btn-login-nav"
            >
              <User size={16} />
              <span>Portal Login</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-brand-900 hover:bg-brand-800 rounded-lg shadow-md shadow-brand-900/20 transition-all"
              id="btn-admin-nav"
            >
              <ShieldCheck size={16} />
              <span>Admin Desk</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
