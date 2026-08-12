'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  FolderKanban,
  Receipt,
  Euro,
  GraduationCap,
  Star,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { ReceiptDrawer } from '@/components/ReceiptDrawer';

export default function AdminDashboardPage() {
  const [isReceiptDrawerOpen, setIsReceiptDrawerOpen] = useState(false);
  const [kpis, setKpis] = useState({
    totalClients: 0,
    activeDossiers: 0,
    upcomingAppointments: 0,
    openTasks: 0,
    totalMoneyCollected: 0.0,
    receiptsThisMonth: 0,
    pendingReviews: 0,
    upcomingDeadlinesCount: 0,
  });

  const [deadlines, setDeadlines] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      const [resReports, resDeadlines] = await Promise.all([
        fetch('http://localhost:4000/api/v1/reports/dashboard'),
        fetch('http://localhost:4000/api/v1/universities/deadlines'),
      ]);

      if (resReports.ok) {
        const data = await resReports.json();
        setKpis(data.kpis);
      }

      if (resDeadlines.ok) {
        const deadlinesData = await resDeadlines.json();
        setDeadlines(deadlinesData);
      }
    } catch (err) {
      console.warn('Backend API connection check failed, using database state.');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8" id="admin-dashboard-root">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-outfit">Agency Executive Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Live metrics, financial collections, and Italian university admission deadlines</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsReceiptDrawerOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-900 hover:bg-brand-800 text-white rounded-lg font-bold text-xs shadow-md shadow-brand-900/20 transition-all"
            id="btn-add-receipt-dashboard"
          >
            <Plus size={16} />
            <span>+ Add Receipt</span>
          </button>
        </div>
      </div>

      {/* Dynamic Database KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider font-outfit">Total Money Collected</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Euro size={18} /></div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-outfit">€{kpis.totalMoneyCollected.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
            <TrendingUp size={12} />
            <span>{kpis.receiptsThisMonth} Receipts issued this month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider font-outfit">Total Clients</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Users size={18} /></div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-outfit">{kpis.totalClients}</div>
          <div className="text-[11px] text-slate-500 font-medium">Active CRM candidates</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider font-outfit">Active Dossiers</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><FolderKanban size={18} /></div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-outfit">{kpis.activeDossiers}</div>
          <div className="text-[11px] text-slate-500 font-medium">Under active university processing</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Pending Avis Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Star size={18} /></div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-outfit">{kpis.pendingReviews}</div>
          <div className="text-[11px] text-amber-700 font-medium">Awaiting admin moderation</div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upcoming Italian University Deadlines */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <GraduationCap size={20} className="text-brand-900" />
              <h3 className="font-bold text-slate-900 font-outfit text-base">Upcoming Italian University Deadlines</h3>
            </div>
            <Link href="/admin/universities" className="text-xs font-bold text-brand-800 hover:text-brand-900 flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {deadlines.length > 0 ? (
              deadlines.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-900 font-outfit">{item.programName}</div>
                    <div className="text-[11px] text-brand-800 font-medium">{item.universityName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {item.daysRemaining} days remaining
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Deadline: {item.closingDate}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500 p-4 text-center">No upcoming deadlines found in database.</div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Payments & Action Center */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Receipt size={20} className="text-brand-900" />
                <h3 className="font-bold text-slate-900 font-outfit text-base">Recent Receipts Issued</h3>
              </div>
              <Link href="/admin/finance" className="text-xs font-bold text-brand-800 hover:text-brand-900">Manage</Link>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-900">REC-2026-0001</div>
                  <div className="text-[11px] text-slate-500">Ahmed Ben Ali • Bank Transfer</div>
                </div>
                <div className="text-sm font-extrabold text-emerald-800">€450.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReceiptDrawer
        isOpen={isReceiptDrawerOpen}
        onClose={() => setIsReceiptDrawerOpen(false)}
        onReceiptCreated={() => {
          fetchDashboardData();
        }}
      />
    </div>
  );
}
