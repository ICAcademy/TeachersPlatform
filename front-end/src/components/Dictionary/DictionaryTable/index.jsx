import React from 'react';

// MUI library
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from './DictionaryTable.module.scss';

const DictionaryTable = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table className={styles.root} stickyHeader aria-label='sticky table'>
          <TableHead
            sx={{
              '& th': {
                color: '#fff',
                backgroundColor: '#a968a3',
                fontSize: 17,
                fontWeight: 500,
                height: 65,
                fontFamily: 'Poppins-Regular, sans-serif',
              },
            }}
          >
            <TableRow>
              <TableCell align='center'>Word</TableCell>
              <TableCell align='center'>Translation</TableCell>
              <TableCell align='center'>Settings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& tr': {
                height: 55,
                backgroundColor: 'white',
              },
            }}
          >
            <TableRow>
              <TableCell align='center'>Hello</TableCell>
              <TableCell align='center'>Привіт</TableCell>
              <TableCell align='center'>
                <div className={styles.btnWrap}>
                  <IconButton aria-label='update'>
                    <FontAwesomeIcon icon={faPen} width={15} height={15} />
                  </IconButton>
                  <IconButton aria-label='delete'>
                    <FontAwesomeIcon icon={faTrash} width={15} height={15} />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Hello</TableCell>
              <TableCell align='center'>Привіт</TableCell>
              <TableCell align='center'>
                <div className={styles.btnWrap}>
                  <IconButton aria-label='update'>
                    <FontAwesomeIcon icon={faPen} width={15} height={15} />
                  </IconButton>
                  <IconButton aria-label='delete'>
                    <FontAwesomeIcon icon={faTrash} width={15} height={15} />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Hello</TableCell>
              <TableCell align='center'>Привіт</TableCell>
              <TableCell align='center'>
                <div className={styles.btnWrap}>
                  <IconButton aria-label='update'>
                    <FontAwesomeIcon icon={faPen} width={15} height={15} />
                  </IconButton>
                  <IconButton aria-label='delete'>
                    <FontAwesomeIcon icon={faTrash} width={15} height={15} />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DictionaryTable;
