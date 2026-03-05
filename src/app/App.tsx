import { RouterProvider } from 'react-router';
import { useEffect } from 'react';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const isLowPerf = (navigator.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory || 8) <= 4;
    document.documentElement.setAttribute('data-low-perf', isLowPerf ? 'true' : 'false');
  }, []);

  return <RouterProvider router={router} />;
}
