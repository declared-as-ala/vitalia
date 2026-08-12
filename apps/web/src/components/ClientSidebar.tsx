'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Receipt,
  Calendar,
  Star,
  LogOut,
  UserCheck,
} from 'lucide-react';

const clientNavItems = [
  { label: 'Overview', href: '/client/dashboard', icon: LayoutDashboard },
  { label: 'My Dossier', href: '/client/dossier', icon: FolderKanban },
  { label: 'My Documents', href: '/client/documents', icon: FileText },
  { label: 'My Receipts', href: '/client/receipts', icon: Receipt },
  { label: 'Appointments', href: '/client/appointments', icon: Calendar },
  { label: 'Submit Review', href: '/client/reviews', icon: Star },
];

export const ClientSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800" id="client-sidebar">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-brand-600/30">
          <UserCheck size={22} />
        </div>
        <div>
          <span className="text-lg font-extrabold tracking-wider text-white font-outfit block">VIAITALIA</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">Client Portal</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">My Student Desk</div>
        {clientNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              id={`client-nav-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive
                  ? 'bg-brand-900/80 text-white font-semibold border-l-4 border-emerald-400 shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link
          href="/login"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 transition-all"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};
