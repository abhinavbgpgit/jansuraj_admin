import { useMemo, useState } from 'react'

const users = [
  { name: 'Rahul Kumar', initials: 'RK', phone: '98123 45678', location: 'Ward 07, Bhagalpur', issues: 12, joined: '20 Aug 2026', status: 'Active', color: 'text-brand-700' },
  { name: 'Anita Devi', initials: 'AD', phone: '98765 10234', location: 'Ward 03, Sabour', issues: 8, joined: '19 Aug 2026', status: 'Active', color: 'text-analytics-600' },
  { name: 'Mohan Singh', initials: 'MS', phone: '91234 56789', location: 'Ward 11, Nathnagar', issues: 3, joined: '18 Aug 2026', status: 'Review', color: 'text-warning-600' },
  { name: 'Priya Kumari', initials: 'PK', phone: '99887 66554', location: 'Ward 02, Patna', issues: 6, joined: '17 Aug 2026', status: 'Active', color: 'text-success-600' },
  { name: 'Suresh Paswan', initials: 'SP', phone: '90012 34567', location: 'Ward 09, Gaya', issues: 0, joined: '16 Aug 2026', status: 'Inactive', color: 'text-slate-500' },
  { name: 'Kavita Sharma', initials: 'KS', phone: '98456 78901', location: 'Ward 05, Muzaffarpur', issues: 15, joined: '15 Aug 2026', status: 'Active', color: 'text-pink-600' },
  { name: 'Vikram Yadav', initials: 'VY', phone: '97567 89012', location: 'Ward 14, Darbhanga', issues: 4, joined: '14 Aug 2026', status: 'Review', color: 'text-info-600' },
]

const metrics = [
  { label: 'Total Users', value: '1,24,680', change: '+8.2%', description: 'Registered citizens', tone: 'brand', icon: '♙' },
  { label: 'Active This Month', value: '82,410', change: '+12.6%', description: 'Engaged users', tone: 'saffron', icon: '⚡' },
  { label: 'New Registrations', value: '4,286', change: '+18.4%', description: 'This week', tone: 'success', icon: '↗' },
  { label: 'Incomplete Profiles', value: '928', change: '−3.4%', description: 'Need attention', tone: 'slate', icon: '▤' },
]

const filters = ['All users', 'Active', 'Review', 'Inactive']

function StatusBadge({ status }) {
  const styles = {
    Active: 'border-success-200 bg-success-50 text-success-700',
    Review: 'border-warning-200 bg-warning-50 text-warning-700',
    Inactive: 'border-slate-200 bg-slate-50 text-slate-500',
  }
  const dot = status === 'Active' ? 'active bg-success-500' : status === 'Review' ? 'review bg-warning-500' : 'bg-slate-400'
  return <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}><span className={`status-dot relative h-2 w-2 rounded-full ${dot}`} />{status}</span>
}

