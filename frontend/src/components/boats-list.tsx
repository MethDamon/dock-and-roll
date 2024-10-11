import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { Boat } from '@/types';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { EditIcon, MoreHorizontal, Trash2Icon } from 'lucide-react';

export const BoatsList = ({ boats }: { boats?: Boat[] }) => {
  return (
    <Card>
      <CardHeader className="mt-2 text-left">
        <CardTitle>Boats</CardTitle>
        <CardDescription>Manage your boats</CardDescription>
      </CardHeader>
      <CardContent>
        {boats && boats.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {boats?.map((boat) => (
                <TableRow key={boat.id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={boat.imageUrl || '/placeholder.svg'}
                      width="64"
                    />
                  </TableCell>
                  <TableCell align="left" className="font-medium">
                    {boat.name}
                  </TableCell>
                  <TableCell align="left" className="font-medium">
                    {boat.description}
                  </TableCell>
                  <TableCell align="right">
                    <div className="w-full sm:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="max-sm:hidden flex">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost">
                              <EditIcon className="h-5 w-5" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost">
                              <Trash2Icon className="h-5 w-5 stroke-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">Delete</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex">
            <span className="text-sm font-light">No boats yet.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
