'use client';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './shared/components/navbar';
import React, { useEffect, useState } from 'react';
import { AppRoutes } from './shared/routes';
import Interaction from './shared/components/interaction';

export default function Home() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    return (
      
      <Interaction>
        <Router>
          <NavBar />
          <div className="center-container">
            <AppRoutes />
          </div>
        </Router>
      </Interaction>
    );
  }
  return (null)
}


