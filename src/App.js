import React, { useRef, useState } from "react";
import videojs from "video.js";
import { VideoJS } from "./Component/Video";

function App() {
  const playerRef = useRef(null);
  const [videoPlayer, setVideoPlayer] = useState(false);
  const [videoSrc, setVideoSrc] = useState(String);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const handleUploadVideo = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setVideoPlayer(true);
    setVideoSrc({
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: url,
          type: "video/mp4",
        },
      ],
    });
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <input
            type="file"
            id="video"
            className="form-control"
            placeholder="upload video"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={handleUploadVideo}
          />
          <label className="form-label" htmlFor="video">
            Upload Video
          </label>
        </div>
      </form>
      {videoPlayer ? (
        <VideoJS options={videoSrc} onReady={handlePlayerReady} />
      ) : null}
    </>
  );
}

export default App;
