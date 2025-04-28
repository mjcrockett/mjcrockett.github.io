'use client';
import React, { useEffect, useRef } from "react";
import { useData } from "./data-context";
import { useAudio } from "../shared/contexts/audio-context";
import { useInteract } from "../shared/contexts/interaction-context";
import { BackgroundMusic } from "../shared/constants/background-constants";

export default function Initializer({avatarReady} : {avatarReady: boolean}) {
  const { audioRef, audioReady, ended, changeSource } = useAudio();
  const { selectedInstructions, selectedParent, fetchRandomAvoidId } = useData();
  const { interacted } = useInteract();
  const bgSoundRef = useRef<HTMLAudioElement>(null);
  const loadingNew = useRef<boolean>(false);
  
  useEffect(() => {
    if (avatarReady && audioReady && !!selectedParent?.Id && selectedInstructions?.length > 0 && !loadingNew.current) {
      console.log('loading');
      loadingNew.current = true;
      //This starts the whole loop process V
      changeSource('audio/thoughts/' + selectedParent.Audio);
    }
  }, [avatarReady, audioReady, selectedParent, selectedInstructions]);

  useEffect(() => {
    if (interacted && audioRef) {
      console.log('interacted');
      //This will trigger the 'canPlayThrough' event which will then play the audio
      audioRef.load();

      if (bgSoundRef?.current) {
        bgSoundRef.current.play();
        bgSoundRef.current.loop = true;
        bgSoundRef.current.volume = 0.5;
      }
    }
  }, [interacted]);

  useEffect(() => {
    if (ended === true) {
      console.log('ended');
      loadingNew.current = false;
      fetchRandomAvoidId(selectedParent.Id);
    }
  }, [ended]);

  return (
    <>
      <audio ref={bgSoundRef} src={BackgroundMusic}/>
    </>
  );
}