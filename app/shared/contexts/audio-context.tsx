import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useInteract } from './interaction-context';

export interface IAudioContext {
    playing: boolean;
    canPlayThrough: number;
    ended: boolean;
    paused: boolean;
    audioReady: boolean;
    audioRef: HTMLAudioElement | null;
    changeSource: (audio?: string) => void;
}

const AudioContext = createContext<IAudioContext>({
    playing: false,
    canPlayThrough: 0,
    ended: false,
    paused: false,
    audioReady: false,
    audioRef: null,
    changeSource: () => {}
});

//Custom hook
export const useAudio = () => useContext(AudioContext);

type AppProviderProps = {
    children: React.ReactNode;
};

function AudioProvider({ children }: AppProviderProps) {
    const [playing, setOnPlay] = useState(false);
    const [canPlayThrough, setOnCanPlayThrough] = useState(0);
    const [ended, setOnEnded] = useState(false);
    const [paused, setOnPause] = useState(false);
    const [audioReady, setOnAudioReady] = useState(false);
    const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
    const { setInteracted } = useInteract();
    const ref = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        setAudioRef(ref.current);
    }, []);

    useEffect(() => {
        if (!audioRef) {
            return;
        }
        const handlePlay = () => { 
            setOnPlay(true); 
            setOnEnded(false);
            setOnPause(false);
        };
        const handleCanPlayThrough = () => { 
            console.log('loaded');
            setOnCanPlayThrough(audioRef.duration); 
            play(); 
        };
        const handlePause = () => { 
            setOnPlay(false); 
            setOnEnded(false);
            setOnPause(true);
        };
        const handleEnded = () => { 
            setOnPlay(false); 
            setOnEnded(true);
            setOnPause(false);
         };
    
        audioRef.addEventListener('play', handlePlay);
        audioRef.addEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.addEventListener('pause', handlePause);
        audioRef.addEventListener('ended', handleEnded);
    
        setOnAudioReady(true);
        return () => {
            audioRef.removeEventListener('play', handlePlay);
            audioRef.removeEventListener('canplaythrough', handleCanPlayThrough);
            audioRef.removeEventListener('pause', handlePause);
            audioRef.removeEventListener('ended', handleEnded);
        };
    }, [audioRef]);

    const changeSource = (audio?: string) => {
        if (audio && audioRef) {
            audioRef.src = audio;
            audioRef.load();
        }
        else {

            let interval = setInterval(() => {
                if (audio && audioRef) {
                    audioRef.src = audio;
                    clearInterval(interval);
                }
            }, 1000);
        }
    };

    const play = () => {
        if (!audioRef) {
            return;
        }

        let promise = audioRef.play();
        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
                setInteracted(true);
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
                setInteracted(false);
            });
        }
    }

    return (
        <AudioContext.Provider value={
            {
                playing,
                canPlayThrough,
                ended,
                paused,
                audioReady,
                audioRef,
                changeSource
            }}>
            <audio ref={ref}></audio>
            {children}
        </AudioContext.Provider>
    );

}

export default AudioProvider;
