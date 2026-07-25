import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-slate-900 tracking-tight">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mt-4 mb-2">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button size="lg">Go back home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
