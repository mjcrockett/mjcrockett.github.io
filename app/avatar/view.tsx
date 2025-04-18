'use client';
import Avatar from '@/public/scripts/avatar-library';
import { AvatarInstructions } from '@/public/scripts/avatar-library';
import Script from 'next/script';
import React, { useEffect } from "react";
import { useData } from './data-context';

export interface IViewProps {
    avataronready?: (ready: boolean) => void;
    indexChange: number | undefined;
}

export default function View(vProps: IViewProps) {
  const { selectedInstructions } = useData();
  let avatar:Avatar;
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

  useEffect(() => {
    if (typeof window !== 'undefined') {

        const handleOnReady = () => { 
          if (vProps.avataronready) {
            vProps.avataronready(true); 
          }

          instruction(instrux)
          avatar.transformSet(.8);
          avatar.updateStage();
        };

        window.addEventListener('avataronready', handleOnReady);

        return () => {
            window.removeEventListener('avataronready', handleOnReady);
        };
    }
  }, []);

  useEffect(() => {
    if (!!vProps.indexChange) {
      instruction(selectedInstructions[vProps.indexChange].InstructionJson);
    }
  }, [vProps.indexChange]);

  const onCreateJsLoad = () => {
    if (typeof window !== 'undefined') {
      avatar = new Avatar();
    }
  }

  const instruction = (instrx: AvatarInstructions) => {
    avatar.go(instrx);
  }
  
  return (
    <div>
      <Script src="scripts/createjs.min.js" strategy="afterInteractive" onLoad={onCreateJsLoad}/>
      <canvas id="cnvs" width="933" height="935"></canvas>
    </div>
  );
}