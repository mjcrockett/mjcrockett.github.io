import React, { useState, useEffect, useRef } from 'react';
import { useInteract } from '../shared/contexts/interaction';
import { useData } from './data-context';

export interface IAudioProps {
    play: (playing: boolean) => void;
    canPlayThrough: (duration: number) => void;
    finish: (ended: boolean) => void;
    pause: (paused: boolean) => void;
    timeUpdate: (timeUpdate: number) => void; 
    isReady: (ready: boolean) => void;
}

export default function Audio(aProps: IAudioProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [noAutoPlay, setNoAutoPlay] = useState(false);
    const { setInteracted } = useInteract();
    const { selectedParent, selectedInstructions, fetchRandomAvoidId } = useData();
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) {
            return;
        }
        const handlePlay = () => { aProps.play(true); setIsPlaying(true); };
        const handleCanPlayThrough = () => { 
            aProps.canPlayThrough(audioElement.duration); 
            setIsPlaying(true); 
            play(); 
        };
        const handlePause = () => { aProps.pause(true); setIsPlaying(false); };
        const handleEnded = () => { aProps.finish(true); setIsPlaying(false); };
        const timeupdate = () => { aProps.timeUpdate(audioElement.currentTime); setIsPlaying(false); };
    
        audioElement.addEventListener('play', handlePlay);
        audioElement.addEventListener('canplaythrough', handleCanPlayThrough);
        audioElement.addEventListener('pause', handlePause);
        audioElement.addEventListener('ended', handleEnded);
        audioElement.addEventListener('timeupdate', timeupdate);
    
        aProps.isReady(true);
        //cleanup
        return () => {
            audioElement.removeEventListener('play', handlePlay);
            audioElement.removeEventListener('canplaythrough', handleCanPlayThrough);
            audioElement.removeEventListener('pause', handlePause);
            audioElement.removeEventListener('ended', handleEnded);
            audioElement.removeEventListener('timeupdate', timeupdate);
        };
      }, []);

      useEffect(() => {
        if (!!selectedParent?.Id && selectedInstructions?.length > 0) {
          console.log('Data is ready');

        //   changeSource('audio/thoughts/' + selectedParent.Audio);
            // setTimeout(() => {
            //     fetchRandomAvoidId();
            // },4000);
        }
        
      }, [selectedParent, selectedInstructions]);

    const changeSource = (audio?: string) => {
        const audioElement = audioRef.current;

        if (audio && audioElement) {
            audioElement.src = audio;
            audioElement.load();
        }
        else {

            let interval = setInterval(() => {
                if (audio && audioElement) {
                    audioElement.src = audio;
                    clearInterval(interval);
                }
            }, 1000);
        }
    };

    const play = () => {
        const audioElement = audioRef.current;
        if (!audioElement) {
            return;
        }

        let promise = audioElement.play();
        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
                setNoAutoPlay(false);
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
                setNoAutoPlay(true);
                setInteracted(false);
            });
        }
    }

    return (
        <audio ref={audioRef}></audio>
    );
  
}
function fetchRandomAvoidId() {
    throw new Error('Function not implemented.');
}

