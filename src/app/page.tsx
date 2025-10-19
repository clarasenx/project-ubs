'use client'

import { api } from '@/api/api'
import { FilterCard } from '@/components/filterCard'
import { Header } from '@/components/header'
import { ISchedule } from '@/interfaces/ISchedule'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'

let socket: Socket

const columns: ColumnDef<ISchedule>[] = [
  {
    accessorKey: 'patientName',
    header: 'Paciente',
    cell: ({ getValue }) => (
      <div className="max-w-[250px] truncate">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: 'document',
    header: 'Documento',
    cell: ({ getValue }) => (
      <div className="max-w-[150px] truncate">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: 'ubsName',
    header: 'UBS',
    cell: ({ getValue }) => (
      <div className="max-w-[150px] truncate">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ getValue }) => {
      const date: Date = getValue() as Date
      return (
        <div className="w-[100px] truncate">
          {date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
      )
    },
  },
  {
    accessorKey: 'hour',
    header: 'Horário',
    cell: ({ getValue }) => (
      <div className="max-w-[80px] truncate">{extractHourMinute(getValue<string>())}</div>
    ),
  },
  {
    accessorKey: 'doctorName',
    header: 'Médico',
    cell: ({ getValue }) => (
      <div className="max-w-[150px] truncate">{getValue<string>()}</div>
    ),
  },
]

function extractHourMinute(time: string): string {
  return time.split(':').slice(0, 2).join(':');
}

export default function Home() {
  const [pageSize, setPageSize] = useState(5)
  const [schedules, setSchedules] = useState<ISchedule[]>([])
  const [ubsList, setUbsList] = useState<string[]>([])
  const [selectedUbs, setSelectedUbs] = useState<string>('')
  const [searchName, setSearchName] = useState<string>('')

  function generateUbsList(data: ISchedule[]) {
    const unique = [...new Set(data.map((s) => s.ubsName))]
    setUbsList(unique)
  }

  async function getSchedules() {
    try {
      const { data } = await api.get<ISchedule[]>('schedule')
      const formatted = data.map((s) => ({ ...s, date: new Date(s.date) }))
      setSchedules(formatted)
      generateUbsList(formatted)
    } catch (err) {
      console.log(err);

    }
  }

  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      const matchesUbs =
        selectedUbs === '' || s.ubsName.toLowerCase() === selectedUbs.toLowerCase()
      const matchesName =
        searchName === '' ||
        s.patientName.toLowerCase().includes(searchName.toLowerCase())
      return matchesUbs && matchesName
    })
  }, [schedules, selectedUbs, searchName])

  const table = useReactTable({
    data: filteredSchedules,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize } },
  })

  useEffect(() => {

    // conecta ao servidor backend
    socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
      transports: ['websocket'], // evita fallback a long-polling
    })

    socket.on('connect', () => {
      console.log('✅ Conectado ao servidor Socket.IO')
    })

    socket.on('new-schedule', (data: ISchedule) => {
      const newSchedule = { ...data, date: new Date(data.date) }
      console.log(data);
      setSchedules((current) => {
        const updated = [newSchedule, ...current]
        generateUbsList(updated)
        return updated
      })
    })

    socket.on('disconnect', () => {
      console.log('❌ Desconectado do servidor')
    })

    getSchedules()
  }, [setSchedules])

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 xl:px-0 py-5">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#09483F]">Agendamentos</h1>
        </div>

        <FilterCard
          ubsList={ubsList}
          onSearchChange={setSearchName}
          onUbsChange={setSelectedUbs}
          onClearFilters={() => {
            setSearchName('')
            setSelectedUbs('')
          }}
        />

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow bg-white">
          <table className="min-w-full border-collapse text-sm table-auto">
            <thead className="bg-gray-50 text-[#0A8271] uppercase text-xs font-semibold">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left border-b border-gray-200"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Rodapé com paginação e seletor de linhas */}
          <div className="flex items-center justify-between px-4 py-3 text-sm text-[#0A8271] bg-gray-50 border-t border-gray-200">
            <span>
              Página {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </span>

            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() => table.previousPage()}
              >
                Anterior
              </button>
              <button
                className="px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() => {
                  if (table.getPageCount() <= table.getState().pagination.pageIndex + 1) return
                  table.nextPage()
                }}
              >
                Próxima
              </button>

              <select
                className="ml-4 border rounded px-2 py-1 text-sm"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size} linhas
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