function MetricCard({ metric, index }) {
  const border = metric.tone === 'saffron' ? 'border-saffron-500' : metric.tone === 'success' ? 'border-success-500' : metric.tone === 'slate' ? 'border-slate-500' : 'border-brand-600'
  const icon = metric.tone === 'saffron' ? 'bg-saffron-50 text-saffron-600' : metric.tone === 'success' ? 'bg-success-50 text-success-600' : metric.tone === 'slate' ? 'bg-slate-100 text-slate-600' : 'bg-brand-50 text-brand-700'
  return <div className={`animate-fade-in-up stagger-${index + 1} relative overflow-hidden rounded-2xl border border-slate-200 border-t-4 ${border} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{metric.label}</p><p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{metric.value}</p><p className="mt-1 text-xs text-slate-400">{metric.description}</p></div><span className={`grid h-12 w-12 place-items-center rounded-xl text-xl ${icon}`}>{metric.icon}</span></div><div className="mt-4 flex items-center gap-2"><span className={`rounded-full px-2 py-0.5 text-xs font-bold ${metric.tone === 'slate' ? 'bg-success-50 text-success-700' : metric.tone === 'saffron' ? 'bg-saffron-50 text-saffron-700' : 'bg-success-50 text-success-700'}`}>{metric.change.startsWith('−') ? '↓' : '↑'} {metric.change}</span><span className="text-xs text-slate-400">vs last month</span></div></div>
}

function UserRow({ user, index }) {
  return <tr className="animate-fade-in border-b border-slate-50 opacity-0 transition hover:bg-brand-50/50" style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="rounded-full bg-gradient-to-br from-brand-600 to-analytics-600 p-0.5"><span className={`grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-bold ${user.color}`}>{user.initials}</span></div><div><p className="font-semibold text-slate-800">{user.name}</p><p className="text-xs text-slate-400">ID: BHP-{String(1000 + index).padStart(4, '0')}</p></div></div></td><td className="px-6 py-4 text-slate-600">☎ {user.phone}</td><td className="px-6 py-4 text-slate-600">⌖ {user.location}</td><td className="px-6 py-4"><span className="rounded-lg bg-slate-100 px-2 py-1 text-sm font-bold text-slate-700">{user.issues}</span><span className="ml-2 text-xs text-slate-400">reported</span></td><td className="px-6 py-4 text-sm text-slate-500">{user.joined}</td><td className="px-6 py-4"><StatusBadge status={user.status} /></td><td className="px-6 py-4 text-right text-slate-400">•••</td></tr>
}

export default function Users() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All users')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredUsers = useMemo(() => users.filter((user) => {
    const matchesQuery = `${user.name} ${user.phone} ${user.location}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (status === 'All users' || user.status === status)
  }), [query, status])

  const clearFilters = () => { setQuery(''); setStatus('All users') }

  return <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-brand-50/40 to-analytics-50 px-4 py-8 md:px-8 lg:px-12"><div className="mx-auto max-w-[1600px]"><div className="animate-fade-in-up flex flex-wrap items-end justify-between gap-4"><div><div className="flex items-center gap-2"><div className="h-1 w-8 rounded-full bg-gradient-to-r from-brand-700 to-analytics-600" /><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">Bihar / Directory</p></div><h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">Users</h2><p className="mt-2 max-w-md text-sm text-slate-500">Manage citizens, track participation, and monitor profile quality across all wards.</p></div><div className="flex items-center gap-3"><button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:shadow-md">↓ Export</button><button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-brand-500/30">＋ Add User</button></div></div><section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}</section><section className="animate-fade-in-up stagger-5 mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50"><div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50 p-6 md:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="text-xl font-bold text-slate-900">Citizen Directory</h3><p className="mt-1 text-sm text-slate-500">Search, filter and review all registered users.</p></div><span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">{filteredUsers.length} results</span></div><div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center"><div className="relative flex-1"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, mobile number or ward..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-100" />{query && <button aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100">×</button>}</div><div className="flex gap-2 overflow-x-auto">{filters.map((item) => <button key={item} onClick={() => setStatus(item)} className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${status === item ? 'border-brand-200 bg-brand-50 text-brand-700 shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>{item}</button>)}</div></div></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead><tr className="border-b border-slate-100 bg-slate-50/80">{['Citizen', 'Contact', 'Location', 'Issues', 'Joined', 'Status', ''].map((heading) => <th key={heading} className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">{heading}</th>)}</tr></thead><tbody>{filteredUsers.map((user, index) => <UserRow key={user.phone} user={user} index={index} />)}</tbody></table>{filteredUsers.length === 0 && <div className="flex flex-col items-center justify-center py-16"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-3xl text-slate-400">⌕</span><p className="mt-4 text-sm font-medium text-slate-600">No users found</p><p className="mt-1 text-xs text-slate-400">Try adjusting your search or filter criteria</p><button onClick={clearFilters} className="mt-4 rounded-lg bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-100">Clear all filters</button></div>}</div>{filteredUsers.length > 0 && <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/50 px-6 py-4"><span className="text-xs text-slate-500">Showing <b className="text-slate-700">{filteredUsers.length}</b> of <b className="text-slate-700">1,24,680</b> users</span><div className="flex items-center gap-1"><button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">‹</button>{[1, 2, 3, 4, 5].map((page) => <button key={page} onClick={() => setCurrentPage(page)} className={`rounded-lg px-3.5 py-2 text-xs font-semibold ${currentPage === page ? 'bg-gradient-to-r from-brand-700 to-brand-500 text-white shadow-lg' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>{page}</button>)}<button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">›</button></div></div>}</section></div></div>
}
