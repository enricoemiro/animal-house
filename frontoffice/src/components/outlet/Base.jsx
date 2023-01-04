import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/shared/partials/Footer';
import Header from '@/components/shared/partials/Header';

function Base() {
  useEffect(() => {
    const root = document.getElementById('root');

    root.classList.add('flex', 'flex-col', 'min-h-screen');

    return () => {
      root.classList.remove('flex', 'flex-col', 'min-h-screen');
    };
  }, []);

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Base;
