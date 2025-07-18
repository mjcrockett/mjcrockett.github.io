'use client';
import Avatar from '@/public/scripts/avatar-library';
import { AvatarInstructions } from '@/public/scripts/avatar-library';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from "react";
import Animator from './animator';
import { Constants } from '../shared/constants/avatar-constants';

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
  let defaultMiddlePanelHeight: number = 918;
  let defaultMiddlePanelWidth: number = 1280;
  let defaultCnvHeight: number = Constants.CANVAS_HEIGHT;
  let defaultCnvWidth: number = Constants.CANVAS_WIDTH;
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {

        const handleOnReady = () => { 
          if (vProps.avataronready) {
            vProps.avataronready(); 
          }

          instruction(instrux);
          onResize();
        };

        window.addEventListener('avataronready', handleOnReady);
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('avataronready', handleOnReady);
            window.removeEventListener('resize', onResize);
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

  const onResize = () => {
    const percentage = checkDimensions();
    scale(percentage);
  }

  const checkDimensions = () => {
    let mPercent = 0;
    let windowWidth = window.innerWidth || document.body.clientWidth;
    let windowHeight = window.innerHeight || document.body.clientHeight;
    if (windowWidth > windowHeight) {
        mPercent = windowHeight / defaultMiddlePanelHeight;
    }
    else {
        mPercent = windowWidth / defaultMiddlePanelWidth;
    }

    mPercent = mPercent > .75 ? .75 : mPercent;

    if (mPercent > .75)
      mPercent = .75;
    else if (mPercent < .53)
      mPercent = .53;

    return mPercent;
  }

  const scale = (mPercent: number) => {
    if (mPercent != 0) {

      if (avatar && ref.current) {
        avatar.transformSet(mPercent);

        ref.current.width = defaultCnvWidth * mPercent;
        ref.current.height = defaultCnvHeight * mPercent;

        avatar.updateStage();
      }
    }
  }
  
  return (
    <div>
      <Script src="scripts/createjs.min.js" strategy="afterInteractive" onLoad={onCreateJsLoad}/>
      <canvas id="cnvs" width={defaultCnvWidth} height={defaultCnvHeight} ref={ref}></canvas>
      <Animator avatar={avatar}></Animator>
    </div>
  );
}