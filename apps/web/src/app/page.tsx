import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  FileCheck,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
  Receipt,
  Search,
  Star,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-800/80 border border-brand-700/60 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse" />
            <span>Official Italian Application Guidance Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-outfit tracking-tight max-w-4xl leading-tight">
            Your Gateway to Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">Italian Public Universities</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed">
            End-to-end management for university applications, pre-enrollment procedures, visa dossiers, and guaranteed non-refundable payment receipts. Trusted by international students applying to top Italian public universities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center max-w-md">
            <Link
              href="/universities"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
              id="btn-hero-explore-unis"
            >
              <Search size={18} />
              <span>Explore Italian Universities</span>
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm rounded-xl transition-all"
              id="btn-hero-client-portal"
            >
              <span>Access Client Desk</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stats bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-slate-800">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">100%</div>
              <div className="text-xs text-slate-400 font-semibold">Italian Public Universities</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-outfit">€0</div>
              <div className="text-xs text-slate-400 font-semibold">Hidden Agency Fees</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-outfit">4.9 / 5</div>
              <div className="text-xs text-slate-400 font-semibold">Verified Student Avis</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-outfit">REC-2026</div>
              <div className="text-xs text-slate-400 font-semibold">Sequential PDF Receipts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-800">Complete Agency Workflow</div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-outfit">Everything Needed for Studying in Italy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-outfit">University Application Monitoring</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time deadline tracking for Politecnico di Milano, Università di Bologna, Politecnico di Torino, and public Italian faculties.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-outfit">Pre-Enrollment & Visa Dossiers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Step-by-step guidance for Universitaly pre-enrollment portal, legal translations, DICHIARAZIONE DI VALORE, and embassy visa appointments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Receipt size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-outfit">Official Payment Receipts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant generation of sequential PDF payment receipts (`REC-2026-XXXX`) with full legal non-refundable disclaimers and client transparency.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
