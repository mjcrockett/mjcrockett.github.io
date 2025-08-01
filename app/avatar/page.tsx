'use client';
import React, { useEffect, useState } from "react";
import { useInteract } from '../shared/contexts/interaction-context';
import Overlay from "../shared/components/overlay";
import DataProvider from "./data-context";
import AudioProvider from "../shared/contexts/audio-context";
import Initializer from "./initializer";
import AvatarComponent from "./avatar";
import Background from "../shared/components/background";

export default function AvatarPage() {
  const [avatarReady, setAvatarReady] = useState(false);
  const { interacted } = useInteract();

  const avatarOnReady = () => {
    setAvatarReady(true);
  };

  useEffect(() => {
    document.body.classList.add('no-scroll-bars');
    return () => {
      document.body.classList.remove('no-scroll-bars');
    };
  }, []);

  return (
    <div>
      <DataProvider>
        <AudioProvider>
          <Initializer avatarReady={avatarReady}></Initializer>
          {
            !interacted &&
            <Overlay></Overlay>
          }
          <AvatarComponent avataronready={avatarOnReady}></AvatarComponent>
        </AudioProvider>
      </DataProvider>
      <Background maxWidth={1000}></Background>
    </div>
  );
}