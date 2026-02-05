'use client';
import React, { useEffect, useState } from 'react';
import Interaction from './shared/contexts/interaction-context';
import AvatarPage from './avatar/page';
import styles from './page.module.css';

export default function Home() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    return (
      <Interaction>
        <div className={styles.centerContainer}>
          <AvatarPage />
        </div>
      </Interaction>
    );
  }
  return (null)
}


