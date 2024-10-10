import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import './App.css';
import { Boats } from './Boats';
import { ThemeProvider } from './components/theme-provider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SignedIn>
        <Boats />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ThemeProvider>
  );
}
