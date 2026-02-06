'use client';
import React from "react";
import styles from './break.module.css';
import { VolumeIframe } from '../shared/components/volume-iframe';

export default function BreakPage() {
  return (
    <div className={`flex-column ${styles.iframePosition}`} >
      <VolumeIframe
          src="https://mjcrockett.github.io/standby/"
          title="Break Time"
        />
    </div>
  );
}