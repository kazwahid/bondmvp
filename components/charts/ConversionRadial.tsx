'use client'

import { RadialBar, RadialBarChart, ResponsiveContainer, PolarAngleAxis } from 'recharts'

export default function ConversionRadial({ value }: { value: number }) {
  const data = [{ name: 'conv', value: Math.max(0, Math.min(100, Math.round(value))) }]
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="70%" outerRadius="90%" data={data} startAngle={180} endAngle={-180}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={10} fill="#8B7355" />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="fill-coffee-800" fontSize="18" fontWeight={600}>{data[0].value}%</text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

