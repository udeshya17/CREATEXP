'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortCriterion, SortField, SortDirection } from '@/types/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  GripVertical, 
  ChevronUp, 
  ChevronDown, 
  X, 
  Plus,
  ArrowUpDown,
  Calendar,
  User,
  Hash
} from 'lucide-react';

interface SortPanelProps {
  criteria: SortCriterion[];
  onCriteriaChange: (criteria: SortCriterion[]) => void;
  onApplySort: () => void;
  onClearAll: () => void;
  onClose?: () => void;
}

const sortFieldOptions: { value: SortField; label: string; icon: React.ReactNode }[] = [
  { value: 'clientName', label: 'Client Name', icon: <User className="w-4 h-4" /> },
  { value: 'createdAt', label: 'Created At', icon: <Calendar className="w-4 h-4" /> },
  { value: 'updatedAt', label: 'Updated At', icon: <Calendar className="w-4 h-4" /> },
  { value: 'clientId', label: 'Client ID', icon: <Hash className="w-4 h-4" /> },
];

interface SortableItemProps {
  criterion: SortCriterion;
  onDirectionToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

function SortableItem({ criterion, onDirectionToggle, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: criterion.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const fieldOption = sortFieldOptions.find(option => option.value === criterion.field);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 bg-white border rounded-lg transition-all duration-200 ${
        isDragging ? 'shadow-lg opacity-50 scale-105' : 'shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-3">
        <button
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </button>
        
        <div className="flex items-center space-x-2">
          {fieldOption?.icon}
          <span className="font-medium">{criterion.label}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDirectionToggle(criterion.id)}
          className="flex items-center space-x-1"
        >
          {criterion.direction === 'asc' ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>A-Z</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Z-A</span>
            </>
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(criterion.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function SortPanel({ criteria, onCriteriaChange, onApplySort, onClearAll, onClose }: SortPanelProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = criteria.findIndex(item => item.id === active.id);
      const newIndex = criteria.findIndex(item => item.id === over?.id);
      
      onCriteriaChange(arrayMove(criteria, oldIndex, newIndex));
    }
  };

  const handleDirectionToggle = (id: string) => {
    const updatedCriteria = criteria.map(criterion =>
      criterion.id === id
        ? { ...criterion, direction: criterion.direction === 'asc' ? 'desc' : 'asc' as SortDirection }
        : criterion
    );
    onCriteriaChange(updatedCriteria);
  };

  const handleRemove = (id: string) => {
    onCriteriaChange(criteria.filter(criterion => criterion.id !== id));
  };

  const handleAddCriterion = (field: SortField) => {
    const fieldOption = sortFieldOptions.find(option => option.value === field);
    if (!fieldOption) return;

    // Check if this field is already being sorted
    if (criteria.some(criterion => criterion.field === field)) return;

    const newCriterion: SortCriterion = {
      id: `${field}-${Date.now()}`,
      field,
      direction: 'asc',
      label: fieldOption.label,
    };

    onCriteriaChange([...criteria, newCriterion]);
  };

  const availableFields = sortFieldOptions.filter(
    option => !criteria.some(criterion => criterion.field === option.value)
  );

  return (
    <div className="w-80 bg-gray-50 border-l p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-5 h-5" />
          <h3 className="font-semibold">Sort By</h3>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={criteria.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {criteria.map((criterion) => (
              <SortableItem
                key={criterion.id}
                criterion={criterion}
                onDirectionToggle={handleDirectionToggle}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {availableFields.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Sort Criterion
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {availableFields.map((field) => (
              <DropdownMenuItem
                key={field.value}
                onClick={() => handleAddCriterion(field.value)}
                className="flex items-center space-x-2"
              >
                {field.icon}
                <span>{field.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div className="flex space-x-2 pt-4 border-t">
        <Button onClick={onClearAll} variant="outline" className="flex-1">
          Clear all
        </Button>
        <Button onClick={onApplySort} className="flex-1 bg-black text-white hover:bg-gray-800">
          Apply Sort
        </Button>
      </div>
    </div>
  );
}
