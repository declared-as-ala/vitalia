'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StarRating } from '@/components/StarRating';
import {
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Clock,
  Euro,
  Quote,
} from 'lucide-react';

export default function HomePage() {
  const [searchDomain, setSearchDomain] = React.useState('');

  const sampleReviews = [
    {
      author: 'Yassine Khedher',
      university: 'Politecnico di Milano',
      rating: 5,
      title: 'Outstanding Guidance for Polimi Admission!',
      text: 'ViaItalia supported me through every step of my MSc application in Milan. Their deadline tracking and dossier preparation are second to none.',
    },
    {
      author: 'Sara Mansour',
      university: 'Università di Bologna',
      rating: 5,
      title: 'Stress-free Visa & University Process',
      text: 'I received my admission at Università di Bologna thanks to the amazing agents at ViaItalia. Always transparent with payments and instant receipts.',
    },
    {
      author: 'Karem Dridi',
      university: 'Politecnico di Torino',
      rating: 4,
      title: 'Professional and Reliable Agency',
      text: 'Very helpful team for Italian university procedures. Clear payment receipts and great communication throughout.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-800/40 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-800/60 border border-brand-700/60 text-brand-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles size={14} />
              <span>Your Gateway to Higher Education in Italy 🇮🇹</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-outfit leading-tight">
              Study at Italy's Top Universities with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Guaranteed Expertise</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              ViaItalia is the premier Mediterranean agency for Italian university applications, degree equivalencies, dossier preparation, and student visa approval.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/universities"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 transition-all"
                id="btn-hero-explore-unis"
              >
                <Search size={18} />
                <span>Search Italian Programs</span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 backdrop-blur-sm transition-all"
                id="btn-hero-client-portal"
              >
                <span>Access Student Portal</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick Domain Search Widget */}
            <div className="pt-6 border-t border-slate-800/80 max-w-xl">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-outfit">
                Quick Search Italian Programs by Domain
              </label>
              <form action="/universities" className="flex gap-2">
                <input
                  type="text"
                  name="domain"
                  placeholder="e.g. Computer Science, Artificial Intelligence, Business..."
                  className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  id="hero-search-input"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-bold transition-all"
                  id="hero-search-submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl text-white space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-bold text-lg font-outfit">Why Choose ViaItalia?</h3>
                  <p className="text-xs text-slate-300">Italy-Only Dedicated Agency Standard</p>
                </div>
                <ShieldCheck size={28} className="text-emerald-400" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white font-outfit">Real-Time University Deadline Scraping</h4>
                    <p className="text-xs text-slate-300">Automated tracking of opening dates, deadlines, application fees, and official links.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white font-outfit">Instant Payment Receipts</h4>
                    <p className="text-xs text-slate-300">Transparent financial management with A4 printable PDF receipts issued upon payment.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white font-outfit">End-to-End Visa & Pre-Enrollment</h4>
                    <p className="text-xs text-slate-300">Universitaly registration, embassy appointment booking, and document translation support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-3xl font-extrabold text-brand-900 font-outfit">4.9 / 5.0</div>
            <div className="flex justify-center my-1"><StarRating rating={5} size={14} /></div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Based on Verified Reviews</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-3xl font-extrabold text-brand-900 font-outfit">98.5%</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-2">Visa Approval Rate</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-3xl font-extrabold text-brand-900 font-outfit">45+</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-2">Italian Universities Tracked</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-3xl font-extrabold text-brand-900 font-outfit">1,200+</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-2">Students Enrolled</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 font-outfit">Your 4-Step Journey to Italian University Admission</h2>
          <p className="text-slate-600 mt-3 text-sm">We handle the complex Italian university bureaucratic pipeline so you can focus on your studies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center font-bold text-lg font-outfit mb-4">01</div>
            <h3 className="font-bold text-slate-900 font-outfit text-base mb-2">Domain & Program Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Search Italian programs by your field of interest, degree level (Bachelor/Master/PhD), and English-taught criteria.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center font-bold text-lg font-outfit mb-4">02</div>
            <h3 className="font-bold text-slate-900 font-outfit text-base mb-2">Dossier Preparation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Upload passports, diplomas, and transcripts into your private Client Portal for translation and verification.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center font-bold text-lg font-outfit mb-4">03</div>
            <h3 className="font-bold text-slate-900 font-outfit text-base mb-2">Application & Pre-Enrollment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Our agents submit official university portal applications before closing deadlines and complete Universitaly pre-enrollment.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center font-bold text-lg font-outfit mb-4">04</div>
            <h3 className="font-bold text-slate-900 font-outfit text-base mb-2">Visa & Receipt Transparency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Receive instant payment receipts (`REC-YYYY-XXXX`) and full assistance for your embassy student visa appointment.</p>
          </div>
        </div>
      </section>

      {/* Featured Italian Universities */}
      <section className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 font-outfit">Tracked Italian Universities</h2>
              <p className="text-xs text-slate-600 mt-1">Real-time deadline tracking from official Italian education sources</p>
            </div>
            <Link href="/universities" className="text-sm font-bold text-brand-800 hover:text-brand-900 flex items-center space-x-1">
              <span>View All Italian Programs</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-2.5 py-1 rounded-full">Milano, Lombardia</span>
                  <h3 className="font-bold text-slate-900 font-outfit text-lg mt-2">Politecnico di Milano</h3>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-700">MSc Computer Science and Engineering</p>
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between"><span>Degree Level:</span> <span className="font-bold">Master</span></div>
                <div className="flex justify-between"><span>Application Fee:</span> <span className="font-bold">€50.00</span></div>
                <div className="flex justify-between text-emerald-800"><span>Status:</span> <span className="font-bold">OPEN</span></div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-2.5 py-1 rounded-full">Bologna, Emilia-Romagna</span>
                  <h3 className="font-bold text-slate-900 font-outfit text-lg mt-2">Università di Bologna</h3>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-700">MSc Artificial Intelligence</p>
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between"><span>Degree Level:</span> <span className="font-bold">Master</span></div>
                <div className="flex justify-between"><span>Application Fee:</span> <span className="font-bold">€30.00</span></div>
                <div className="flex justify-between text-emerald-800"><span>Status:</span> <span className="font-bold">OPEN</span></div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-2.5 py-1 rounded-full">Torino, Piemonte</span>
                  <h3 className="font-bold text-slate-900 font-outfit text-lg mt-2">Politecnico di Torino</h3>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-700">BSc Automotive Engineering</p>
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between"><span>Degree Level:</span> <span className="font-bold">Bachelor</span></div>
                <div className="flex justify-between"><span>Application Fee:</span> <span className="font-bold">€40.00</span></div>
                <div className="flex justify-between text-emerald-800"><span>Status:</span> <span className="font-bold">OPEN</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Reviews & Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Quote size={16} />
            <span>Student Avis & Testimonials</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-outfit">What Our Enrolled Students Say</h2>
          <div className="flex justify-center items-center space-x-2 mt-3">
            <StarRating rating={5} size={18} />
            <span className="text-sm font-bold text-slate-700">4.9 / 5.0 Average Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleReviews.map((rev, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <StarRating rating={rev.rating} size={16} />
                <h3 className="font-bold text-slate-900 font-outfit text-base mt-3">{rev.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2 italic">"{rev.text}"</p>
              </div>
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-xs">{rev.author}</div>
                  <div className="text-[11px] text-brand-800 font-medium">{rev.university}</div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">Verified Student</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
