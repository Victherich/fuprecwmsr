// LiveLecture.js
import React, { useEffect, useRef } from "react";

const LiveLecture = ({ roomName, userName }) => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    // Cleanup before adding new Jitsi
    if (window.JitsiMeetExternalAPI) {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomName,
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: userName,
        },
        configOverwrite: {
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => api.dispose();
    }
  }, [roomName, userName]);

  return <div ref={jitsiContainerRef} style={{ height: "100vh", width: "100%" }} />;
};

export default LiveLecture;

