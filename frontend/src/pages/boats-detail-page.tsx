import { Boat } from '@/types';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import {} from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const BoatsDetailPage = () => {
  const { getToken } = useAuth();
  const { id } = useParams();
  const [boat, setBoat] = useState<Boat | null>(null);
  useEffect(() => {
    const fetchBoat = async () => {
      const token = await getToken();
      console.log(id);
      const response = await fetch(`http://localhost:3000/boats/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.ok) {
        const boat = await response.json();
        setBoat(boat);
      }
    };
    fetchBoat();
  }, [getToken, id]);

  return <div>{JSON.stringify(boat)}</div>;
};
