// import { useEffect, useState } from 'react'

// const activity = [
//   ['10:42 AM', 'New issue registered', 'Ward 07, Bhagalpur', '✦', 'bg-brand-50 text-brand-600'],
//   ['10:37 AM', 'Issue #12821 resolved', 'Ward 03, Sabour', '✓', 'bg-success-50 text-success-600'],
//   ['10:31 AM', 'New user added', 'Ward 11, Nathnagar', '+', 'bg-analytics-50 text-analytics-600'],
//   ['10:22 AM', 'Issue marked high priority', 'Ward 08, Sabour', '!', 'bg-danger-50 text-danger-600'],
//   ['10:15 AM', 'Ward health report generated', 'Ward 14, Darbhanga', '▥', 'bg-warning-50 text-warning-600'],
//   ['10:08 AM', 'Complaint escalated', 'Ward 02, Patna', '⚠', 'bg-saffron-50 text-saffron-600'],
// ]

// const stats = [
//   ['Total Users', '1,24,680', '+8.2%', 'Registered citizens', 'brand', '♙'],
//   ['Issues Registered', '8,421', '+18.4%', 'All time reports', 'success', '▤'],
//   ['Pending Issues', '2,500', '−4.7%', 'Awaiting resolution', 'saffron', '◷'],
//   ['Resolution Rate', '70.3%', '+2.1%', 'This quarter', 'danger', '◎'],
// ]

// const districts = [
//   ['Bhagalpur', 47, 100, 'bg-brand-500'], ['Patna', 39, 83, 'bg-analytics-500'],
//   ['Muzaffarpur', 31, 66, 'bg-info-500'], ['Gaya', 24, 51, 'bg-success-500'], ['Darbhanga', 18, 38, 'bg-warning-500'],
// ]

// const priorities = [
//   ['184', 'Issues registered today', 'bg-danger-50 text-danger-600', '●'],
//   ['37', 'Issues pending over 7 days', 'bg-warning-50 text-warning-600', '●'],
//   ['12', 'Wards with complaint spike', 'bg-saffron-50 text-saffron-600', '●'],
//   ['8', 'Wards with zero activity', 'bg-slate-100 text-slate-500', '●'],
//   ['23', 'Issues missing information', 'bg-brand-50 text-brand-600', '●'],
// ]

// const wards = [
//   ['Ward 07 · Sabour', 82, 'from-success-400 to-success-500'], ['Ward 12 · Nathnagar', 61, 'from-warning-400 to-warning-500'],
//   ['Ward 03 · Sultanganj', 91, 'from-success-400 to-geography-500'], ['Ward 09 · Gaya', 45, 'from-danger-400 to-danger-500'], ['Ward 14 · Darbhanga', 73, 'from-info-400 to-brand-500'],
// ]

// function StatCard({ stat, index }) {
//   const [label, value, change, description, tone, icon] = stat
//   const edge = { brand: 'border-brand-600', success: 'border-success-500', saffron: 'border-saffron-500', danger: 'border-danger-500' }[tone]
//   const iconStyle = { brand: 'bg-brand-50 text-brand-700', success: 'bg-success-50 text-success-600', saffron: 'bg-saffron-50 text-saffron-600', danger: 'bg-danger-50 text-danger-600' }[tone]
//   return <div className={`metric-card animate-fade-in-up stagger-${index + 1} relative overflow-hidden rounded-2xl border border-slate-200 border-t-4 ${edge} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-400">{description}</p></div><span className={`grid h-12 w-12 place-items-center rounded-xl text-xl ${iconStyle}`}>{icon}</span></div><div className="mt-4 flex items-center gap-2"><span className={`rounded-full px-2 py-0.5 text-xs font-bold ${tone === 'saffron' ? 'bg-warning-50 text-warning-700' : 'bg-success-50 text-success-700'}`}>{change.startsWith('−') ? '↓' : '↑'} {change}</span><span className="text-xs text-slate-400">vs last month</span></div></div>
// }

