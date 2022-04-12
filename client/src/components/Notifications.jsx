import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { PhoneDisabled, PhoneEnabled } from '@material-ui/icons';
import { SocketContext } from '../Context';

const Notifications = () => {
  const path = 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3';
  const { answerCall, call, leaveCall } = useContext(SocketContext);
  return (

    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <h1>{call.name} is calling:</h1>
      <audio src={path} autoPlay />
      <Button variant="contained" color="primary" startIcon={<PhoneEnabled fontSize="large" />} onClick={answerCall}>Answer</Button>
      <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} onClick={leaveCall}>Decline</Button>

    </div>

  );
};

export default Notifications;
