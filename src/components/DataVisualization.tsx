import { useState } from 'react'
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts'
import { Table2, BarChart3, PieChart as PieChartIcon, ChevronDown } from 'lucide-react'

// Palette for charts
const CHART_COLORS = [
    '#0466A6', '#F28C73', '#4AAAA5', '#E8A838', '#7C6FBF',
    '#E06B82', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
]

interface DataVisualizationProps {
    data: Record<string, unknown>[]
    question: string
}

type ViewMode = 'table' | 'bar' | 'pie'

function detectBestVisualization(data: Record<string, unknown>[]): ViewMode {
    if (!data || data.length === 0) return 'table'
    if (data.length === 1) return 'table' // Single row = just show as table

    const keys = Object.keys(data[0])

    const hasNumericCol = keys.some(k =>
        typeof data[0][k] === 'number' || (typeof data[0][k] === 'string' && !isNaN(Number(data[0][k])))
    )
    const hasLabelCol = keys.some(k => typeof data[0][k] === 'string' && isNaN(Number(data[0][k] as string)))

    if (hasNumericCol && hasLabelCol && data.length <= 10) return 'bar'
    if (hasNumericCol && hasLabelCol && data.length <= 6) return 'pie'
    return 'table'
}

function getChartData(data: Record<string, unknown>[]) {
    const keys = Object.keys(data[0] || {})

    let labelKey = keys[0]
    let valueKey = keys[1] || keys[0]

    for (const k of keys) {
        const firstVal = data[0][k]
        if (typeof firstVal === 'number' || (typeof firstVal === 'string' && !isNaN(Number(firstVal)) && firstVal !== '')) {
            valueKey = k
        } else {
            labelKey = k
        }
    }

    return {
        labelKey,
        valueKey,
        chartData: data.map(row => ({
            name: String(row[labelKey] ?? 'N/A'),
            value: Number(row[valueKey]) || 0,
            ...row,
        })),
    }
}

function DataTable({ data }: { data: Record<string, unknown>[] }) {
    if (!data || data.length === 0) return null
    const headers = Object.keys(data[0])

    const formatHeader = (h: string) =>
        h.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    const formatCell = (val: unknown) => {
        if (val === null || val === undefined) return '—'
        if (typeof val === 'boolean') return val ? 'Sí' : 'No'
        if (typeof val === 'number') return val.toLocaleString('es-CO')
        if (typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}/)) {
            return new Date(val).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
        }
        return String(val)
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-white/10 mt-2">
            <table className="w-full text-xs">
                <thead>
                    <tr className="bg-white/5">
                        {headers.map(h => (
                            <th key={h} className="px-3 py-2 text-left font-semibold text-white/60 whitespace-nowrap">
                                {formatHeader(h)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
                            {headers.map(h => (
                                <td key={h} className="px-3 py-2 text-white/80 whitespace-nowrap border-t border-white/10">
                                    {formatCell(row[h])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function BarChartView({ data }: { data: Record<string, unknown>[] }) {
    const { labelKey, valueKey, chartData } = getChartData(data)
    const formatLabel = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    return (
        <div className="w-full h-[250px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fff" strokeOpacity={0.1} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: '#ffffff80' }}
                        angle={-25}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis tick={{ fontSize: 10, fill: '#ffffff80' }} />
                    <Tooltip
                        contentStyle={{
                            background: '#1e293b',
                            border: '1px solid #ffffff1a',
                            borderRadius: '8px',
                            fontSize: '11px',
                            color: '#fff',
                            boxShadow: '0 4px 12px #0005',
                        }}
                        formatter={(value: unknown) => [Number(value).toLocaleString('es-CO'), formatLabel(valueKey)]}
                        labelFormatter={(label) => formatLabel(String(label))}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={50}>
                        {chartData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

function PieChartView({ data }: { data: Record<string, unknown>[] }) {
    const { chartData } = getChartData(data)
    const total = chartData.reduce((sum, d) => sum + d.value, 0)

    return (
        <div className="w-full h-[250px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={{ strokeWidth: 1, stroke: '#ffffff50' }}
                    >
                        {chartData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: '#1e293b',
                            border: '1px solid #ffffff1a',
                            borderRadius: '8px',
                            fontSize: '11px',
                            color: '#fff',
                        }}
                        formatter={(value: unknown) => [
                            `${Number(value).toLocaleString('es-CO')} (${((Number(value) / total) * 100).toFixed(1)}%)`,
                            '',
                        ]}
                    />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '10px', color: '#ffffff80' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default function DataVisualization({ data, question }: DataVisualizationProps) {
    const defaultView = detectBestVisualization(data)
    const [view, setView] = useState<ViewMode>(defaultView)

    if (!data || data.length === 0) return null

    const keys = Object.keys(data[0])
    const hasNumeric = keys.some(k =>
        typeof data[0][k] === 'number' || (typeof data[0][k] === 'string' && !isNaN(Number(data[0][k] as string)) && data[0][k] !== '')
    )

    const canChart = hasNumeric && data.length > 1

    const viewOptions: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
        { mode: 'table', icon: <Table2 className="h-3 w-3" />, label: 'Tabla' },
    ]
    if (canChart) {
        viewOptions.push(
            { mode: 'bar', icon: <BarChart3 className="h-3 w-3" />, label: 'Barras' },
            { mode: 'pie', icon: <PieChartIcon className="h-3 w-3" />, label: 'Pastel' },
        )
    }

    return (
        <div className="mt-4 space-y-2 w-full max-w-full overflow-hidden">
            <div className="flex items-center gap-1">
                {viewOptions.map(opt => (
                    <button
                        key={opt.mode}
                        onClick={() => setView(opt.mode)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${view === opt.mode
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/60'
                            }`}
                    >
                        {opt.icon}
                        {opt.label}
                    </button>
                ))}
                <span className="ml-auto text-[9px] text-white/30 font-medium">
                    {data.length} {data.length === 1 ? 'registro' : 'registros'}
                </span>
            </div>

            {view === 'table' && <DataTable data={data} />}
            {view === 'bar' && <BarChartView data={data} />}
            {view === 'pie' && <PieChartView data={data} />}
        </div>
    )
}
