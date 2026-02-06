'use client';
import React from 'react';
import { VolumeProvider } from '../contexts/volume-context';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <VolumeProvider>
            {children}
        </VolumeProvider>
    );
}
