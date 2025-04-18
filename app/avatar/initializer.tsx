'use client';
import React, { useEffect } from "react";
import { useData } from "./data-context";
import { useAudio } from "../shared/contexts/audio-context";

export default function Initializer({avatarReady} : {avatarReady: boolean}) {
  const { audioReady, changeSource } = useAudio();
  const { selectedInstructions, selectedParent } = useData();

useEffect(() => {
    if (avatarReady && audioReady && !!selectedParent?.Id && selectedInstructions?.length > 0) {
      //This starts the whole loop process V
      changeSource('audio/thoughts/' + selectedParent.Audio);
    }
  }, [avatarReady, audioReady, selectedParent, selectedInstructions]);

  return (
    <></>
  );
}