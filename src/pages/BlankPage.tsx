import React from 'react';
import { ModernNavbar } from '@/components/ModernNavbar';

const BlankPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModernNavbar 
        logo={{
          text: "My Website",
          url: "/"
        }}
      />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-3xl font-bold">Welcome to My Website</h1>
        <p className="mt-4">This is a blank page with a modern navigation bar. Scroll down to see the navbar's background blur effect.</p>
        <div className="h-[200vh]"></div>
      </div>
    </div>
  );
};

export default BlankPage; 