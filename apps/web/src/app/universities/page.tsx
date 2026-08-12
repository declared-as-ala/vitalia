'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Search, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export default function PublicUniversitiesPage() {
  const [domain, setDomain] = useState('');
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (domain) queryParams.append('search', domain);

        const res = await fetch(`http://localhost:4000/api/v1/universities/search?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setPrograms(data.data || []);
        }
      } catch (err) {
        console.warn('Backend API connection check failed, displaying database state.');
      }
    };

    fetchPrograms();
  }, [domain]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-800 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>Official Italian Higher Education Sources</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit">Italian Universities & Study Programs</h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Explore opening dates, application deadlines, registration fees, and official admission links for top-ranked Italian public universities.
          </p>

          <div className="max-w-2xl mx-auto pt-6">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Search by study field (e.g. Computer Science, Artificial Intelligence, Business)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                id="public-uni-search-input"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-brand-800">
                  <MapPin size={14} />
                  <span>{p.universityCity}, Italy</span>
                </div>
                <h3 className="font-bold text-slate-900 font-outfit text-lg mt-1">{p.universityName}</h3>
                <p className="text-sm font-semibold text-emerald-800 mt-2">{p.programName}</p>
                <p className="text-xs text-slate-500">{p.degreeLevel} • {p.studyDomain}</p>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Opening Date:</span>
                  <span className="font-semibold text-slate-900">{p.openingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Closing Deadline:</span>
                  <span className="font-bold text-amber-700">{p.closingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Application Fee:</span>
                  <span className="font-extrabold text-slate-900">
                    {p.applicationFee ? `€${p.applicationFee.toFixed(2)}` : 'Not specified'}
                  </span>
                </div>

                <a
                  href={p.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full inline-flex items-center justify-center space-x-1.5 py-2 px-4 bg-brand-900 hover:bg-brand-800 text-white rounded-lg font-bold text-xs transition-all shadow-sm"
                  id={`btn-public-source-${idx}`}
                >
                  <span>Official University Portal</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
