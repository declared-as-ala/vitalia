'use client';

import React from 'react';
import Link from 'next/link';
import { FolderKanban, FileText, Receipt, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8" id="client-dashboard-root">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-800/80 rounded-full text-brand-300 text-xs font-semibold">
            <ShieldCheck size={14} />
            <span>Verified Candidate • CL-2026-0001</span>
          </div>
          <h1 className="text-3xl font-extrabold font-outfit">Welcome back, Ahmed!</h1>
          <p className="text-xs text-slate-300">Your Master of Science application for Italy is under active processing.</p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/client/receipts"
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
            id="btn-client-view-receipts"
          >
            My Receipts (€450.00 Paid)
          </Link>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FolderKanban size={20} />
            </div>
            <span className="text-[10px] font-bold bg-purple-100 text-purple-900 px-2.5 py-1 rounded-full uppercase">Stage 4 of 7</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 font-outfit text-base">University Application</h3>
            <p className="text-xs text-slate-500 mt-1">Preferred: Politecnico di Milano, Università di Bologna</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full">3 Files Verified</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 font-outfit text-base">Document Vault</h3>
            <p className="text-xs text-slate-500 mt-1">Passport, Bachelor Diploma & Transcripts uploaded</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Receipt size={20} />
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full">REC-2026-0001</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 font-outfit text-base">Latest Payment Receipt</h3>
            <p className="text-xs text-slate-500 mt-1">€450.00 via Bank Transfer (01 Aug 2026)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
