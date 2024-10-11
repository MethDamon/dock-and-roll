import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Boat } from '@/types';
import { useAuth } from '@clerk/clerk-react';
import { EditIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{boat?.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-row items-start mt-4 gap-4">
        <div className="w-1/3 h-[300px]">
          {boat ? (
            <img
              width={300}
              height={300}
              src={boat.imageUrl}
              alt="Boat image"
              className="rounded-lg object-contain"
            />
          ) : (
            <Skeleton className="w-[300px] h-[300px] rounded-md" />
          )}
        </div>

        <div className="w-2/3 flex items-start">
          {boat ? (
            <dl>
              <dt className="mb-2 font-semibold">Name</dt>
              <dd className="mb-2 font-light">{boat?.name}</dd>

              <dt className="mb-2 font-semibold">Description</dt>
              <dd className="mb-2 font-light">{boat?.description}</dd>
            </dl>
          ) : (
            <Skeleton className="w-full h-[300px]" />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex ml-auto justify-end gap-4">
        <Button size="sm" className="h-8 gap-1">
          <EditIcon className="h-3.5 w-3.5" />
          <span>Edit</span>
        </Button>
        <Button size="sm" className="h-8 gap-1" variant="destructive">
          <TrashIcon className="h-3.5 w-3.5" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
