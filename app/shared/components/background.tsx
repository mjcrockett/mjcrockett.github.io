import { useEffect, useRef } from 'react';
import styles from './background.module.css';
import { BackgroundImages } from '../constants/background-constants';
// import Image from 'next/image';

function Background({maxWidth} : {maxWidth?: number}) {
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.src = BackgroundImages.home;
        }
    }, []);

    return ( 
        <div className={styles.bkgrndWrapper}>
            {/* <Image src={BackgroundImages.home} alt="background image" style={{ maxWidth: `${maxWidth}px`}}  id={styles.bkgrndimg}
            layout="fill" objectFit="contain"/> */}
            <img id={styles.bkgrndimg} ref={ref} style={{ maxWidth: `${maxWidth}px`}}/>
        </div>
    );
}

export default Background;