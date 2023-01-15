import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const MeetRoom = () => {
  return (
    <JitsiMeeting
      roomName='Lesson room'
      configOverwrite={{
        startWithAudioMuted: false,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false,
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
      }}
      userInfo={{
        displayName: 'YOUR_USERNAME',
      }}
      // onApiReady={(externalApi) => {
      //   // here you can attach custom event listeners to the Jitsi Meet External API
      //   // you can also store it locally to execute commands
      // }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = '400px';
      }}
    />
  );
};

export default MeetRoom;
