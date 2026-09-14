export default function StockMovementChart({ data = [] }) {
  const maxValue = Math.max(...data.map((item) => Number(item.value ?? 0)), 1)

  return (
    <div className="rounded-2xl border border-stone/20 bg-paper p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Stock analytics</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">Movement totals</h3>
        </div>
      </div>

      <div className="flex h-44 items-end gap-4">
        {data.map((item) => {
          const height = Math.max((Number(item.value ?? 0) / maxValue) * 100, item.value > 0 ? 18 : 4)

          return (
            <div key={item.label} className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="flex h-32 w-full items-end justify-center">
                <div
                  className={`w-full rounded-t-xl ${
                    item.label === 'IN'
                      ? 'bg-emerald-500'
                      : item.label === 'OUT'
                        ? 'bg-amber-500'
                        : 'bg-sky-500'
                  }`}
                  style={{ height: `${height}%` }}
                  title={`${item.label}: ${item.value}`}
                />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-stone">{item.label}</p>
                <p className="text-xs font-semibold text-ink">{item.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
