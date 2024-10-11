import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Boat } from '@/types';
import { useAuth } from '@clerk/clerk-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AlertTriangleIcon, ArrowLeftIcon, EditIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BoatsDetailPage = () => {
  const { getToken } = useAuth();
  const { id } = useParams();
  const [boat, setBoat] = useState<Boat | null>(null);
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const fetchBoat = async () => {
      const token = await getToken();
      const response = await fetch(`http://localhost:3000/boats/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.ok) {
        const boat = await response.json();
        setBoat(boat);
      } else if (response.status === 404) {
        setNotFound(true);
      }
    };
    fetchBoat();
  }, [getToken, id]);

  const deleteBoat = async () => {
    const token = await getToken();
    const response = await fetch(`http://localhost:3000/boats/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      method: 'DELETE',
    });
    console.log(response);
    if (response.ok) {
      navigate('/');
    }
  };

  if (notFound) {
    return (
      <div className="mt-4 flex-col flex gap-2">
        <span className="flex items-center gap-1">
          <AlertTriangleIcon className="h-3.5 w-3.5 stroke-red-500" />
          <span>Boat was not found</span>
        </span>
        <Link className="underline flex items-center gap-1" to={'/'}>
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Return home
        </Link>
      </div>
    );
  } else {
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
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                size="sm"
                className="h-8 ml-auto gap-1"
                variant="destructive"
              >
                <EditIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Delete
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{`Are you absolutely sure you want to delete ${boat?.name}?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this boat from your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBoat()}>
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button size="sm" className="h-8 gap-1">
            <EditIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Edit
            </span>
          </Button>
        </CardFooter>
      </Card>
    );
  }
};
