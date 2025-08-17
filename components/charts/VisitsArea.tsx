'use client'

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function VisitsArea({ data }: { data: { d: string, c: number }[] }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="gVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B7355" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8B7355" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis dataKey="d" hide />
          <YAxis hide domain={[0, 'dataMax + 2']} />
          <Tooltip cursor={{ stroke: '#D4C8BB' }} contentStyle={{ borderRadius: 12 }} />
          <Area type="monotone" dataKey="c" stroke="#8B7355" fill="url(#gVisits)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