// function BiharMap() {
//   return <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-geography-100 bg-gradient-to-br from-geography-50 via-geography-50 to-info-50"><div className="absolute left-[38%] top-[8%] h-40 w-32 rotate-[20deg] rounded-[48%_52%_45%_55%] border-[10px] border-geography-200/60 bg-geography-100/40" /><div className="absolute left-[42%] top-[15%] h-28 w-20 rotate-[15deg] rounded-[50%_50%_45%_55%] border-[6px] border-geography-200/40 bg-geography-100/30" /><div className="map-dot map-dot-rose absolute left-[48%] top-[28%] h-3.5 w-3.5 rounded-full bg-danger-500 shadow-lg shadow-danger-200" /><div className="map-dot map-dot-amber absolute left-[58%] top-[42%] h-3 w-3 rounded-full bg-warning-500 shadow-lg shadow-warning-200" /><div className="map-dot map-dot-emerald absolute left-[44%] top-[52%] h-3 w-3 rounded-full bg-success-500 shadow-lg shadow-success-200" /><div className="map-dot map-dot-blue absolute left-[55%] top-[60%] h-2.5 w-2.5 rounded-full bg-info-500 shadow-lg shadow-info-200" /><svg className="absolute inset-0 h-full w-full opacity-30"><line x1="48%" y1="30%" x2="58%" y2="44%" stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" /><line x1="58%" y1="44%" x2="44%" y2="54%" stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" /><line x1="44%" y1="54%" x2="55%" y2="62%" stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" /></svg><span className="live-indicator absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-success-700 shadow-sm">Live district activity</span><span className="absolute right-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-bold text-slate-500 shadow-sm">5 active zones</span></div>
// }

// function DistrictList() {
//   return <div className="space-y-3"><div className="mb-4 flex items-center justify-between"><h4 className="text-sm font-bold text-slate-700">Top districts</h4><span className="text-xs text-slate-400">By issue count</span></div>{districts.map(([name, count, percentage, color], index) => <div key={name} className="district-bar flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{index + 1}</span><div className="flex-1"><div className="mb-1 flex items-center justify-between"><span className="text-sm font-semibold text-slate-700">{name}</span><span className="text-xs font-bold text-slate-500">{count} issues</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`progress-bar h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} /></div></div></div>)}</div>
// }

// function AttentionPanel() {
//   return <div className="divide-y divide-slate-50">{priorities.map(([value, label, style, icon]) => <button key={label} className="attention-item group flex w-full items-center gap-4 rounded-lg py-3.5 text-left transition hover:bg-slate-50 hover:pl-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${style}`}><span className="text-lg">{icon}</span></span><span className="flex-1"><strong className={`text-xl font-extrabold ${style.split(' ')[1]}`}>{value}</strong><span className="mt-0.5 block text-sm font-medium text-slate-600">{label}</span></span><span className="text-slate-300 transition group-hover:translate-x-1">›</span></button>)}</div>
// }

// function WardHealthPanel() {
//   return <div className="space-y-5">{wards.map(([name, score, gradient], index) => <div key={name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}><div className="mb-2 flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-semibold text-slate-700"><i className={`h-2 w-2 rounded-full ${score >= 75 ? 'bg-success-400' : score >= 50 ? 'bg-warning-400' : 'bg-danger-400'}`} />{name}</span><span className={`text-sm font-bold ${score >= 75 ? 'text-success-600' : score >= 50 ? 'text-warning-600' : 'text-danger-600'}`}>{score}% <small className="font-normal text-slate-400">resolved</small></span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`progress-bar h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${score}%` }} /></div></div>)}<div className="mt-6 flex items-center gap-4 rounded-xl bg-slate-50 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg text-brand-600">▥</span><div className="flex-1"><p className="text-sm font-semibold text-slate-700">Average resolution: <span className="text-brand-600">70.4%</span></p><p className="mt-0.5 text-xs text-slate-400">Across all monitored wards</p></div><button className="rounded-lg border border-brand-100 bg-white px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50">View all</button></div></div>
// }

// function ActivityPanel() {
//   return <div className="space-y-4">{activity.map(([time, title, place, icon, style], index) => <div key={time} className="animate-slide-in-right flex items-start gap-3" style={{ animationDelay: `${index * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}><span className={`activity-dot grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-sm ${style}`}>{icon}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-700">{title}</p><p className="mt-0.5 text-xs text-slate-400">{place}</p></div><time className="shrink-0 rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-400">{time}</time></div>)}<button className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50">View all activity →</button></div>
// }

