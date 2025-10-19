'use client'

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
import { useState } from 'react'

const data: ISchedule[] = [
  {
    id: '1',
    ubsName: 'ulissses',
    patientName: 'Joao',
    document: '000.000.000-00',
    date: new Date(),
    hour: '14:00',
    doctorName: 'Fulano',
  },
  {
    id: '2',
    ubsName: 'são francisco',
    patientName: 'Leo',
    document: '111.111.111-11',
    date: new Date(),
    hour: '15:00',
    doctorName: 'Fulano',
  },
  {
    id: '3',
    ubsName: 'Centro',
    patientName: 'Clara',
    document: '222.222.222-22',
    date: new Date(),
    hour: '16:00',
    doctorName: 'Fulano',
  },
]

const columns: ColumnDef<ISchedule>[] = [
  { accessorKey: 'patientName', header: 'Paciente' },
  { accessorKey: 'document', header: 'Documento do Paciente' },
  { accessorKey: 'ubsName', header: 'Ubs' },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ getValue }) => {
      const date: Date = getValue() as Date
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
  },
  { accessorKey: 'hour', header: 'Horario' },
  { accessorKey: 'doctorName', header: 'Médico' },
]

export default function Home() {
  const [dataState, setDataState] = useState(data)
  const [pageSize, setPageSize] = useState(10)

  const table = useReactTable({
    data: dataState,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: pageSize },
    },
  })

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 xl:px-0 py-10">
        {/* Cabeçalho da página */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#09483F]">Agendamentos</h1>
        </div>

        <FilterCard />

        {/* Tabela */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow bg-white">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-50 text-[#0A8271] uppercase text-xs font-semibold">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={`obs ${header.id}`}
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
                    <td key={`td - ${cell.id}`} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Rodapé opcional */}
          <div className="flex items-center justify-between px-4 py-3 text-sm text-[#0A8271] bg-gray-50 border-t border-gray-200">
            <div className="px-4 py-3 text-sm text-[#0A8271] bg-gray-50">
              Total de Agendamentos: {data.length}
            </div>
            <span>
              Página {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </span>

            <div className="flex gap-2">
              <button
                className="px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </button>
              <button
                className="px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
