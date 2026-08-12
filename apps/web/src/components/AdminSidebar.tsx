'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Receipt,
  GraduationCap,
  Star,
  BarChart3,
  Globe,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Clients CRM', href: '/admin/clients', icon: Users },
  { label: 'Receipts & Finance', href: '/admin/finance', icon: Receipt },
  { label: 'Italy Universities', href: '/admin/universities', icon: GraduationCap },
  { label: 'Reviews & Avis', href: '/admin/reviews', icon: Star },
  { label: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800" id="admin-sidebar">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-600/30">
          <ShieldCheck size={22} />
        </div>
        <div>
          <span className="text-lg font-extrabold tracking-wider text-white font-outfit block">VIAITALIA</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400 block">Admin Portal</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Agency Modules</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              id={`admin-nav-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive
                  ? 'bg-brand-900/80 text-white font-semibold border-l-4 border-brand-500 shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-brand-400' : 'text-slate-400'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <Globe size={16} />
          <span>View Public Site</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 transition-all"
        >
          <LogOut size={16} />
          <span>Exit Admin Session</span>
        </Link>
      </div>
    </aside>
  );
};
