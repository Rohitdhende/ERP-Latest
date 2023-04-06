import { useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {updateData } from '../../api';
import Dropdown from '../dropdown';

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

InfoModal.propTypes = {
  selectedData: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  count: PropTypes.string,
  type: PropTypes.string,
  setReqStatus: PropTypes.func,
};

export default function InfoModal(props) {
  const { open, setOpen, selectedData, count, type, setReqStatus } = props;

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(selectedData.status);
  console.log('seled', selectedStatus);
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  

  const [name, setName] = useState(selectedData?.name ? selectedData.name : '');
  // const [selectedContinent, setSelectedContinent] = useState();
  const handleUpdate = () => {
    const { id } = selectedData;

    updateData(type, { name, id, selectedStatus }, (res) => {
      setOpen(false);
      setReqStatus(res.STATUS);
      if (res.STATUS === 1) {
        toast.success(res.MESSAGE);
      } else {
        toast.warning(res.MESSAGE);
      }
    });
  };

  const handleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const list = [
    { id: 0, name: 'false' },
    { id: 1, name: 'true' },
  ];

  // const [continentList,setContinentList] = useState([])
  // useEffect(() => {
  //   if (type === 'country') {
  //     (async () => {
  //       const continents = await getContinentList();
  //       setContinentList(continents.continent);
  //     })();
  //   }
  // }, [type]);

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
            {isEditMode ? 'Edit Details' : 'Details'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              id="continent-name"
              variant="outlined"
              value={name}
              label={type}
              disabled={!isEditMode}
              onChange={isEditMode ? (e) => setName(e.target.value) : () => {}}
            />
            {/* {type === 'country' && (
              <Dropdown
                options={continentList}
                onSort={(event) => {
                  const words = event.target.value.split(' ');
                  const lastWord = words[words.length - 1];
                  setSelectedContinent(lastWord);
                }}
                option={selectedContinent}
                disabled={!isEditMode}
              />
            )} */}
            <Dropdown
              options={list}
              onSort={(event) => setSelectedStatus(event.target.value)}
              option={selectedStatus}
              disabled={!isEditMode}
            />

            <TextField
              id={selectedData?.id.toString()}
              label={selectedData?.id ? selectedData.id : count + 1}
              variant="outlined"
              disabled
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
              onClick={isEditMode ? handleUpdate : handleEditMode}
            >
              {isEditMode ? 'Save' : 'Edit'}
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
              {isEditMode ? 'Cancel' : 'Close'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
