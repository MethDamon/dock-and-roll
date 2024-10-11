import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { BoatsOverviewPage } from './pages/boats-overview-page.tsx';
import { BoatsDetailPage } from './pages/boats-detail-page.tsx';
import { RootLayout } from './layouts/root-layout.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/boats" replace /> },
      {
        path: '/boats',
        element: <BoatsOverviewPage />,
        handle: {
          crumb: () => 'My Boats',
        },
      },
      {
        path: '/boats/:id',
        element: <BoatsDetailPage />,
        handle: {
          crumb: () => 'Details',
        },
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
