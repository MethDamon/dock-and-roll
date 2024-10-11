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
import useRandomBoatImage from '@/lib/hooks';
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
import { useNavigate } from 'react-router-dom';

export const BoatsList = ({ boats }: { boats?: Boat[] }) => {
  const navigate = useNavigate();
  const randomBoatImageUrl = useRandomBoatImage();
  console.log(randomBoatImageUrl);
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {boats?.map((boat) => (
                <TableRow
                  key={boat.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/boats/${boat.id}`)}
                >
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="Boat image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={boat.imageUrl}
                      width="64"
                    />
                  </TableCell>
                  <TableCell align="left" className="font-medium">
                    {boat.name}
                  </TableCell>
                  <TableCell align="left" className="font-medium">
                    {boat.description}
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
