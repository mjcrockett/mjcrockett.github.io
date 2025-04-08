'use client';
import React, { useEffect, useState } from "react";
import { getAvatarParent } from '@/app/shared/services/avatar.service';
import { AvatarParent } from '../shared/models/avatar.models';
import View, { IViewProps } from './view';
import Audio, { IAudioProps } from '../shared/components/audio';
import { useInteract } from '../shared/components/interaction';
import Overlay from "../shared/components/overlay";

export default function AvatarPage() {
  const [parentData, setParentData] = useState<AvatarParent[] | null>(null);
  const { interacted, setInteracted } = useInteract();
  const aProps: IAudioProps = {
    play: (playing: boolean) => {},
    canPlayThrough: (duration: number) => {},
    finish: (ended: boolean) => {},
    pause: (paused: boolean) => {},
    timeUpdate: (timeUpdate: number) => {},
    isReady: (ready: boolean) => {
      console.log("Audio is ready now hurray");
    }
  };
  const viewProps: IViewProps = {
    avataronready: () => {
      console.log("Avatar is ready now yippee");
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const fetchParentData = async () => {
        const data = await getAvatarParent();
        setParentData(data);
      }

      fetchParentData();
    }
  }, []);
  
  return (
    <div>
      {
        !interacted &&
        <Overlay></Overlay>
      }
      <Audio {...aProps}></Audio>
      <View avataronready={viewProps.avataronready}></View>
    </div>
  );
}