import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {toast } from 'react-toastify'

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

UserModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default function UserModal(props) {
  const { open, setOpen, title } = props;

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };


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
            <TextField id="name" label="User Name" variant="outlined" />
            <TextField id="email" label="Email" variant="outlined" type={'email'} />
            <TextField id="phone" label="Phone Number" variant="outlined" type="number" />
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
              onClick={()=>{
                toast("User added successfully")
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
