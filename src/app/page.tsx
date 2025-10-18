'use client'

import { Header } from '@/components/header'
import { ISchedule } from '@/interfaces/ISchedule'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'

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
  { accessorKey: 'patientName', header: 'Nome do Paciente' },
  { accessorKey: 'document', header: 'Documento do Paciente' },
  { accessorKey: 'ubsName', header: 'Ubs' },
  { accessorKey: 'date', header: 'Data' },
  { accessorKey: 'hour', header: 'Horario' },
  { accessorKey: 'doctorName', header: 'Médico' },
]

export default function Home() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Cabeçalho da página */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Agendamentos</h1>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow bg-white">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
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
          <div className="px-4 py-3 text-sm text-gray-500 bg-gray-50 border-t border-gray-200">
            Total de Agendamentos: {data.length}
          </div>
        </div>
      </div>
    </main>
  )
}
