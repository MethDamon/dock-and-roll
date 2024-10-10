import { UserButton } from '@clerk/clerk-react';
import { PanelLeft, ShipIcon } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { SheetTrigger, SheetContent, Sheet } from './ui/sheet';

export const Header = () => (
  <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <a
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <ShipIcon className="h-5 w-5" />
            Boats
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <div className="ml-auto flex items-center gap-2">
      <ModeToggle />
      <UserButton />
    </div>
  </header>
);
