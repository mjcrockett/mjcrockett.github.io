import { useEffect, useRef } from "react";
import { useAudio } from "../shared/contexts/audio-context";
import { useData } from "./data-context";
import Avatar from "@/public/scripts/avatar-library";
import { AvatarInstruction } from "../shared/models/avatar.models";

function Animator({avatar} : {avatar?: Avatar}) {
    const { playing, canPlayThrough, ended, audioRef } = useAudio();
    const { selectedInstructions } = useData();
    const transcript = useRef<AvatarInstruction[]>(null);
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
      if (playing && selectedInstructions) {
        transcript.current = selectedInstructions;
        trnscrptIdx = 0;
        getTranscriptIndex(transcript.current[0].Interval);
        then = Date.now();
        getTime();
      }
    }, [playing, selectedInstructions]);

    useEffect(() => {
      cancelAnimationFrame(animationFrame);
    }, [ended]);

    function getTime() {
      animationFrame = requestAnimationFrame(getTime);

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
      if (!transcript.current)
          return;
    
      if (interval < trnscrptTimeA || (trnscrptTimeB && interval >= trnscrptTimeB)) {
        getTranscriptIndex(interval);
      }
    };

    const getTranscriptIndex = (interval: number) => {
      if (!transcript.current)
        return;
      for (var ct = 0; ct < transcript.current.length; ct++) {
        if (ct == transcript.current.length - 1) {
          trnscrptIdx = ct;
          trnscrptTimeA = transcript.current[ct].Interval;
          trnscrptTimeB = duration;
          break;
        }
        else if (interval >= transcript.current[ct].Interval && interval < transcript.current[ct + 1].Interval) {
          trnscrptIdx = ct;
          trnscrptTimeA = transcript.current[ct].Interval;
          trnscrptTimeB = transcript.current[ct + 1].Interval;
          break;
        }
      }
  
      avatar?.go(transcript.current[trnscrptIdx].InstructionJson);
    }

  return ( 
  <></>
  );
}

export default Animator;