import React, { useContext, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './MeetRoom.module.scss';
import Button from '@mui/material/Button';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const MeetRoom = () => {
  const [showNew, toggleShowNew] = useState(false);

  const renderNewInstance = () => {
    if (!showNew) {
      return null;
    }

    return (
      <div className={styles.meetRoom}>
        <JitsiMeeting
          roomName={generateRoomName()}
          configOverwrite={{
            startAudioOnly: true,
            prejoinPageEnabled: false,
          }}
          userInfo={{
            displayName: currentUser.fullName,
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '150px';
          }}
        />
      </div>
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
