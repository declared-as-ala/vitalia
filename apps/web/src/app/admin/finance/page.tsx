'use client';

import React, { useState, useEffect } from 'react';
import { Receipt, Plus, Search, Filter, Printer, CheckCircle2 } from 'lucide-react';
import { ReceiptDrawer } from '@/components/ReceiptDrawer';

export default function AdminFinancePage() {
  const [isReceiptDrawerOpen, setIsReceiptDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');

  const [stats, setStats] = useState({
    totalReceiptsCount: 1,
    totalCollected: 450.0,
    receiptsThisMonth: 1,
    cashTotal: 0.0,
    bankTransferTotal: 450.0,
  });

  const [receipts, setReceipts] = useState<any[]>([]);

  const fetchFinanceData = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('search', searchTerm);
      if (methodFilter !== 'ALL') queryParams.append('paymentMethod', methodFilter);

      const [resReceipts, resStats] = await Promise.all([
        fetch(`http://localhost:4000/api/v1/finance/receipts?${queryParams.toString()}`),
        fetch('http://localhost:4000/api/v1/finance/stats'),
      ]);

      if (resReceipts.ok) {
        const data = await resReceipts.json();
        setReceipts(data.data || []);
      }

      if (resStats.ok) {
        const statsData = await resStats.json();
        setStats(statsData);
      }
    } catch (err) {
      console.warn('Backend API connection check failed, using database state.');
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, [searchTerm, methodFilter]);

  return (
    <div className="space-y-8" id="admin-finance-root">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-outfit">Receipts Management</h1>
          <p className="text-xs text-slate-500 mt-1">Manage official client payment receipts and printable disclaimers</p>
        </div>

        <button
          onClick={() => setIsReceiptDrawerOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-900 hover:bg-brand-800 text-white rounded-lg font-bold text-xs shadow-md shadow-brand-900/20 transition-all"
          id="btn-add-receipt"
        >
          <Plus size={16} />
          <span>+ Add Receipt</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Total Receipts</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 font-outfit">{stats.totalReceiptsCount}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Total Amount Paid</div>
          <div className="text-2xl font-extrabold text-emerald-800 mt-2 font-outfit">€{stats.totalCollected.toFixed(2)}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Issued This Month</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 font-outfit">{stats.receiptsThisMonth}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Average Receipt</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 font-outfit">
            €{stats.totalReceiptsCount > 0 ? (stats.totalCollected / stats.totalReceiptsCount).toFixed(2) : '0.00'}
          </div>
        </div>
      </div>

      {/* Rule Notification Banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center space-x-3">
        <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
        <span>
          <strong>Receipt Business Rule:</strong> A receipt is generated ONLY AFTER payment has been received. Receipts have no unpaid/pending statuses. Server-side sequential IDs (`REC-YYYY-XXXX`).
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Client or Receipt ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-600 focus:bg-white"
            id="input-search-receipts"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Filter size={16} className="text-slate-400" />
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
            id="select-method-filter"
          >
            <option value="ALL">All Payment Methods</option>
            <option value="BANK_TRANSFER">Bank Transfer (Virement)</option>
            <option value="CASH">Cash (Espèce)</option>
          </select>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="receipts-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Receipt ID</th>
                <th className="p-4">Client</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Payment Date</th>
                <th className="p-4">Created By</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {receipts.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-brand-900 font-mono">{r.receiptNumber}</td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{r.clientName}</div>
                    <div className="text-[10px] text-slate-400">{r.clientNumber}</div>
                  </td>
                  <td className="p-4 font-extrabold text-emerald-800">€{r.amount.toFixed(2)} {r.currency}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {r.paymentMethod === 'BANK_TRANSFER' ? 'Virement (Bank Transfer)' : 'Espèce (Cash)'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{r.paymentDate}</td>
                  <td className="p-4 text-slate-600">{r.createdByName}</td>
                  <td className="p-4 text-right space-x-2">
                    <a
                      href={`http://localhost:4000/api/v1/finance/receipts/${r.id}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-[11px] transition-all"
                      id={`btn-print-pdf-${r.receiptNumber}`}
                    >
                      <Printer size={14} />
                      <span>Print A4 PDF</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReceiptDrawer
        isOpen={isReceiptDrawerOpen}
        onClose={() => setIsReceiptDrawerOpen(false)}
        onReceiptCreated={() => {
          fetchFinanceData();
        }}
      />
    </div>
  );
}
