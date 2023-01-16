import React, { useContext, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import Button from '@mui/material/Button';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const MeetRoom = () => {
  const [showNew, toggleShowNew] = useState(false);

  const renderNewInstance = () => {
    if (!showNew) {
      return null;
    }

    return (
      <JitsiMeeting
        roomName={generateRoomName()}
        userInfo={{
          displayName: currentUser.fullName,
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = 'calc(100vh - 100px)';
        }}
      />
    );
  };
  const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <>
      <Button
        variant='contained'
        startIcon={<VideoCallIcon />}
        onClick={() => toggleShowNew(!showNew)}
      >
        Call
      </Button>
      {renderNewInstance()}
    </>
  );
};

export default MeetRoom;
