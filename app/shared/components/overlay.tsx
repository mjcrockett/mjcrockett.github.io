import { useEffect, useState } from 'react';
import styles from './overlay.module.css';
import { useInteract } from '../contexts/interaction-context';

function Overlay({onEnter} : {onEnter?: () => void}) {
    const [ showOverlay, setShowOverlay] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ hidingOverlay, setHidingOverlay ] = useState(false);
    const { interacted, setInteracted } = useInteract();

    const onShow = () => {
        setHidingOverlay(false);
        setShowOverlay(true);
    };

    const onHide = () => {
        if (onEnter) {
            onEnter();
        }
        
        setHidingOverlay(true);
        setTimeout(() => {
            setShowOverlay(false);
            setHidingOverlay(false);
            setIsLoading(false);

            setInteracted(true);
        }, 1000);
    };

    useEffect(() => {
        setIsLoading(true);
        if (!interacted) {
            onShow();
        }
    }, []);

    return ( 
        <div className={styles.overlayBody}>
        {   showOverlay && 
            <div className={`${styles.avatarOverlayContainer} ${hidingOverlay ? styles.hideO : ''}`}>
                <div className={styles.slideContainer}>
                    <div className={styles.slidingBackground}></div>
                </div>
                <div className={`container-fluid center-block ${styles.onTop}`}>
                    <div className="row justify-content-center">

                    { isLoading && 
                        <div className={`col d-flex justify-content-center ${styles.enter}`}>
                            <div className={`p-1 bg-light ${styles.borderRadius10} shadow-2xl`}>
                                <a onClick={onHide}>
                                    <img src="/images/home/enter5.png"/>
                                </a>
                            </div>
                        </div>
                    }

                    </div>
                    <div className="row" >
                        <div className={styles.spinnerPosition}>

                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
    );
}

export default Overlay;