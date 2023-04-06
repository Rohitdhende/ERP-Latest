import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import { createData, getContinentList, getCountryList } from '../../api';

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
  selectedData: PropTypes.object,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  count: PropTypes.string,
  type: PropTypes.string,
  setReqStatus: PropTypes.func,
};

export default function BasicModal(props) {
  const { open, setOpen, title, placeholder, selectedData, count, type, setReqStatus } = props;
  const [list, setData] = useState([]);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    if (type === 'country') {
      (async () => {
        const continents = await getContinentList();
        setData(continents.continent);
      })();
    }

    if (type === 'state') {
      (async () => {
        const countries = await getCountryList();
        setCountryList(countries.country);
      })();
    }
  }, [type]);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const [name, setName] = useState(selectedData?.name ? selectedData.name : '');

  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const handleCreate = () => {
    if (type === 'continent') {
      createData(type, { name }, (res) => {
        setOpen(false);
        setReqStatus(res.STATUS);
        if (res.STATUS === 1) {
          toast.success(res.MESSAGE);
        } else {
          toast.warning(res.MESSAGE);
        }
      });
    }
    if (type === 'country') {
      createData(type, { name, selectedContinent }, (res) => {
        setOpen(false);
        setReqStatus(res.STATUS);
        if (res.STATUS === 1) {
          toast.success(res.MESSAGE);
        } else {
          toast.warning(res.MESSAGE);
        }
      });
    }
    if (type === 'state') {
      createData(type, { name, selectedCountry }, (res) => {
        setOpen(false);
        setReqStatus(res.STATUS);
        if (res.STATUS === 1) {
          toast.success(res.MESSAGE);
        } else {
          toast.warning(res.MESSAGE);
        }
      });
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
            {type === 'country' && (
              <Autocomplete
                disablePortal
                id="continent"
                options={list.map((data) => `${data.name} ${data.id.toString()}`)}
                renderInput={(params) => <TextField {...params} label="Select Continent" value={selectedContinent} />}
                onChange={(event, newValue) => {
                  const words = newValue.split(' ');
                  const lastWord = words[words.length - 1];
                  setSelectedContinent(lastWord);
                }}
              />
            )}
            {type === 'state' && (
              <Autocomplete
                disablePortal
                id="country"
                options={countryList.map((data) => `${data.name} ${data.id.toString()}`)}
                renderInput={(params) => <TextField {...params} label="Select Country" value={selectedCountry} />}
                onChange={(event, newValue) => {
                  const words = newValue.split(' ');
                  const lastWord = words[words.length - 1];
                  setSelectedCountry(lastWord);
                }}
              />
            )}
            <TextField
              id="continent-name"
              label={`${placeholder} Name`}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              onClick={handleCreate}
            >
              {'Submit'}
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
