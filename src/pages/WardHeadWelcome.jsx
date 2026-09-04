import { Link } from "react-router-dom";

const WardHeadWelcome = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg">

        {/* Logo / Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0b766d] text-2xl font-bold text-white shadow-lg">
            ॐ
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Jan Suraaj
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Ward Head Portal
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">

          <div className="mb-7 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              Ward Head Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Register as a Ward Head or login if your account
              has already been approved.
            </p>
          </div>

          {/* Register */}
          <Link
            to="/ward-head/register"
            className="flex w-full items-center justify-between rounded-2xl bg-[#0b766d] px-5 py-4 text-white transition hover:bg-[#08635c]"
          >
            <div>
              <p className="font-semibold">
                Register as Ward Head
              </p>

              <p className="mt-1 text-xs text-white/70">
                Submit your details for Super Admin approval
              </p>
            </div>

            <span className="text-xl">
              →
            </span>
          </Link>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Login */}
          <Link
            to="/ward-head/login"
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-800 transition hover:bg-slate-50"
          >
            <div>
              <p className="font-semibold">
                Login
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Login after Super Admin approval
              </p>
            </div>

            <span className="text-xl">
              →
            </span>
          </Link>

        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Ward Head accounts require Super Admin approval
          before accessing the dashboard.
        </p>

      </div>
    </div>
  );
};

export default WardHeadWelcome;