'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800" id="public-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white font-outfit">VIAITALIA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leading Mediterranean educational agency specializing exclusively in Italian higher education admissions, visa guidance, and dossier management.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-outfit">Official Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/universities" className="hover:text-brand-500 transition-colors">Italy Universities Tracker</Link></li>
              <li><Link href="/testimonials" className="hover:text-brand-500 transition-colors">Client Reviews & Avis</Link></li>
              <li><Link href="/login" className="hover:text-brand-500 transition-colors">Client Portal</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-brand-500 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-outfit">Legal & Terms</h4>
            <p className="text-[11px] text-slate-400 italic leading-relaxed border-l-2 border-amber-600 pl-3">
              "Le montant versé est non remboursable, quels que soient les résultats ou décisions des organismes concernés."
            </p>
            <p className="text-xs text-slate-500 mt-3">
              VIAITALIA © 2026. All rights reserved. Strict Italy-only Higher Education Guidance.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-outfit">Contact Agency</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2"><MapPin size={14} className="text-brand-500" /><span>Tunis & Milan Offices</span></div>
              <div className="flex items-center space-x-2"><Phone size={14} className="text-brand-500" /><span>+216 71 000 000</span></div>
              <div className="flex items-center space-x-2"><Mail size={14} className="text-brand-500" /><span>contact@viaitalia.tn</span></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
