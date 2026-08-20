import { useEffect, useState } from 'react'

const activity = [
  ['10:42 AM', 'New issue registered', 'Ward 07, Bhagalpur', '✦', 'bg-brand-50 text-brand-600'],
  ['10:37 AM', 'Issue #12821 resolved', 'Ward 03, Sabour', '✓', 'bg-success-50 text-success-600'],
  ['10:31 AM', 'New user added', 'Ward 11, Nathnagar', '+', 'bg-analytics-50 text-analytics-600'],
  ['10:22 AM', 'Issue marked high priority', 'Ward 08, Sabour', '!', 'bg-danger-50 text-danger-600'],
  ['10:15 AM', 'Ward health report generated', 'Ward 14, Darbhanga', '▥', 'bg-warning-50 text-warning-600'],
  ['10:08 AM', 'Complaint escalated', 'Ward 02, Patna', '⚠', 'bg-saffron-50 text-saffron-600'],
]

const stats = [
  ['Total Users', '1,24,680', '+8.2%', 'Registered citizens', 'brand', '♙'],
  ['Issues Registered', '8,421', '+18.4%', 'All time reports', 'success', '▤'],
  ['Pending Issues', '2,500', '−4.7%', 'Awaiting resolution', 'saffron', '◷'],
  ['Resolution Rate', '70.3%', '+2.1%', 'This quarter', 'danger', '◎'],
]

const districts = [
  ['Bhagalpur', 47, 100, 'bg-brand-500'], ['Patna', 39, 83, 'bg-analytics-500'],
  ['Muzaffarpur', 31, 66, 'bg-info-500'], ['Gaya', 24, 51, 'bg-success-500'], ['Darbhanga', 18, 38, 'bg-warning-500'],
]

const priorities = [
  ['184', 'Issues registered today', 'bg-danger-50 text-danger-600', '●'],
  ['37', 'Issues pending over 7 days', 'bg-warning-50 text-warning-600', '●'],
  ['12', 'Wards with complaint spike', 'bg-saffron-50 text-saffron-600', '●'],
  ['8', 'Wards with zero activity', 'bg-slate-100 text-slate-500', '●'],
  ['23', 'Issues missing information', 'bg-brand-50 text-brand-600', '●'],
]

const wards = [
  ['Ward 07 · Sabour', 82, 'from-success-400 to-success-500'], ['Ward 12 · Nathnagar', 61, 'from-warning-400 to-warning-500'],
  ['Ward 03 · Sultanganj', 91, 'from-success-400 to-geography-500'], ['Ward 09 · Gaya', 45, 'from-danger-400 to-danger-500'], ['Ward 14 · Darbhanga', 73, 'from-info-400 to-brand-500'],
]

function StatCard({ stat, index }) {
  const [label, value, change, description, tone, icon] = stat
  const edge = { brand: 'border-brand-600', success: 'border-success-500', saffron: 'border-saffron-500', danger: 'border-danger-500' }[tone]
  const iconStyle = { brand: 'bg-brand-50 text-brand-700', success: 'bg-success-50 text-success-600', saffron: 'bg-saffron-50 text-saffron-600', danger: 'bg-danger-50 text-danger-600' }[tone]
  return <div className={`metric-card animate-fade-in-up stagger-${index + 1} relative overflow-hidden rounded-2xl border border-slate-200 border-t-4 ${edge} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-400">{description}</p></div><span className={`grid h-12 w-12 place-items-center rounded-xl text-xl ${iconStyle}`}>{icon}</span></div><div className="mt-4 flex items-center gap-2"><span className={`rounded-full px-2 py-0.5 text-xs font-bold ${tone === 'saffron' ? 'bg-warning-50 text-warning-700' : 'bg-success-50 text-success-700'}`}>{change.startsWith('−') ? '↓' : '↑'} {change}</span><span className="text-xs text-slate-400">vs last month</span></div></div>
}

function BiharMap() {
  return <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-geography-100 bg-gradient-to-br from-geography-50 via-geography-50 to-info-50"><div className="absolute left-[38%] top-[8%] h-40 w-32 rotate-[20deg] rounded-[48%_52%_45%_55%] border-[10px] border-geography-200/60 bg-geography-100/40" /><div className="absolute left-[42%] top-[15%] h-28 w-20 rotate-[15deg] rounded-[50%_50%_45%_55%] border-[6px] border-geography-200/40 bg-geography-100/30" /><div className="map-dot map-dot-rose absolute left-[48%] top-[28%] h-3.5 w-3.5 rounded-full bg-danger-500 shadow-lg shadow-danger-200" /><div className="map-dot map-dot-amber absolute left-[58%] top-[42%] h-3 w-3 rounded-full bg-warning-500 shadow-lg shadow-warning-200" /><div className="map-dot map-dot-emerald absolute left-[44%] top-[52%] h-3 w-3 rounded-full bg-success-500 shadow-lg shadow-success-200" /><div className="map-dot map-dot-blue absolute left-[55%] top-[60%] h-2.5 w-2.5 rounded-full bg-info-500 shadow-lg shadow-info-200" /><svg className="absolute inset-0 h-full w-full opacity-30"><line x1="48%" y1="30%" x2="58%" y2="44%" stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" /><line x1="58%" y1="44%" x2="44%" y2="54%" stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" /><line x1="44%" y1="54%" x2="55%" y2="62%" stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" /></svg><span className="live-indicator absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-success-700 shadow-sm">Live district activity</span><span className="absolute right-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-bold text-slate-500 shadow-sm">5 active zones</span></div>
}

function DistrictList() {
  return <div className="space-y-3"><div className="mb-4 flex items-center justify-between"><h4 className="text-sm font-bold text-slate-700">Top districts</h4><span className="text-xs text-slate-400">By issue count</span></div>{districts.map(([name, count, percentage, color], index) => <div key={name} className="district-bar flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{index + 1}</span><div className="flex-1"><div className="mb-1 flex items-center justify-between"><span className="text-sm font-semibold text-slate-700">{name}</span><span className="text-xs font-bold text-slate-500">{count} issues</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`progress-bar h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} /></div></div></div>)}</div>
}

