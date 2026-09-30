import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: 'demo.user@example.com',
    password: 'DemoPass123!',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await onLogin(form)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to sign in with the provided credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-100 via-white to-ledger/10 px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-stone/20 bg-white shadow-xl">
        <div className="border-b border-stone/20 bg-stone/5 px-6 py-5">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-ledger text-white shadow-sm">
            <Lock className="h-5 w-5" />
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone">Inventory SaaS</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">ProductHub CRM</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
              Email address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-xl border border-stone/30 bg-white py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-stone focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20"
                placeholder="name@company.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-ink">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-xl border border-stone/30 bg-white py-2.5 pr-10 pl-3 text-sm text-ink placeholder:text-stone focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rust/30 bg-rust/5 px-3 py-2 text-sm text-rust">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-xl bg-ledger px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ledger/90 disabled:cursor-not-allowed disabled:opacity-75"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-stone">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-ledger hover:underline">
              Create one
            </Link>
          </p>

          <div className="rounded-xl border border-stone/20 bg-paper px-3 py-2 text-xs text-stone">
            Demo account: demo.user@example.com / DemoPass123!
          </div>
        </form>
      </div>
    </div>
  )
}
