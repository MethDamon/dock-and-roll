import { PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { BoatsList } from '../components/boats-list';
import { useEffect, useState } from 'react';
import { Boat } from '../types';
import { useAuth } from '@clerk/clerk-react';

export const BoatsOverviewPage = () => {
  const [boats, setBoats] = useState<Boat[]>([]);
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchBoats = async () => {
      const token = await getToken();
      const response = await fetch('http://localhost:3000/boats', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.ok) {
        const boats = await response.json();
        setBoats(boats);
      }
    };
    fetchBoats();
  }, [getToken]);

  return (
    <>
      <Button size="sm" className="h-8 ml-auto gap-1">
        <PlusCircleIcon className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Boat
        </span>
      </Button>
      <BoatsList boats={boats} />
    </>
  );
};
