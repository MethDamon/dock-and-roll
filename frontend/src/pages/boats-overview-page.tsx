import { PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { BoatsList } from '../components/boats-list';
import { useCallback, useEffect, useState } from 'react';
import { Boat } from '../types';
import { useAuth } from '@clerk/clerk-react';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';

import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
export const BoatsOverviewPage = () => {
  const [boats, setBoats] = useState<Boat[]>([]);
  const { getToken } = useAuth();

  const fetchBoats = useCallback(async () => {
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
  }, [getToken]);

  useEffect(() => {
    fetchBoats();
  }, [fetchBoats, getToken]);

  const formSchema = z.object({
    name: z.string().min(1, { message: 'You have to enter a name' }),
    description: z
      .string()
      .min(1, { message: 'You have to enter a description' }),
    imageUrl: z.string().url(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: 'https://loremflickr.com/g/64/64/boat,dock/all',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const token = await getToken();
    console.log(data);
    const response = await fetch('http://localhost:3000/boats', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.ok) {
      fetchBoats();
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 ml-auto gap-1">
            <PlusCircleIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Boat
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new boat</DialogTitle>
            <DialogDescription>
              Create a new boat. Click Save when you're all done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the boat's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the boat's description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose type="submit" disabled={!form.formState.isValid}>
                <Button>Submit</Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <BoatsList boats={boats} />
    </>
  );
};
