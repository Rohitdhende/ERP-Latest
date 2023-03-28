import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 0.75,
  p: 4,
};

BasicModal.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default function BasicModal(props) {
  const { open, setOpen, title, placeholder } = props;

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const SELECT_OPTIONS = ['true', 'false'];
  const [selectedOption, setSelectedOption] = useState('');
  console.log('selectedOption', selectedOption);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField id="continent-name" label={`${placeholder} Name`} variant="outlined" />
            <TextField id="continent-code" label={`${placeholder} Code`} variant="outlined" />
            <Autocomplete
              disablePortal
              id="status"
              options={SELECT_OPTIONS}
              renderInput={(params) => <TextField {...params} label="Status" />}
              onChange={(event, newValue) => {
                setSelectedOption(newValue);
              }}
            />
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#58B85D',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#6BDB8A',
                },
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                '&:hover': {
                  borderColor: 'red',
                  color: 'red',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
