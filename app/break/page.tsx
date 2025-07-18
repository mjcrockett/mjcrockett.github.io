'use client';
import React from "react";
import styles from './break.module.css';

export default function BreakPage() {
const src = 'https://mjcrockett.github.io/standby/';
const title = 'Break Time';
const width = '100%';
const allowFullScreen = true;
  return (
    <div className={`flex-column ${styles.iframePosition}`} >
      <iframe
          src={src}
          title={title}
          width={width}
          height={width}
          allowFullScreen={allowFullScreen}
        ></iframe>
    </div>
  );
}