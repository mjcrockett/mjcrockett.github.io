import { useState } from 'react';
import styles from './overlay.module.css';
import { useInteract } from './interaction';

function Overlay() {
    const [ showOverlay, setShowOverlay] = useState(true);
    const [ hidingOverlay, setHidingOverlay ] = useState(false);
    const { setInteracted } = useInteract();

    const onShow = () => {
        setHidingOverlay(false);
        setShowOverlay(true);
    };

    const onHide = () => {
        setHidingOverlay(true);
        setTimeout(() => {
            setShowOverlay(false);
            setHidingOverlay(false);
            setInteracted(true);
        }, 1000);
    };

    return ( 
        <div>
        {   showOverlay && 
            <div className={`${styles.avatarOverlayContainer} ${hidingOverlay ? styles.hideO : ''}`}>
                <div className={styles.slideContainer}>
                    <div className={styles.slidingBackground}></div>
                </div>
                <div className={`container-fluid center-block ${styles.onTop}`}>
                    <div className="row justify-content-center">

                        <div className={`col d-flex justify-content-center ${styles.enter}`}>
                            <a onClick={onHide}>
                                <img src="/images/home/enter5.png"/>
                            </a>
                        </div>

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