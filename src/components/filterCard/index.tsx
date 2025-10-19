import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '../datePicker';
import { OnSelectHandler } from 'react-day-picker';

interface FilterCardProps {
  ubsList: string[]
  onSearchChange: (value: string) => void
  onUbsChange: (value: string) => void
  onClearFilters: () => void
  searchName: string
  selectedUbs: string
  date: Date | undefined,
  setDate: OnSelectHandler<Date | undefined>
}

export const FilterCard = ({
  ubsList,
  onSearchChange,
  onUbsChange,
  onClearFilters,
  searchName,
  selectedUbs,
  date,
  setDate
}: FilterCardProps) => {
  return (
    <section className="bg-white rounded-lg shadow border-2 p-4 mb-3">
      <div className="max-w-6xl items-center m-auto">
        <h1 className="font-bold text-[#09483F] text-lg">Filtros</h1>
        <div className="flex justify-between mt-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className='flex flex-wrap lg:flex-nowrap gap-2 w-full mr-16'>
            <Input
              icon={Search}
              placeholder='Pesquise por nome'
              onChange={(e) => onSearchChange(e.target.value)}
              className='bg-gray-50 h-9 rounded-lg border-2 border-[#5EB2BA] focus:border-[#0A8271] text-[#09483F] font-semibold text-sm shadow-sm transition-all duration-150 cursor-text outline-none'
            />
            <Select onValueChange={onUbsChange} value={selectedUbs}>
              <SelectTrigger className="bg-gray-50 w-full sm:w-[200px] h-9 rounded-lg border-2 border-[#5EB2BA] focus:border-[#0A8271] text-[#09483F] font-semibold px-3 text-sm shadow-sm transition-all duration-150 cursor-pointer outline-none">
                <SelectValue placeholder="Selecione uma UBS" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50 p-2 rounded-xl shadow-lg">
                <SelectGroup>
                  {ubsList.map((ubs, index) => (
                    <SelectItem
                      key={`SelectItem ${index}`}
                      value={ubs}
                      className="px-2 cursor-pointer font-semibold text-[#09483F] focus:text-white focus:bg-[#0A8271] rounded-md transition-colors"
                    >
                      {ubs}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <DatePicker date={date} setDate={setDate} />
          </div>

          <Button
            variant="default"
            onClick={onClearFilters}
            className='bg-white hover:bg-[#bd0000] text-[#bd0000] hover:text-white border-[#bd0000] border-2 cursor-pointer'
          >
            Remover Filtros
          </Button>
        </div>
      </div>
    </section>
  )
}
