'use client';

import React, { useState } from 'react';
import { X, Receipt, CheckCircle, AlertCircle } from 'lucide-react';

interface ReceiptDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReceiptCreated: () => void;
}

export const ReceiptDrawer: React.FC<ReceiptDrawerProps> = ({ isOpen, onClose, onReceiptCreated }) => {
  const [clientId, setClientId] = useState('c0a80101-0000-0000-0000-000000000001'); // Default test client ID
  const [clientSearch, setClientSearch] = useState('Ahmed Ben Ali (CL-2026-0001)');
  const [amount, setAmount] = useState<number | ''>(450);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'BANK_TRANSFER'>('BANK_TRANSFER');
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!amount || Number(amount) <= 0) {
      setError('Receipt amount must be a positive number');
      return;
    }

    setLoading(true);

    try {
      // API request simulation / integration endpoint
      const response = await fetch('http://localhost:4000/api/v1/finance/receipts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          amount: Number(amount),
          paymentMethod,
          paymentDate,
          notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to generate payment receipt');
      }

      const created = await response.json();
      setSuccessMsg(`Receipt ${created.receiptNumber} successfully created!`);
      setTimeout(() => {
        onReceiptCreated();
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Error communicating with backend API. Ensure server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end" id="receipt-drawer-backdrop">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          <div className="p-6 bg-brand-900 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-brand-800 flex items-center justify-center text-brand-300 border border-brand-700">
                <Receipt size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg font-outfit">Issue Payment Receipt</h3>
                <p className="text-xs text-brand-200">Generate official proof of received payment</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-brand-200 hover:text-white transition-colors"
              id="btn-close-receipt-drawer"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5" id="form-add-receipt">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-start space-x-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-start space-x-2">
                <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Client (Searchable Selector) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-600 focus:bg-white transition-all"
                placeholder="Type client name or CL number..."
                required
                id="input-receipt-client"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Amount Paid (€ EUR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-600 focus:bg-white transition-all"
                placeholder="450.00"
                required
                id="input-receipt-amount"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CASH')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                    paymentMethod === 'CASH'
                      ? 'bg-brand-50 border-brand-600 text-brand-900 ring-1 ring-brand-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  id="btn-method-cash"
                >
                  Espèce (Cash)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('BANK_TRANSFER')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                    paymentMethod === 'BANK_TRANSFER'
                      ? 'bg-brand-50 border-brand-600 text-brand-900 ring-1 ring-brand-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  id="btn-method-transfer"
                >
                  Virement (Transfer)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Payment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-600 focus:bg-white transition-all"
                required
                id="input-receipt-date"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Notes / Reference
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-brand-600 focus:bg-white transition-all"
                placeholder="e.g. Installment 1 for Polimi application package"
                id="input-receipt-notes"
              />
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 leading-snug font-medium">
              ⚖️ Notice: Created receipts strictly represent money already paid. Includes non-refundable legal disclaimer on A4 PDF export.
            </div>

            <div className="pt-4 flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 px-4 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                id="btn-cancel-receipt"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-brand-900 hover:bg-brand-800 shadow-md shadow-brand-900/20 transition-all disabled:opacity-50"
                id="btn-create-receipt-submit"
              >
                {loading ? 'Creating...' : 'Create Receipt'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
