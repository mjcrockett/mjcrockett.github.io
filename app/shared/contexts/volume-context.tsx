'use client';
import React, { useState, useEffect, createContext, useContext } from 'react';

interface IVolumeContext {
    volume: number;
    setVolume: (volume: number) => void;
}

const VolumeContext = createContext<IVolumeContext>({
    volume: 1,
    setVolume: () => {}
});

export const useVolume = () => useContext(VolumeContext);

export function VolumeProvider({ children }: { children: React.ReactNode }) {
    const [volume, setVolumeState] = useState(1);

    useEffect(() => {
        const stored = localStorage.getItem('volume');
        if (stored !== null) {
            const parsed = parseFloat(stored);
            if (!isNaN(parsed)) {
                setVolumeState(Math.min(1, Math.max(0, parsed)));
            }
        }
    }, []);

    const setVolume = (v: number) => {
        const clamped = Math.min(1, Math.max(0, v));
        setVolumeState(clamped);
        localStorage.setItem('volume', String(clamped));
    };

    return (
        <VolumeContext.Provider value={{ volume, setVolume }}>
            {children}
        </VolumeContext.Provider>
    );
}
