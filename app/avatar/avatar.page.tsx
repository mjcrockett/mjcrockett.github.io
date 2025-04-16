'use client';
import React, { useEffect, useState } from "react";
import { getAllData } from '@/app/shared/services/avatar.service';
import { AvatarParent } from '../shared/models/avatar.models';
import View, { IViewProps } from './view';
import Audio, { IAudioProps } from './audio';
import { useInteract } from '../shared/contexts/interaction';
import Overlay from "../shared/components/overlay";
import { Deferred } from "../shared/utils/deferred";
import DataProvider, { useData } from "./data-context";

export default function AvatarPage() {
  const [parentData, setParentData] = useState<AvatarParent[] | null>(null);
  const { interacted } = useInteract();
  const audioReady: Deferred<string> = new Deferred<string>();
  const avatarReady: Deferred<string> = new Deferred<string>();
  const aProps: IAudioProps = {
    play: (playing: boolean) => {},
    canPlayThrough: (duration: number) => {},
    finish: (ended: boolean) => {},
    pause: (paused: boolean) => {},
    timeUpdate: (timeUpdate: number) => {},
    isReady: (ready: boolean) => {
      if (ready) 
        audioReady.resolve('Audio is ready now hurray');
    }
  };
  const viewProps: IViewProps = {
    avataronready: () => {
      avatarReady.resolve('Avatar is ready now yippee');
    }
  };

  const onEnter = () => {
    console.log('Im entering');
  };

  useEffect(() => {

    Promise.all([avatarReady, audioReady]).then(() => {
      console.log('everything is ready');
    });

  }, []);


  return (
    <DataProvider>
      {
        !interacted &&
        <Overlay onEnter={onEnter}></Overlay>
      }
      <Audio {...aProps}></Audio>
      <View avataronready={viewProps.avataronready}></View>
    </DataProvider>
  );
}