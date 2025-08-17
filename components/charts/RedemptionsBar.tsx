'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function RedemptionsBar({ data }: { data: { d: string, c: number }[] }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <XAxis dataKey="d" hide />
          <YAxis hide domain={[0, 'dataMax + 2']} />
          <Tooltip cursor={{ fill: 'rgba(212,200,187,0.3)' }} contentStyle={{ borderRadius: 12 }} />
          <Bar dataKey="c" fill="#B8A595" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

