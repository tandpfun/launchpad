'use client';

import { Plus } from 'lucide-react';
import Person, { PersonData } from './Person';

// Color palette for people
const COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
];

const getColorForIndex = (index: number): string => {
  return COLORS[index % COLORS.length];
};

interface PeopleListProps {
  people: PersonData[];
  videoDuration: number | null;
  onPeopleChange: (people: PersonData[]) => void;
}

export default function PeopleList({ people, videoDuration, onPeopleChange }: PeopleListProps) {
  const handleAddPerson = () => {
    const newPerson: PersonData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: `Person ${people.length + 1}`,
      picture: null,
      segments: undefined, // Default: no segments, show full bar
      color: getColorForIndex(people.length),
    };
    onPeopleChange([...people, newPerson]);
  };

  const handleRemovePerson = (id: string) => {
    onPeopleChange(people.filter((person) => person.id !== id));
  };

  const handlePictureChange = (id: string, file: File | null) => {
    onPeopleChange(
      people.map((person) =>
        person.id === id ? { ...person, picture: file } : person
      )
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-zinc-500">PEOPLE</div>
      <div className="flex flex-col gap-2">
        {people.map((person, index) => {
          // Ensure person has a color
          const personWithColor = {
            ...person,
            color: person.color || getColorForIndex(index),
          };
          return (
            <Person
              key={person.id}
              person={personWithColor}
              videoDuration={videoDuration}
              onRemove={handleRemovePerson}
              onPictureChange={handlePictureChange}
            />
          );
        })}
        <button
          onClick={handleAddPerson}
          className="bg-zinc-100 hover:bg-zinc-200 border-2 border-dashed border-zinc-300 rounded-md cursor-pointer transition flex items-center justify-center w-full p-2 text-sm text-zinc-900"
        >
          <Plus className="h-4 w-4" />
          Add Person
        </button>
      </div>
    </div>
  );
}

