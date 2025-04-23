'use client';
import Avatar from '@/public/scripts/avatar-library';
import { AvatarInstructions } from '@/public/scripts/avatar-library';
import Script from 'next/script';
import React, { useEffect, useState } from "react";
import Animator from './animator';

export interface IViewProps {
    avataronready?: () => void;
}

export default function AvatarComponent(vProps: IViewProps) {
  let [avatar, setAvatar] = useState<Avatar | undefined>(undefined);
  let instrux: AvatarInstructions = {
      mouthOpen: false,
      headTurn: "front", //"front", "left", "right"
      eyes: "front", //"front", "left", "right", "close"
      headRotate: 0,
      neckRotate: 0,
      hipsRotate: 0,
      chestRotate: 0,
      footLeftRotate: 0,
      legLeftLowerRotate: 0,
      legLeftUpperRotate: 0,
      footRightRotate: 0,
      legRightLowerRotate: 0,
      legRightUpperRotate: 0,
      handLeftRotate: 0,
      armLeftLowerRotate: 0,
      armLeftUpperRotate: 0,
      handRightRotate: 0,
      armRightLowerRotate: 0,
      armRightUpperRotate: 0,
      rightShrug: 0,
      leftShrug: 0,
      headShrug: 0
    };
  // let instrux = JSON.parse(`{"mouthOpen":false,"headTurn":"front","eyes":"left","headRotate":-9,"neckRotate":7,"hipsRotate":0,"chestRotate":4,"footLeftRotate":-13,"legLeftLowerRotate":8,"legLeftUpperRotate":2,"footRightRotate":0,"legRightLowerRotate":14,"legRightUpperRotate":-9,"handLeftRotate":0,"armLeftLowerRotate":0,"armLeftUpperRotate":-9,"handRightRotate":-9,"armRightLowerRotate":-95,"armRightUpperRotate":5,"rightShrug":0,"leftShrug":0,"headShrug":0}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {

        const handleOnReady = () => { 
          if (vProps.avataronready) {
            vProps.avataronready(); 
          }

          instruction(instrux)
          avatar?.transformSet(.8);
          avatar?.updateStage();
        };

        window.addEventListener('avataronready', handleOnReady);

        return () => {
            window.removeEventListener('avataronready', handleOnReady);
        };
    }
  }, []);

  const onCreateJsLoad = () => {
    if (typeof window !== 'undefined') {
      avatar = new Avatar();
      setAvatar(avatar);
    }
  }

  const instruction = (instrx: AvatarInstructions) => {
    avatar?.go(instrx);
  }
  
  return (
    <div>
      <Script src="scripts/createjs.min.js" strategy="afterInteractive" onLoad={onCreateJsLoad}/>
      <canvas id="cnvs" width="933" height="935"></canvas>
      <Animator avatar={avatar}></Animator>
    </div>
  );
}