import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useInteract } from './interaction-context';
// import { useData } from './data-context';

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
    changeSource: (audio?: string) => {}
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
    const { interacted, setInteracted } = useInteract();
    // const { selectedParent, selectedInstructions, fetchRandomAvoidId } = useData();
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
            // setIsPlaying(true); 
        };
        const handleCanPlayThrough = () => { 
            setOnCanPlayThrough(audioRef.duration); 
            // setIsPlaying(true); 
            play(); 
        };
        const handlePause = () => { 
            setOnPause(true); 
            // setIsPlaying(false); 
        };
        const handleEnded = () => { 
            setOnEnded(true); 
            // setIsPlaying(false);
         };
        // const timeupdate = () => { 
        //     aProps.timeUpdate(audioElement.currentTime); 
        //     setIsPlaying(false); 
        // };
    
        audioRef.addEventListener('play', handlePlay);
        audioRef.addEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.addEventListener('pause', handlePause);
        audioRef.addEventListener('ended', handleEnded);
        // audioRef.addEventListener('timeupdate', timeupdate);
    
        setOnAudioReady(true);
        //cleanup
        return () => {
            audioRef.removeEventListener('play', handlePlay);
            audioRef.removeEventListener('canplaythrough', handleCanPlayThrough);
            audioRef.removeEventListener('pause', handlePause);
            audioRef.removeEventListener('ended', handleEnded);
            // audioRef.removeEventListener('timeupdate', timeupdate);
        };
    }, [audioRef]);

    // useEffect(() => {
    //     if (!!selectedParent?.Id && selectedInstructions?.length > 0) {
    //         console.log('Data is ready');

    //         changeSource('audio/thoughts/' + selectedParent.Audio);
    //         // setTimeout(() => {
    //         //     fetchRandomAvoidId();
    //         // },4000);
    //     }
    
    // }, [selectedParent, selectedInstructions]);

    useEffect(() => {
        if (interacted && audioRef) {
            audioRef.load();
        }
    }, [interacted]);


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
                // setNoAutoPlay(false);
                setInteracted(true);
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
                // setNoAutoPlay(true);
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
