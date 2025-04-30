
// import { useEffect, useRef } from "react";

// const JitsiMeet = ({ roomName, displayName }) => {
//   const jitsiRef = useRef(null);

//   useEffect(() => {
//     if (!window.JitsiMeetExternalAPI || !roomName) return;
//     const domain = "meet.jit.si";
//     const api = new window.JitsiMeetExternalAPI(domain, {
//       roomName,
//       parentNode: jitsiRef.current,
//       width: "100%",
//       height: 600,
//       userInfo: { displayName }
//     });
//     return () => api.dispose();
//   }, [roomName]);

//   return <div ref={jitsiRef} />;
// };

// export default JitsiMeet;






// src/components/JitsiMeet.js
// import React, { useEffect } from "react";

// const JitsiMeet = ({ roomName, displayName }) => {
//   useEffect(() => {
//     const domain = "meet.jit.si";
//     const options = {
//       roomName,
//       width: "100%",
//       height: 600,
//       parentNode: document.getElementById("jitsi-container"),
//       userInfo: {
//         displayName,
//       },
//     };
//     const api = new window.JitsiMeetExternalAPI(domain, options);

//     return () => api.dispose();
//   }, [roomName, displayName]);

//   return <div id="jitsi-container" />;
// };

// export default JitsiMeet;






import React, { useEffect } from "react";

const JitsiMeet = ({ roomName, displayName }) => {
  useEffect(() => {
    const domain = "meet.jit.si";  // This should be the public Jitsi server
    const options = {
      roomName: roomName,  // Pass a valid room name here
      width: "100%",
      height: 600,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: {
        displayName: displayName || "Participant", // Optional, replace with user name
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
    };

    // Initialize the Jitsi Meet API
    const api = new window.JitsiMeetExternalAPI(domain, options);

    // Clean up when component unmounts
    return () => api.dispose();
  }, [roomName, displayName]);

  return <div id="jitsi-container" />;
};

export default JitsiMeet;
