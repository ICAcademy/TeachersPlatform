import React, { useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/snackbar-slice';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} variant='filled' {...props} ref={ref} />
));

Alert.displayName = 'Alert';

export const withSnackbar = (WrappedComponent) => {
  const NewComponent = (props) => {
    const snackbarShow = useSelector((state) => state.snackbar.snackbarShow);
    const snackbarMessage = useSelector((state) => state.snackbar.snackbarMessage);
    const severity = useSelector((state) => state.snackbar.severity);
    const dispatchFunction = useDispatch();

    const showMessage = useCallback(
      (data) => {
        dispatchFunction(snackbarActions.show(data));
      },
      [dispatchFunction],
    );

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatchFunction(snackbarActions.hide());
    };

    return (
      <React.Fragment>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={3000}
          open={snackbarShow}
          onClose={handleClose}
        >
          <Alert variant='filled' onClose={handleClose} severity={severity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  };
  return NewComponent;
};
