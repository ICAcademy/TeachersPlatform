import React, { useContext } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import PropTypes from 'prop-types';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './MeetRoom.module.scss';

const MeetRoom = ({ roomId, onJoin }) => {
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
        onApiReady={(externalApi) => {
          externalApi.on('participantJoined', () => {
            onJoin(true);
          });
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

MeetRoom.propTypes = {
  roomId: PropTypes.string,
  onJoin: PropTypes.func,
};

export default MeetRoom;