// export default function Dashboard() {
//   const [currentTime, setCurrentTime] = useState(new Date())
//   useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 60000); return () => clearInterval(timer) }, [])
//   return <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-brand-50/40 to-analytics-50 px-4 py-8 md:px-8 lg:px-12"><div className="mx-auto max-w-[1600px]"><div className="animate-fade-in-up flex flex-wrap items-end justify-between gap-4"><div><div className="flex items-center gap-2"><div className="h-1 w-8 rounded-full bg-gradient-to-r from-brand-500 to-analytics-500" /><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">Bihar / Dashboard</p><span className="live-indicator ml-2 rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-bold text-success-600">Live</span></div><h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">State Pulse</h2><p className="mt-2 max-w-lg text-sm text-slate-500">A live view of public issues and ground activity across Bihar. Real-time monitoring of citizen engagement.</p></div><div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm md:flex"><span className="text-slate-400">◷</span><span className="text-sm font-medium text-slate-600">{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span></div><button className="rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5">＋ Register Issue</button></div></div><section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat, index) => <StatCard key={stat[0]} stat={stat} index={index} />)}</section><div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]"><section className="panel-card animate-fade-in-up stagger-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-lg"><div className="mb-6 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">Bihar Live Pulse</h3><p className="mt-1 text-sm text-slate-500">Issue activity by district</p></div><span className="rounded-full bg-success-50 px-3 py-1 text-xs font-bold text-success-600"><span className="live-indicator">Live</span></span></div><div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]"><BiharMap /><DistrictList /></div></section><section className="panel-card animate-fade-in-up stagger-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-lg"><div className="mb-4 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">What needs attention?</h3><p className="mt-1 text-sm text-slate-500">Priorities for today</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-danger-50 text-lg text-danger-600">⚡</span></div><AttentionPanel /></section></div><div className="mt-6 grid gap-6 xl:grid-cols-2"><section className="panel-card animate-fade-in-up stagger-7 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-lg"><div className="mb-6 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">Ward Health</h3><p className="mt-1 text-sm text-slate-500">Resolution and response overview</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg text-brand-600">▥</span></div><WardHealthPanel /></section><section className="panel-card animate-fade-in-up stagger-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-lg"><div className="mb-6 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">Recent Activity</h3><p className="mt-1 text-sm text-slate-500">Across the state</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-geography-50 text-lg text-geography-600">◉</span></div><ActivityPanel /></section></div></div></div>
// }

import { useEffect, useMemo, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// ==================================
// Format Date
// ==================================

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "";
  }

  return new Date(dateValue).toLocaleString("en-IN", {
    day: "2-digit",

    month: "short",

    hour: "2-digit",

    minute: "2-digit",
  });
};

// ==================================
// Get User Name
// ==================================

const getUserName = (user) => {
  if (!user) {
    return "Unknown User";
  }

  if (user.name) {
    return user.name;
  }

  const fullName = [user.firstName, user.middleName, user.lastName]
    .filter(Boolean)
    .join(" ");

  return fullName || "Unknown User";
};

// ==================================
// Get Issue Title
// ==================================

const getIssueTitle = (issue) => {
  if (!issue) {
    return "Issue";
  }

  if (issue.category) {
    return issue.category;
  }

  return "New issue registered";
};

// ==================================
// Stat Card
// ==================================

