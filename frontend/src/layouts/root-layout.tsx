import { Boats } from '@/pages/boats-overview-page';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Header } from '@/components/header';
import { SideNavigation } from '@/components/side-navigation';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  ClerkProvider,
} from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { Outlet } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export const RootLayout = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ClerkProvider
      appearance={useTheme().theme === 'dark' ? { baseTheme: dark } : {}}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <SignedIn>
        <div className="flex min-h-screen w-full flex-col">
          <SideNavigation />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
            <main className="grid flex-1 items-start gap-4 p-6 sm:px-6 sm:py-0 md:gap-4">
              <Breadcrumbs />
              <Outlet />
            </main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  </ThemeProvider>
);
