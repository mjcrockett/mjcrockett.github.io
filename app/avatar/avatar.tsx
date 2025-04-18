import { useEffect, useState } from "react";
import View from "./view";
import { useAudio } from "../shared/contexts/audio-context";
import { useData } from "./data-context";

function Avatar({avatarReady} : {avatarReady?: () => void}) {
    const [indexChange, setIndexChange] = useState<number | undefined>(undefined);
    const { playing, canPlayThrough, audioRef } = useAudio();
    const { selectedInstructions } = useData();
    const fpsInterval: number = 1000 / 30;
    let then: number;
    let animationFrame: number;
    let trnscrptIdx: number = 0;
    let trnscrptTimeA: number = 0;
    let trnscrptTimeB: number | null = null;
    let duration: number;
    
    useEffect(() => {
        duration = canPlayThrough;
    }, [canPlayThrough]);

    useEffect(() => {
        if (playing) {
            trnscrptIdx = 0;
            getTranscriptIndex(selectedInstructions[trnscrptIdx].Interval);
            then = Date.now();
            getTime();
        }
    }, [playing]);

    function getTime(this: any) {
        animationFrame = requestAnimationFrame(getTime.bind(this));

        // calc elapsed time since last loop
        let now = Date.now();
        let elapsed = now - then;

        // if enough time has elapsed, draw the next frame
        if (elapsed > fpsInterval) {
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            if (!audioRef){
                console.log("audioRef was null");
                cancelAnimationFrame(animationFrame);
                return;
            }

            let s = audioRef.currentTime;
            onSeek(s);
        }
    };

    const onSeek = (interval: number) => {
        if (!selectedInstructions)
            return;
      
          if (interval < trnscrptTimeA || (trnscrptTimeB && interval >= trnscrptTimeB)) {
            getTranscriptIndex(interval);
          }
    };

    const getTranscriptIndex = (interval: number) => {
        if (!selectedInstructions)
          return;
        for (var ct = 0; ct < selectedInstructions.length; ct++) {
          if (ct == selectedInstructions.length - 1) {
            trnscrptIdx = ct;
            trnscrptTimeA = selectedInstructions[ct].Interval;
            trnscrptTimeB = duration;
            break;
          }
          else if (interval >= selectedInstructions[ct].Interval && interval < selectedInstructions[ct + 1].Interval) {
            trnscrptIdx = ct;
            trnscrptTimeA = selectedInstructions[ct].Interval;
            trnscrptTimeB = selectedInstructions[ct + 1].Interval;
            break;
          }
        }
    
        setIndexChange(trnscrptIdx);
      }


    return ( 
    <div>
        <View avataronready={avatarReady} indexChange={indexChange}></View>
    </div> 
    );
}

export default Avatar;