function AttentionPanel() {
  return <div className="divide-y divide-slate-50">{priorities.map(([value, label, style, icon]) => <button key={label} className="attention-item group flex w-full items-center gap-4 rounded-lg py-3.5 text-left transition hover:bg-slate-50 hover:pl-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${style}`}><span className="text-lg">{icon}</span></span><span className="flex-1"><strong className={`text-xl font-extrabold ${style.split(' ')[1]}`}>{value}</strong><span className="mt-0.5 block text-sm font-medium text-slate-600">{label}</span></span><span className="text-slate-300 transition group-hover:translate-x-1">›</span></button>)}</div>
}

function WardHealthPanel() {
  return <div className="space-y-5">{wards.map(([name, score, gradient], index) => <div key={name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}><div className="mb-2 flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-semibold text-slate-700"><i className={`h-2 w-2 rounded-full ${score >= 75 ? 'bg-success-400' : score >= 50 ? 'bg-warning-400' : 'bg-danger-400'}`} />{name}</span><span className={`text-sm font-bold ${score >= 75 ? 'text-success-600' : score >= 50 ? 'text-warning-600' : 'text-danger-600'}`}>{score}% <small className="font-normal text-slate-400">resolved</small></span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`progress-bar h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${score}%` }} /></div></div>)}<div className="mt-6 flex items-center gap-4 rounded-xl bg-slate-50 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg text-brand-600">▥</span><div className="flex-1"><p className="text-sm font-semibold text-slate-700">Average resolution: <span className="text-brand-600">70.4%</span></p><p className="mt-0.5 text-xs text-slate-400">Across all monitored wards</p></div><button className="rounded-lg border border-brand-100 bg-white px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50">View all</button></div></div>
}

function ActivityPanel() {
  return <div className="space-y-4">{activity.map(([time, title, place, icon, style], index) => <div key={time} className="animate-slide-in-right flex items-start gap-3" style={{ animationDelay: `${index * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}><span className={`activity-dot grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-sm ${style}`}>{icon}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-700">{title}</p><p className="mt-0.5 text-xs text-slate-400">{place}</p></div><time className="shrink-0 rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-400">{time}</time></div>)}<button className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50">View all activity →</button></div>
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 60000); return () => clearInterval(timer) }, [])
  return <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-brand-50/40 to-analytics-50 px-4 py-8 md:px-8 lg:px-12"><div className="mx-auto max-w-[1600px]"><div className="animate-fade-in-up flex flex-wrap items-end justify-between gap-4"><div><div className="flex items-center gap-2"><div className="h-1 w-8 rounded-full bg-gradient-to-r from-brand-500 to-analytics-500" /><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">Bihar / Dashboard</p><span className="live-indicator ml-2 rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-bold text-success-600">Live</span></div><h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">State Pulse</h2><p className="mt-2 max-w-lg text-sm text-slate-500">A live view of public issues and ground activity across Bihar. Real-time monitoring of citizen engagement.</p></div><div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm md:flex"><span className="text-slate-400">◷</span><span className="text-sm font-medium text-slate-600">{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span></div><button className="rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5">＋ Register Issue</button></div></div><section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat, index) => <StatCard key={stat[0]} stat={stat} index={index} />)}</section><div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]"><section className="panel-card animate-fade-in-up stagger-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-lg"><div className="mb-6 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">Bihar Live Pulse</h3><p className="mt-1 text-sm text-slate-500">Issue activity by district</p></div><span className="rounded-full bg-success-50 px-3 py-1 text-xs font-bold text-success-600"><span className="live-indicator">Live</span></span></div><div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]"><BiharMap /><DistrictList /></div></section><section className="panel-card animate-fade-in-up stagger-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-lg"><div className="mb-4 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">What needs attention?</h3><p className="mt-1 text-sm text-slate-500">Priorities for today</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-danger-50 text-lg text-danger-600">⚡</span></div><AttentionPanel /></section></div><div className="mt-6 grid gap-6 xl:grid-cols-2"><section className="panel-card animate-fade-in-up stagger-7 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-lg"><div className="mb-6 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">Ward Health</h3><p className="mt-1 text-sm text-slate-500">Resolution and response overview</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg text-brand-600">▥</span></div><WardHealthPanel /></section><section className="panel-card animate-fade-in-up stagger-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-lg"><div className="mb-6 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">Recent Activity</h3><p className="mt-1 text-sm text-slate-500">Across the state</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-geography-50 text-lg text-geography-600">◉</span></div><ActivityPanel /></section></div></div></div>
}
