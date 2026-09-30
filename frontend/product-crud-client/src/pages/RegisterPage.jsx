import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserRound, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'

export default function RegisterPage({ onRegister }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await onRegister({
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
      })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to create the account right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-100 via-white to-ledger/10 px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-stone/20 bg-white shadow-xl">
        <div className="border-b border-stone/20 bg-stone/5 px-6 py-5">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-ledger text-white shadow-sm">
            <UserRound className="h-5 w-5" />
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone">Create account</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Join ProductHub CRM</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-ink">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(event) => handleChange('firstName', event.target.value)}
                className="w-full rounded-xl border border-stone/30 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20"
                placeholder="Jane"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-ink">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={(event) => handleChange('lastName', event.target.value)}
                className="w-full rounded-xl border border-stone/30 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-ink">
              Mobile number
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
              <input
                id="phoneNumber"
                type="tel"
                value={form.phoneNumber}
                onChange={(event) => handleChange('phoneNumber', event.target.value)}
                className="w-full rounded-xl border border-stone/30 bg-white py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-stone focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20"
                placeholder="+1 555 123 4567"
                autoComplete="tel"
                required
              />
            </div>
          </div>

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
                onChange={(event) => handleChange('email', event.target.value)}
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
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) => handleChange('password', event.target.value)}
                className="w-full rounded-xl border border-stone/30 bg-white py-2.5 pl-9 pr-10 text-sm text-ink placeholder:text-stone focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20"
                placeholder="Create a password"
                autoComplete="new-password"
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

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-ink">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(event) => handleChange('confirmPassword', event.target.value)}
                className="w-full rounded-xl border border-stone/30 bg-white py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-stone focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
              />
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
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>

          <p className="text-center text-sm text-stone">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-ledger hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
