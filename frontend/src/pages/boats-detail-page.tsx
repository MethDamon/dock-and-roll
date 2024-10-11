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
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  EditIcon,
  TrashIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const BoatsDetailPage = () => {
  const { getToken } = useAuth();
  const { id } = useParams();
  const [boat, setBoat] = useState<Boat | null>(null);
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  const fetchBoat = useCallback(async () => {
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
  }, [getToken, id]);

  useEffect(() => {
    fetchBoat();
  }, [getToken, fetchBoat, id]);

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

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    console.log(data);
    const token = await getToken();
    const response = await fetch(`http://localhost:3000/boats/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (response.ok) {
      fetchBoat();
    }
  };

  const formSchema = z.object({
    name: z.string().min(1, { message: 'You have to enter a name' }),
    description: z
      .string()
      .min(1, { message: 'You have to enter a description' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: boat?.name,
      description: boat?.description,
    },
  });

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
        <CardFooter className="flex flex-row gap-2">
          <div className="flex gap-2 ml-auto">
            <AlertDialog>
              <AlertDialogTrigger className="ml-auto">
                <Button
                  size="sm"
                  className="h-8 ml-auto gap-1"
                  variant="destructive"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
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
            <Dialog>
              <DialogTrigger asChild className="ml-auto">
                <Button size="sm" className="h-8 ml-auto gap-1">
                  <EditIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Edit
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{`Edit ${boat?.name}`}</DialogTitle>
                  <DialogDescription>
                    Click submit when you're done
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      defaultValue={boat?.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder={boat?.name} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      defaultValue={boat?.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder={boat?.description} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogClose
                      type="submit"
                      disabled={!form.formState.isValid}
                    >
                      <Button>Submit</Button>
                    </DialogClose>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    );
  }
};
