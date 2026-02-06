'use client';
import React from "react";
import styles from './avatarShop.module.css';
import { VolumeIframe } from '../shared/components/volume-iframe';

export default function AvatarShopPage() {
  return (
    <div className={`flex-column ${styles.iframePosition}`} >
      <VolumeIframe
          src="https://mjcrockett.github.io/avatar-shop/"
          title="Avatar Shop"
        />
    </div>
  );
}