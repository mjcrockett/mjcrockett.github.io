'use client';
import Avatar from '@/public/scripts/avatar-library';
import { AvatarInstructions } from '@/public/scripts/avatar-library';
import React from 'react';
import Script from 'next/script';
import { useEffect } from "react";

export default function AvatarComponent() {
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

      window.addEventListener('avataronready', function (e) {
        console.log('avatar is ready:', e);
        avatar.go(instrux);
        avatar.transformSet(.8);
        avatar.updateStage();
      });
    }
  }, []);

  const onCreateJsLoad = () => {
    if (typeof window !== 'undefined') {
      avatar = new Avatar();
    }
  }
  
  return (
    <div>
      <Script src="scripts/createjs.min.js" strategy="afterInteractive" onLoad={onCreateJsLoad}/>
      <canvas id="cnvs" width="933" height="935"></canvas>
    </div>
  );
}