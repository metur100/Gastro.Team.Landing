/** Illustrative product mockup built with HTML/CSS (not a screenshot). */
const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
/** On phones only Tue, Fri and Sat are shown so the cards stay readable. */
const hideOnPhone = (i: number) => (i === 0 || i === 2 || i === 3 ? 'hidden sm:block' : '')
type Chip = { day: number; time: string; role: string; color: string; open?: boolean; draft?: boolean }
const ROWS: { name: string; hours: string; chips: Chip[] }[] = [
  { name: 'Lea K.', hours: '30 / 38', chips: [{ day: 1, time: '10–18', role: 'Küche', color: '#B45309' }, { day: 3, time: '10–18', role: 'Küche', color: '#B45309' }, { day: 5, time: '15–23', role: 'Küche', color: '#B45309' }] },
  { name: 'Mia S.', hours: '24 / 30', chips: [{ day: 1, time: '11–17', role: 'Service', color: '#0F766E' }, { day: 2, time: '17–23', role: 'Service', color: '#0F766E' }, { day: 4, time: '17–23', role: 'Service', color: '#0F766E', draft: true }] },
  { name: 'Noah R.', hours: '20 / 40', chips: [{ day: 2, time: '16–23', role: 'Leitung', color: '#1D4ED8' }, { day: 5, time: '16–23', role: 'Leitung', color: '#1D4ED8' }] },
  { name: 'Sofia H.', hours: '9 / 20', chips: [{ day: 4, time: '19–01', role: 'Bar', color: '#7C3AED' }] },
]

export function ScheduleMockup() {
  return (
    <div className="relative" aria-hidden>
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
        <div className="flex items-center gap-2 border-b border-line bg-subtle/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="ml-3 text-xs font-medium text-ink-muted">Schichtplan · KW 42</span>
          <span className="ml-auto rounded-md bg-brand-700 px-2.5 py-1 text-[11px] font-semibold text-white">Veröffentlichen</span>
        </div>
        <div className="grid grid-cols-[84px_repeat(3,minmax(0,1fr))] text-[11px] sm:grid-cols-[84px_repeat(6,minmax(0,1fr))]">
          <div className="border-b border-line px-3 py-2 text-ink-faint">Team</div>
          {DAYS.map((d, i) => (
            <div key={d} className={`border-b border-l border-line px-2 py-2 font-semibold ${hideOnPhone(i)} ${i === 0 ? 'bg-subtle/70 text-ink-faint' : ''}`}>
              {d}
              {i === 0 && <span className="block font-normal">zu</span>}
            </div>
          ))}
          <div className="border-b border-line px-3 py-2 font-medium text-amber-700">Offen</div>
          {DAYS.map((d, i) => (
            <div key={d} className={`border-b border-l border-line p-1.5 ${hideOnPhone(i)} ${i === 0 ? 'bg-subtle/70' : ''}`}>
              {i === 5 && (
                <div className="rounded border border-dashed border-amber-700/50 bg-amber-50 px-1.5 py-1 text-amber-700">
                  <div className="font-semibold">17–23</div>
                  <div>Unbesetzt</div>
                </div>
              )}
            </div>
          ))}
          {ROWS.map((r) => (
            <div key={r.name} className="contents">
              <div className="border-b border-line px-3 py-2">
                <div className="font-medium text-ink">{r.name}</div>
                <div className="text-ink-faint">{r.hours} Std.</div>
              </div>
              {DAYS.map((d, i) => {
                const chip = r.chips.find((c) => c.day === i)
                return (
                  <div key={d} className={`border-b border-l border-line p-1.5 ${hideOnPhone(i)} ${i === 0 ? 'bg-subtle/70' : ''}`}>
                    {chip && (
                      <div className={`flex overflow-hidden rounded border bg-surface ${chip.draft ? 'border-dashed border-line-strong' : 'border-line'}`}>
                        <span className="w-1 shrink-0" style={{ backgroundColor: chip.color }} />
                        <div className="min-w-0 px-1.5 py-1">
                          <div className="font-semibold text-ink">{chip.time}</div>
                          <div className="truncate text-ink-muted">{chip.role}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 text-[11px] text-amber-700">
          <span className="font-semibold">1 Hinweis:</span> Mia S. – Ruhezeit nur 10 Std. zwischen Mi und Do.
        </div>
      </div>

      {/* Phone */}
      <div className="absolute -bottom-10 -right-2 hidden w-44 rounded-[1.6rem] border-[6px] border-ink bg-canvas p-3 shadow-pop sm:block lg:-right-8">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line-strong" />
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Heute</p>
        <p className="text-sm font-bold">Hallo Mia</p>
        <div className="mt-2 rounded-lg border border-line bg-surface p-2">
          <p className="text-[10px] text-ink-faint">Meine nächste Schicht</p>
          <p className="text-sm font-bold">11:00–17:00</p>
          <p className="text-[10px] text-ink-muted">Dienstag · Service</p>
        </div>
        <div className="mt-2 rounded-lg bg-brand-50 p-2 text-[10px] font-medium text-brand-800">Schichtplan KW 42 veröffentlicht</div>
      </div>
    </div>
  )
}
