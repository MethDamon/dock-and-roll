import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { Boats } from './Boats';
import { Breadcrumbs } from './components/breadcrumbs';
import { Header } from './components/header';
import { SideNavigation } from './components/side-navigation';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SignedIn>
        <div className="flex min-h-screen w-full flex-col">
          <SideNavigation />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
            <main className="grid flex-1 items-start gap-4 p-6 sm:px-6 sm:py-0 md:gap-4">
              <Breadcrumbs />
              <Boats />
            </main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ThemeProvider>
  );
}
