'use client'
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'




export default function Player() {
    const [isWindow, setIsWindow] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    useEffect(() => {
        setIsWindow(true);
    }, []);


    const handleBtn = (): void => {
        setIsPlaying(!isPlaying);
      };
    return(
        <>
           <button onClick={handleBtn} style={{ marginBottom: 20 }}>
          플레이
        </button>
        {isWindow && (
          <div>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=pSUydWEqKwE"
              muted
              controls
              playing={isPlaying}
              width={"100%"}
              height={"100%"}
            />
          </div>
        )}
        </>
    )
};
