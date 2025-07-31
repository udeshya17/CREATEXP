'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface DateRangeFilterProps {
  label: string;
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangeFilter({ label, value, onChange }: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDateRange = (range: DateRange) => {
    if (!range.from) return 'Select dates';
    if (!range.to) return range.from.toLocaleDateString();
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
  };

  const clearFilter = () => {
    onChange({ from: undefined, to: undefined });
  };

  const hasFilter = value.from || value.to;

  return (
    <div className="flex items-center space-x-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`justify-start text-left font-normal ${
              hasFilter ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <h4 className="font-medium">{label}</h4>
            <p className="text-sm text-gray-600">{formatDateRange(value)}</p>
          </div>
          <Calendar
            mode="range"
            selected={value}
            onSelect={(range) => {
              if (range) {
                onChange(range);
              }
            }}
            numberOfMonths={1}
            className="p-3"
          />
          <div className="p-3 border-t flex justify-between">
            <Button variant="outline" size="sm" onClick={clearFilter}>
              Clear
            </Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {hasFilter && (
        <Badge variant="secondary" className="flex items-center space-x-1">
          <span className="text-xs">{formatDateRange(value)}</span>
          <button onClick={clearFilter} className="ml-1">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  );
}
