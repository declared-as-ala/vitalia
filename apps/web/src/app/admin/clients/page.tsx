'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, Filter, FolderKanban, Receipt, ShieldCheck } from 'lucide-react';

export default function AdminClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients] = useState([
    {
      id: 'c1',
      clientNumber: 'CL-2026-0001',
      firstName: 'Ahmed',
      lastName: 'Ben Ali',
      email: 'client@viaitalia.tn',
      phone: '+216 20 123 456',
      nationality: 'Tunisian',
      countryOfResidence: 'Tunisia',
      status: 'ACTIVE',
      assignedAgentName: 'Matteo Ferrari',
      dossiersCount: 1,
      totalPaid: 450.0,
      createdAt: '2026-08-01',
    },
  ]);

  const filtered = clients.filter(
    (c) =>
      c.clientNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8" id="admin-clients-root">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-outfit">Clients CRM & Student Dossiers</h1>
          <p className="text-xs text-slate-500 mt-1">Manage student profiles, dossier stages, document vaults, and assigned agents</p>
        </div>

        <button className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-900 hover:bg-brand-800 text-white rounded-lg font-bold text-xs shadow-md transition-all" id="btn-add-client">
          <Plus size={16} />
          <span>+ Create Client Profile</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or CL number..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-600 focus:bg-white"
            id="input-search-clients"
          />
        </div>

        <div className="text-xs font-bold text-slate-500">
          Total Candidates: {filtered.length}
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="clients-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Client ID</th>
                <th className="p-4">Candidate Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Nationality</th>
                <th className="p-4">Assigned Agent</th>
                <th className="p-4">Total Paid</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-brand-900 font-mono">{c.clientNumber}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{c.firstName} {c.lastName}</div>
                    <div className="text-[10px] text-slate-400">Created: {c.createdAt}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    <div>{c.email}</div>
                    <div className="text-[10px] text-slate-400">{c.phone}</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{c.nationality}</td>
                  <td className="p-4 text-slate-700 font-semibold">{c.assignedAgentName}</td>
                  <td className="p-4 font-extrabold text-emerald-800">€{c.totalPaid.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs transition-all" id={`btn-view-client-${c.id}`}>
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
