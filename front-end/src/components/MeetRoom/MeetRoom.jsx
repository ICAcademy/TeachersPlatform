import React, { useContext, useRef } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import PropTypes from 'prop-types';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './MeetRoom.module.scss';
// import Button from '@mui/material/Button';
// import VideoCallIcon from '@mui/icons-material/VideoCall';

const MeetRoom = ({ roomId }) => {
  const apiRef = useRef();
  // const [showNew, toggleShowNew] = useState(false);

  // const renderNewInstance = () => {
  //   if (!showNew) {
  //     return null;
  //   }

  //   return (

  //   );
  // };

  const handleUserJoined = () => {
    console.log('user joined');
  };

  const handleApiReady = (apiObj) => {
    apiRef.current = apiObj;
    apiRef.current.on('participantJoined', handleUserJoined);
  };

  const generateRoomName = () => `JitsiMeetRoomNo ${roomId}`;
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className={styles.meetRoom}>
      <JitsiMeeting
        roomName={generateRoomName()}
        configOverwrite={{
          startAudioOnly: true,
          prejoinPageEnabled: false,
        }}
        onApiReady={(externalApi) => handleApiReady(externalApi)}
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

MeetRoom.propTypes = {
  roomId: PropTypes.string,
};

export default MeetRoom;
