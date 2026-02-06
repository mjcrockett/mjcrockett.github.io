'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { useVolume } from '../contexts/volume-context';

interface VolumeIframeProps {
    src: string;
    title: string;
    width?: string;
    allowFullScreen?: boolean;
    className?: string;
}

export function VolumeIframe({ src, title, width = '100%', allowFullScreen = true, className }: VolumeIframeProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { volume } = useVolume();

    const sendVolume = useCallback(() => {
        iframeRef.current?.contentWindow?.postMessage(
            { type: 'volume-change', volume },
            '*'
        );
    }, [volume]);

    useEffect(() => {
        sendVolume();
    }, [sendVolume]);

    return (
        <iframe
            ref={iframeRef}
            src={src}
            title={title}
            width={width}
            height={width}
            allowFullScreen={allowFullScreen}
            className={className}
            onLoad={sendVolume}
        />
    );
}
