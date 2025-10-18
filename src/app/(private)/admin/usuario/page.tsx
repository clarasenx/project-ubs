'use client'

import { IUser } from '@/interfaces/IUser'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'

const data: IUser[] = [
  {
    id: '1',
    email: 'example1@gmail.com',
    name: 'example 1',
    password: 'password',
    userType: 'admin',
  },
  {
    id: '2',
    email: 'example2@gmail.com',
    name: 'example 2',
    password: 'password',
    userType: 'doctors',
  },
  {
    id: '3',
    email: 'example3@gmail.com',
    name: 'example 3',
    password: 'password',
    userType: 'doctors',
  },
]

const columns: ColumnDef<IUser>[] = [
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'userType', header: 'Tipo de Usuário' },
]

export default function Usuario() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho da página */}
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
            + Novo Usuário
          </button>
        </header>

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
            Mostrando {data.length} usuário(s)
          </div>
        </div>
      </div>
    </main>
  )
}
