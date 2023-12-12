'use client';
import YouTube, { YouTubeProps } from 'react-youtube';

export default function YoutubeVideo({ videoId }: { videoId: string }) {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={`${videoId}`} opts={opts} onReady={onPlayerReady} />;
}
