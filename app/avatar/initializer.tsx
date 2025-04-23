'use client';
import React, { useEffect } from "react";
import { useData } from "./data-context";
import { useAudio } from "../shared/contexts/audio-context";
import { useInteract } from "../shared/contexts/interaction-context";

export default function Initializer({avatarReady} : {avatarReady: boolean}) {
  const { audioRef, audioReady, ended, changeSource } = useAudio();
  const { selectedInstructions, selectedParent, fetchRandomAvoidId } = useData();
  const { interacted } = useInteract();
  
  useEffect(() => {
    if (avatarReady && audioReady && !!selectedParent?.Id && selectedInstructions?.length > 0) {
      //This starts the whole loop process V
      changeSource('audio/thoughts/' + selectedParent.Audio);
    }
  }, [avatarReady, audioReady, selectedParent, selectedInstructions]);

  useEffect(() => {
    if (interacted && audioRef) {
      //This will trigger the 'canPlayThrough' event which will then play the audio
      audioRef.load();
    }
  }, [interacted]);

  useEffect(() => {
    if (ended === true) {
      fetchRandomAvoidId(selectedParent.Id);
    }
  }, [ended]);

  return (
    <></>
  );
}