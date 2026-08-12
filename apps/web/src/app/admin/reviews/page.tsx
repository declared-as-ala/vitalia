'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, XCircle, ShieldCheck, Eye, ThumbsUp } from 'lucide-react';
import { StarRating } from '@/components/StarRating';

export default function AdminReviewsPage() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [reviews, setReviews] = useState([
    {
      id: 'rev1',
      authorName: 'Yassine Khedher',
      rating: 5,
      title: 'Outstanding Guidance for Polimi Admission!',
      comment: 'ViaItalia supported me through every step of my MSc application in Milan. Their deadline tracking and dossier preparation are second to none.',
      status: 'PUBLISHED',
      isFeatured: true,
      createdAt: '2026-08-05',
    },
    {
      id: 'rev2',
      authorName: 'Sara Mansour',
      rating: 5,
      title: 'Stress-free Visa & University Process',
      comment: 'I received my admission at Università di Bologna thanks to the amazing agents at ViaItalia. Always transparent with payments and instant receipts.',
      status: 'PUBLISHED',
      isFeatured: true,
      createdAt: '2026-08-08',
    },
    {
      id: 'rev3',
      authorName: 'Mehdi Ben Amar',
      rating: 4,
      title: 'Very Helpful Team',
      comment: 'Good communication and smooth Universitaly pre-enrollment guidance.',
      status: 'PENDING',
      isFeatured: false,
      createdAt: '2026-08-11',
    },
  ]);

  const handleModerate = (id: string, newStatus: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
  };

  const handleToggleFeatured = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r)),
    );
  };

  const filtered = reviews.filter(
    (r) => statusFilter === 'ALL' || r.status === statusFilter,
  );

  return (
    <div className="space-y-8" id="admin-reviews-root">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-outfit">Student Avis & Reviews Moderation</h1>
          <p className="text-xs text-slate-500 mt-1">Moderate client testimonials before displaying on public landing page</p>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Total Submitted</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 font-outfit">{reviews.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Average Rating</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-2 font-outfit">4.9 / 5.0</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Published on Site</div>
          <div className="text-2xl font-extrabold text-emerald-800 mt-2 font-outfit">
            {reviews.filter((r) => r.status === 'PUBLISHED').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-outfit">Pending Approval</div>
          <div className="text-2xl font-extrabold text-amber-700 mt-2 font-outfit">
            {reviews.filter((r) => r.status === 'PENDING').length}
          </div>
        </div>
      </div>

      {/* Reviews Moderation Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Avis Moderation Queue</div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
            id="select-review-status-filter"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending Only</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="REJECTED">Rejected Only</option>
          </select>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((r) => (
            <div key={r.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-slate-900 text-sm font-outfit">{r.authorName}</span>
                  <StarRating rating={r.rating} size={14} />
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      r.status === 'PUBLISHED'
                        ? 'bg-emerald-100 text-emerald-900'
                        : r.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-red-100 text-red-900'
                    }`}
                  >
                    {r.status}
                  </span>
                  {r.isFeatured && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Featured</span>
                  )}
                </div>
                <h4 className="font-bold text-slate-800 text-xs">{r.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">"{r.comment}"</p>
                <div className="text-[10px] text-slate-400">Submitted on {r.createdAt}</div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {r.status !== 'PUBLISHED' && (
                  <button
                    onClick={() => handleModerate(r.id, 'PUBLISHED')}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all"
                    id={`btn-approve-review-${r.id}`}
                  >
                    <CheckCircle size={14} />
                    <span>Approve</span>
                  </button>
                )}

                {r.status !== 'REJECTED' && (
                  <button
                    onClick={() => handleModerate(r.id, 'REJECTED')}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-lg text-xs transition-all"
                    id={`btn-reject-review-${r.id}`}
                  >
                    <XCircle size={14} />
                    <span>Reject</span>
                  </button>
                )}

                <button
                  onClick={() => handleToggleFeatured(r.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    r.isFeatured
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                  id={`btn-feature-review-${r.id}`}
                >
                  {r.isFeatured ? '★ Featured' : '☆ Make Featured'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
