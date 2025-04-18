'use client';
import React, { useState } from "react";
import { useInteract } from '../shared/contexts/interaction-context';
import Overlay from "../shared/components/overlay";
import DataProvider from "./data-context";
import AudioProvider from "../shared/contexts/audio-context";
import Avatar from "./avatar";
import Initializer from "./initializer";

export default function AvatarPage() {
  const [avatarReady, setAvatarReady] = useState(false);
  const { interacted } = useInteract();

  const avatarOnReady = () => {
    setAvatarReady(true);
  };

  return (
    <DataProvider>
      <AudioProvider>
        <Initializer avatarReady={avatarReady}></Initializer>
        {
          !interacted &&
          <Overlay></Overlay>
        }
        <Avatar avatarReady={avatarOnReady}></Avatar>
      </AudioProvider>
    </DataProvider>
  );
}