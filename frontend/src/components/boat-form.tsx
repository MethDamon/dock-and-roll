import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@clerk/clerk-react';
import { DialogClose } from './ui/dialog';

export const BoatForm = () => {
  const { getToken } = useAuth();
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
    await fetch('http://localhost:3000/boats', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
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
                <Input placeholder="Enter the boat's description" {...field} />
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
  );
};
