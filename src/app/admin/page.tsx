"use client";

import { Users, FileText, Activity, Settings, BarChart, Search, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex h-[calc(100vh-5rem)] bg-slate-50 dark:bg-slate-900 border-t border-border mt-20">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-950 border-r border-border p-4 flex flex-col h-full overflow-y-auto">
        <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4 px-3">Admin Panel</div>
        <nav className="flex-1 space-y-1.5">
          <SidebarItem icon={<BarChart className="w-5 h-5" />} label="Overview" active />
          <SidebarItem icon={<Users className="w-5 h-5" />} label="Users" />
          <SidebarItem icon={<FileText className="w-5 h-5" />} label="Uploaded PDFs" />
          <SidebarItem icon={<Activity className="w-5 h-5" />} label="System Analytics" />
          <SidebarItem icon={<AlertCircle className="w-5 h-5" />} label="Reports" />
        </nav>
        <div className="mt-auto pt-4 border-t border-border">
          <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Platform Overview</h1>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
            <input type="text" placeholder="Search users, tests..." className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm outline-none w-64" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <AdminStatCard title="Total Users" value="12,450" trend="+14% this week" />
          <AdminStatCard title="Tests Generated" value="45.2K" trend="+22% this week" />
          <AdminStatCard title="PDFs Processed" value="8,904" trend="+5% this week" />
          <AdminStatCard title="Active Subscriptions" value="1,240" trend="+8% this week" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white dark:bg-slate-950 border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold mb-4">Recent Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-foreground/60 uppercase bg-slate-50 dark:bg-slate-900 border-y border-border">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Tests Generated</th>
                    <th className="px-4 py-3">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <UserRow name="Alice Smith" email="alice@example.com" plan="Pro" tests={45} date="Today" />
                  <UserRow name="Bob Johnson" email="bob@example.com" plan="Free" tests={3} date="Yesterday" />
                  <UserRow name="Charlie Davis" email="charlie@example.com" plan="Premium" tests={120} date="3 days ago" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950 border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold mb-4">System Status</h3>
            <div className="space-y-4">
              <StatusRow label="AI Token Usage" value="85%" color="bg-amber-500" />
              <StatusRow label="OCR Processing Queue" value="12 docs" color="bg-emerald-500" />
              <StatusRow label="Database Storage" value="45%" color="bg-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <Link href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
      {icon} {label}
    </Link>
  );
}

function AdminStatCard({ title, value, trend }: any) {
  return (
    <div className="bg-white dark:bg-slate-950 border border-border p-5 rounded-xl shadow-sm">
      <div className="text-sm font-medium text-foreground/60 mb-1">{title}</div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="text-xs text-emerald-500 font-medium">{trend}</div>
    </div>
  );
}

function UserRow({ name, email, plan, tests, date }: any) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
      <td className="px-4 py-3">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-foreground/50">{email}</div>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded text-xs font-bold ${plan === 'Free' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' : 'bg-primary/10 text-primary'}`}>
          {plan}
        </span>
      </td>
      <td className="px-4 py-3 font-medium">{tests}</td>
      <td className="px-4 py-3 text-foreground/60">{date}</td>
    </tr>
  );
}

function StatusRow({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium mb-1.5">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: value.includes('%') ? value : '30%' }}></div>
      </div>
    </div>
  );
}