function StatCard({ stat, index }) {
  const [label, value, change, description, tone, icon] = stat;

  const edge = {
    brand: "border-brand-600",

    success: "border-success-500",

    saffron: "border-saffron-500",

    danger: "border-danger-500",
  }[tone];

  const iconStyle = {
    brand: "bg-brand-50 text-brand-700",

    success: "bg-success-50 text-success-600",

    saffron: "bg-saffron-50 text-saffron-600",

    danger: "bg-danger-50 text-danger-600",
  }[tone];

  return (
    <div
      className={`
        metric-card
        animate-fade-in-up
        stagger-${index + 1}
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        border-t-4
        ${edge}
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-xl
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            {label}
          </p>

          <p
            className="
              mt-3
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
            "
          >
            {value}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            {description}
          </p>
        </div>

        <span
          className={`
            grid
            h-12
            w-12
            place-items-center
            rounded-xl
            text-xl
            ${iconStyle}
          `}
        >
          {icon}
        </span>
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          gap-2
        "
      >
        <span
          className={`
            rounded-full
            px-2
            py-0.5
            text-xs
            font-bold

            ${
              tone === "saffron"
                ? "bg-warning-50 text-warning-700"
                : "bg-success-50 text-success-700"
            }
          `}
        >
          {change}
        </span>

        <span
          className="
            text-xs
            text-slate-400
          "
        >
          Current ward data
        </span>
      </div>
    </div>
  );
}

// ==================================
// Ward Map
// ==================================

function BiharMap({ location }) {
  const locationName =
    location?.areaType === "urban" ? location?.localBody : location?.block;

  const secondaryLocation =
    location?.areaType === "rural" ? location?.panchayat : location?.district;

  return (
    <div
      className="
        relative
        min-h-[280px]
        overflow-hidden
        rounded-2xl
        border
        border-geography-100
        bg-gradient-to-br
        from-geography-50
        via-geography-50
        to-info-50
      "
    >
      <div
        className="
          absolute
          left-[38%]
          top-[8%]
          h-40
          w-32
          rotate-[20deg]
          rounded-[48%_52%_45%_55%]
          border-[10px]
          border-geography-200/60
          bg-geography-100/40
        "
      />

      <div
        className="
          absolute
          left-[42%]
          top-[15%]
          h-28
          w-20
          rotate-[15deg]
          rounded-[50%_50%_45%_55%]
          border-[6px]
          border-geography-200/40
          bg-geography-100/30
        "
      />

      <div
        className="
          absolute
          left-[50%]
          top-[42%]
          grid
          h-16
          w-16
          -translate-x-1/2
          -translate-y-1/2
          place-items-center
          rounded-full
          border-4
          border-success-200
          bg-success-500
          text-center
          text-xs
          font-extrabold
          text-white
          shadow-lg
        "
      >
        {location?.ward || "Ward"}
      </div>

      <div
        className="
          absolute
          bottom-4
          left-4
          right-4
          rounded-xl
          bg-white/90
          p-3
          shadow-sm
        "
      >
        <p
          className="
            text-xs
            font-bold
            text-slate-700
          "
        >
          {location?.district || "District"}
        </p>

        <p
          className="
            mt-1
            text-[11px]
            text-slate-500
          "
        >
          {locationName || "Location"}

          {secondaryLocation ? ` • ${secondaryLocation}` : ""}
        </p>
      </div>

      <span
        className="
          live-indicator
          absolute
          right-4
          top-4
          rounded-lg
          bg-white/90
          px-3
          py-1.5
          text-[10px]
          font-bold
          text-success-700
          shadow-sm
        "
      >
        Current Ward
      </span>
    </div>
  );
}

// ==================================
// Ward Overview List
// ==================================

function DistrictList({ statistics }) {
  const totalIssues = statistics?.totalIssues || 0;

  const getPercentage = (value) => {
    if (!totalIssues || totalIssues === 0) {
      return 0;
    }

    return Math.round((value / totalIssues) * 100);
  };

  const items = [
    [
      "Pending Issues",
      statistics?.pendingIssues || 0,
      getPercentage(statistics?.pendingIssues || 0),
      "bg-warning-500",
    ],

    [
      "In Progress",
      statistics?.inProgressIssues || 0,
      getPercentage(statistics?.inProgressIssues || 0),
      "bg-info-500",
    ],

    [
      "Resolved",
      statistics?.resolvedIssues || 0,
      getPercentage(statistics?.resolvedIssues || 0),
      "bg-success-500",
    ],

    ["Total Issues", totalIssues, 100, "bg-brand-500"],
  ];

  return (
    <div
      className="
        space-y-3
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <h4
          className="
            text-sm
            font-bold
            text-slate-700
          "
        >
          Ward overview
        </h4>

        <span
          className="
            text-xs
            text-slate-400
          "
        >
          By issue status
        </span>
      </div>

      {items.map(([name, count, percentage, color], index) => (
        <div
          key={name}
          className="
              district-bar
              flex
              items-center
              gap-3
              rounded-xl
              p-2
              transition
              hover:bg-slate-50
            "
        >
          <span
            className="
                grid
                h-8
                w-8
                place-items-center
                rounded-lg
                bg-slate-100
                text-xs
                font-bold
                text-slate-600
              "
          >
            {index + 1}
          </span>

          <div
            className="
                flex-1
              "
          >
            <div
              className="
                  mb-1
                  flex
                  items-center
                  justify-between
                "
            >
              <span
                className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
              >
                {name}
              </span>

              <span
                className="
                    text-xs
                    font-bold
                    text-slate-500
                  "
              >
                {count}
              </span>
            </div>

            <div
              className="
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-slate-100
                "
            >
              <div
                className={`
                    progress-bar
                    h-full
                    rounded-full
                    ${color}
                  `}
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==================================
// Attention Panel
// ==================================

function AttentionPanel({ statistics }) {
  const priorities = [
    [
      statistics?.pendingIssues || 0,
      "Issues awaiting resolution",
      "bg-danger-50 text-danger-600",
      "●",
    ],

    [
      statistics?.inProgressIssues || 0,
      "Issues currently in progress",
      "bg-warning-50 text-warning-600",
      "●",
    ],

    [
      statistics?.resolvedIssues || 0,
      "Issues successfully resolved",
      "bg-success-50 text-success-600",
      "●",
    ],

    [
      statistics?.totalUsers || 0,
      "Registered citizens in this ward",
      "bg-brand-50 text-brand-600",
      "●",
    ],

    [
      statistics?.totalIssues || 0,
      "Total issues registered",
      "bg-analytics-50 text-analytics-600",
      "●",
    ],
  ];

  return (
    <div
      className="
        divide-y
        divide-slate-50
      "
    >
      {priorities.map(([value, label, style, icon]) => (
        <button
          key={label}
          className="
              attention-item
              group
              flex
              w-full
              items-center
              gap-4
              rounded-lg
              py-3.5
              text-left
              transition
              hover:bg-slate-50
              hover:pl-3
            "
        >
          <span
            className={`
                grid
                h-10
                w-10
                place-items-center
                rounded-xl
                ${style}
              `}
          >
            <span
              className="
                  text-lg
                "
            >
              {icon}
            </span>
          </span>

          <span
            className="
                flex-1
              "
          >
            <strong
              className={`
                  text-xl
                  font-extrabold
                  ${style.split(" ")[1]}
                `}
            >
              {value}
            </strong>

            <span
              className="
                  mt-0.5
                  block
                  text-sm
                  font-medium
                  text-slate-600
                "
            >
              {label}
            </span>
          </span>

          <span
            className="
                text-slate-300
                transition
                group-hover:translate-x-1
              "
          >
            ›
          </span>
        </button>
      ))}
    </div>
  );
}

// ==================================
// Ward Health Panel
// ==================================

function WardHealthPanel({ statistics, location }) {
  const totalIssues = statistics?.totalIssues || 0;

  const resolvedIssues = statistics?.resolvedIssues || 0;

  const inProgressIssues = statistics?.inProgressIssues || 0;

  const pendingIssues = statistics?.pendingIssues || 0;

  const resolutionRate =
    totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  const items = [
    [
      location?.ward || "Ward",
      resolutionRate,
      "from-success-400 to-success-500",
    ],

    [
      "Resolved Issues",
      totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0,
      "from-success-400 to-geography-500",
    ],

    [
      "In Progress",
      totalIssues > 0 ? Math.round((inProgressIssues / totalIssues) * 100) : 0,
      "from-warning-400 to-warning-500",
    ],

    [
      "Pending",
      totalIssues > 0 ? Math.round((pendingIssues / totalIssues) * 100) : 0,
      "from-danger-400 to-danger-500",
    ],
  ];

  return (
    <div
      className="
        space-y-5
      "
    >
      {items.map(([name, score, gradient], index) => (
        <div
          key={name}
          className="
              animate-fade-in
            "
          style={{
            animationDelay: `${index * 0.1}s`,

            opacity: 0,

            animationFillMode: "forwards",
          }}
        >
          <div
            className="
                mb-2
                flex
                items-center
                justify-between
              "
          >
            <span
              className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                "
            >
              <i
                className={`
                    h-2
                    w-2
                    rounded-full

                    ${
                      score >= 75
                        ? "bg-success-400"
                        : score >= 50
                        ? "bg-warning-400"
                        : "bg-danger-400"
                    }
                  `}
              />

              {name}
            </span>

            <span
              className={`
                  text-sm
                  font-bold

                  ${
                    score >= 75
                      ? "text-success-600"
                      : score >= 50
                      ? "text-warning-600"
                      : "text-danger-600"
                  }
                `}
            >
              {score}%
              <small
                className="
                    font-normal
                    text-slate-400
                  "
              >
                {" "}
                status
              </small>
            </span>
          </div>

          <div
            className="
                h-2.5
                overflow-hidden
                rounded-full
                bg-slate-100
              "
          >
            <div
              className={`
                  progress-bar
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  ${gradient}
                `}
              style={{
                width: `${score}%`,
              }}
            />
          </div>
        </div>
      ))}

      <div
        className="
          mt-6
          flex
          items-center
          gap-4
          rounded-xl
          bg-slate-50
          p-4
        "
      >
        <span
          className="
            grid
            h-10
            w-10
            place-items-center
            rounded-xl
            bg-brand-50
            text-lg
            text-brand-600
          "
        >
          ▥
        </span>

        <div
          className="
            flex-1
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Resolution rate:{" "}
            <span
              className="
                text-brand-600
              "
            >
              {resolutionRate}%
            </span>
          </p>

          <p
            className="
              mt-0.5
              text-xs
              text-slate-400
            "
          >
            Based on issues from this ward
          </p>
        </div>

        <button
          className="
            rounded-lg
            border
            border-brand-100
            bg-white
            px-3
            py-1.5
            text-xs
            font-semibold
            text-brand-600
            hover:bg-brand-50
          "
        >
          View all
        </button>
      </div>
    </div>
  );
}

// ==================================
// Activity Panel
// ==================================

function ActivityPanel({ recentUsers, recentIssues, location }) {
  const activity = useMemo(() => {
    const issueActivity = recentIssues.map((issue) => {
      const statusStyle =
        issue.status === "resolved"
          ? "bg-success-50 text-success-600"
          : issue.status === "in-progress"
          ? "bg-warning-50 text-warning-600"
          : "bg-brand-50 text-brand-600";

      const statusIcon =
        issue.status === "resolved"
          ? "✓"
          : issue.status === "in-progress"
          ? "◷"
          : "✦";

      return {
        id: `issue-${issue._id}`,

        date: issue.createdAt,

        title: getIssueTitle(issue),

        place: `${location?.ward || "Ward"} • ${issue.status || "pending"}`,

        icon: statusIcon,

        style: statusStyle,
      };
    });

    const userActivity = recentUsers.map((user) => {
      return {
        id: `user-${user._id}`,

        date: user.createdAt,

        title: `${getUserName(user)} joined`,

        place: `${user.ward || location?.ward || "Ward"} • New user`,

        icon: "+",

        style: "bg-analytics-50 text-analytics-600",
      };
    });

    return [...issueActivity, ...userActivity]

      .sort((a, b) => new Date(b.date) - new Date(a.date))

      .slice(0, 10);
  }, [recentUsers, recentIssues, location]);

  if (activity.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
          rounded-xl
          border
          border-dashed
          border-slate-200
          text-center
        "
      >
        <div>
          <p
            className="
              text-sm
              font-semibold
              text-slate-600
            "
          >
            No recent activity
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            New users and issues will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-4
      "
    >
      {activity.map((item, index) => (
        <div
          key={item.id}
          className="
              animate-slide-in-right
              flex
              items-start
              gap-3
            "
          style={{
            animationDelay: `${index * 0.08}s`,

            opacity: 0,

            animationFillMode: "forwards",
          }}
        >
          <span
            className={`
                activity-dot
                grid
                h-10
                w-10
                shrink-0
                place-items-center
                rounded-xl
                shadow-sm
                ${item.style}
              `}
          >
            {item.icon}
          </span>

          <div
            className="
                min-w-0
                flex-1
              "
          >
            <p
              className="
                  truncate
                  text-sm
                  font-semibold
                  text-slate-700
                "
            >
              {item.title}
            </p>

            <p
              className="
                  mt-0.5
                  text-xs
                  text-slate-400
                "
            >
              {item.place}
            </p>
          </div>

          <time
            className="
                shrink-0
                rounded-lg
                bg-slate-50
                px-2
                py-1
                text-[10px]
                font-bold
                text-slate-400
              "
          >
            {formatDate(item.date)}
          </time>
        </div>
      ))}

      <button
        className="
          mt-4
          w-full
          rounded-xl
          border
          border-slate-200
          py-2.5
          text-xs
          font-semibold
          text-slate-500
          transition
          hover:bg-slate-50
        "
      >
        View all activity →
      </button>
    </div>
  );
}

// ==================================
// Dashboard
// ==================================

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==================================
  // Current Time
  // ==================================

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    return () => clearInterval(timer);
  }, []);

  // ==================================
  // Fetch Ward Head Dashboard
  // ==================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await fetch(`${BACKEND_URL}/api/ward-head/dashboard`, {
          method: "GET",

          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load dashboard");
        }

        setDashboardData(data);
      } catch (error) {
        console.error("Ward Head Dashboard Error:", error);

        setError(error.message || "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ==================================
  // Dashboard Data
  // ==================================

  const statistics = dashboardData?.statistics || {
    totalUsers: 0,

    totalIssues: 0,

    pendingIssues: 0,

    inProgressIssues: 0,

    resolvedIssues: 0,
  };

  const location = dashboardData?.wardHeadLocation || {};

  const recentUsers = dashboardData?.recentUsers || [];

  const recentIssues = dashboardData?.recentIssues || [];

  // ==================================
  // Resolution Rate
  // ==================================

  const resolutionRate =
    statistics.totalIssues > 0
      ? ((statistics.resolvedIssues / statistics.totalIssues) * 100).toFixed(1)
      : "0.0";

  // ==================================
  // Dynamic Stats
  // ==================================

  const stats = [
    [
      "Total Users",
      statistics.totalUsers.toLocaleString("en-IN"),
      "Live",
      "Registered citizens",
      "brand",
      "♙",
    ],

    [
      "Issues Registered",
      statistics.totalIssues.toLocaleString("en-IN"),
      "Live",
      "All ward reports",
      "success",
      "▤",
    ],

    [
      "Pending Issues",
      statistics.pendingIssues.toLocaleString("en-IN"),
      "Pending",
      "Awaiting resolution",
      "saffron",
      "◷",
    ],

    [
      "Resolution Rate",
      `${resolutionRate}%`,
      "Live",
      "Current ward",
      "danger",
      "◎",
    ],
  ];

  // ==================================
  // Loading
  // ==================================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[calc(100vh-5rem)]
          items-center
          justify-center
          bg-gradient-to-br
          from-slate-50
          via-brand-50/40
          to-analytics-50
          px-4
        "
      >
        <div
          className="
            text-center
          "
        >
          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-brand-100
              border-t-brand-600
            "
          />

          <p
            className="
              mt-4
              text-sm
              font-semibold
              text-slate-500
            "
          >
            Loading ward dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-[calc(100vh-5rem)]
        bg-gradient-to-br
        from-slate-50
        via-brand-50/40
        to-analytics-50
        px-4
        py-8
        md:px-8
        lg:px-12
      "
    >
      <div
        className="
          mx-auto
          max-w-[1600px]
        "
      >
        {/* ================================== */}
        {/* Error */}
        {/* ================================== */}

        {error && (
          <div
            className="
              mb-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              font-medium
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {/* ================================== */}
        {/* Header */}
        {/* ================================== */}

        <div
          className="
            animate-fade-in-up
            flex
            flex-wrap
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  h-1
                  w-8
                  rounded-full
                  bg-gradient-to-r
                  from-brand-500
                  to-analytics-500
                "
              />

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-brand-700
                "
              >
                {location.district || "Bihar"}

                {" / "}

                {location.ward || "Ward Dashboard"}
              </p>

              <span
                className="
                  live-indicator
                  ml-2
                  rounded-full
                  bg-success-50
                  px-2
                  py-0.5
                  text-[10px]
                  font-bold
                  text-success-600
                "
              >
                Live
              </span>
            </div>

            <h2
              className="
                mt-3
                text-4xl
                font-extrabold
                tracking-tight
                text-slate-900
              "
            >
              Ward Pulse
            </h2>

            <p
              className="
                mt-2
                max-w-lg
                text-sm
                text-slate-500
              "
            >
              Live view of users, issues and ground activity from your assigned
              ward.
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                shadow-sm
                md:flex
              "
            >
              <span
                className="
                  text-slate-400
                "
              >
                ◷
              </span>

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-600
                "
              >
                {currentTime.toLocaleTimeString("en-IN", {
                  hour: "2-digit",

                  minute: "2-digit",
                })}
              </span>
            </div>

            <button
              className="
                rounded-xl
                bg-gradient-to-r
                from-brand-700
                to-brand-500
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition
                hover:-translate-y-0.5
              "
            >
              ＋ Register Issue
            </button>
          </div>
        </div>

        {/* ================================== */}
        {/* Statistics */}
        {/* ================================== */}

        <section
          className="
            mt-8
            grid
            gap-5
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {stats.map((stat, index) => (
            <StatCard key={stat[0]} stat={stat} index={index} />
          ))}
        </section>

        {/* ================================== */}
        {/* Ward Overview */}
        {/* ================================== */}

        <div
          className="
            mt-8
            grid
            gap-6
            xl:grid-cols-[1.4fr_0.8fr]
          "
        >
          <section
            className="
              panel-card
              animate-fade-in-up
              stagger-5
              rounded-2xl
              border
              border-slate-200/80
              bg-white
              p-6
              shadow-sm
              transition
              hover:shadow-lg
            "
          >
            <div
              className="
                mb-6
                flex
                items-start
                justify-between
              "
            >
              <div>
                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Ward Live Pulse
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Activity overview for your assigned ward
                </p>
              </div>

              <span
                className="
                  rounded-full
                  bg-success-50
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-success-600
                "
              >
                <span
                  className="
                    live-indicator
                  "
                >
                  Live
                </span>
              </span>
            </div>

            <div
              className="
                grid
                gap-5
                md:grid-cols-[1.1fr_0.9fr]
              "
            >
              <BiharMap location={location} />

              <DistrictList statistics={statistics} />
            </div>
          </section>

          {/* ================================== */}
          {/* Attention */}
          {/* ================================== */}

          <section
            className="
              panel-card
              animate-fade-in-up
              stagger-6
              rounded-2xl
              border
              border-slate-200/80
              bg-white
              p-6
              shadow-sm
              transition
              hover:shadow-lg
            "
          >
            <div
              className="
                mb-4
                flex
                items-start
                justify-between
              "
            >
              <div>
                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  What needs attention?
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Current ward priorities
                </p>
              </div>

              <span
                className="
                  grid
                  h-10
                  w-10
                  place-items-center
                  rounded-xl
                  bg-danger-50
                  text-lg
                  text-danger-600
                "
              >
                ⚡
              </span>
            </div>

            <AttentionPanel statistics={statistics} />
          </section>
        </div>

        {/* ================================== */}
        {/* Ward Health + Activity */}
        {/* ================================== */}

        <div
          className="
            mt-6
            grid
            gap-6
            xl:grid-cols-2
          "
        >
          <section
            className="
              panel-card
              animate-fade-in-up
              stagger-7
              rounded-2xl
              border
              border-slate-200/80
              bg-white
              p-6
              shadow-sm
              transition
              hover:shadow-lg
            "
          >
            <div
              className="
                mb-6
                flex
                items-start
                justify-between
              "
            >
              <div>
                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Ward Health
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Resolution and response overview
                </p>
              </div>

              <span
                className="
                  grid
                  h-10
                  w-10
                  place-items-center
                  rounded-xl
                  bg-brand-50
                  text-lg
                  text-brand-600
                "
              >
                ▥
              </span>
            </div>

            <WardHealthPanel statistics={statistics} location={location} />
          </section>

          <section
            className="
              panel-card
              animate-fade-in-up
              stagger-8
              rounded-2xl
              border
              border-slate-200/80
              bg-white
              p-6
              shadow-sm
              transition
              hover:shadow-lg
            "
          >
            <div
              className="
                mb-6
                flex
                items-start
                justify-between
              "
            >
              <div>
                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Recent Activity
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Users and issues from your ward
                </p>
              </div>

              <span
                className="
                  grid
                  h-10
                  w-10
                  place-items-center
                  rounded-xl
                  bg-geography-50
                  text-lg
                  text-geography-600
                "
              >
                ◉
              </span>
            </div>

            <ActivityPanel
              recentUsers={recentUsers}
              recentIssues={recentIssues}
              location={location}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
