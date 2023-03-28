// Import npm packages
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import other packages
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

UserDataModal.propTypes = {

  // Component Specific props
  // =======================================
  modalHeading: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

UserDataModal.defaultProps = {
  // =======================================
  // Component Specific props
  // =======================================
  modalHeading: '',
};

// InputField styling

export default function UserDataModal(props) {
  // Handle Modal close
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    props.onClose(false);
    setOpen(false);
    resetData();
  };

  const initialFormState = {
    continent: '',
    country: '',
    state: '',
    district: '',
    taluka: '',
    village: '',
  };

  // Handle Form Data
  const [formData, setFormData] = useState(initialFormState);
  const handleForm = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value.trim() });
  };

  // Handle Form Submit
  const handleSubmitForm = () => {
    handleClose();
    console.log(formData);
  };

  // Reset Data function to reset form inputs
  const resetData = () => {
    setFormData(initialFormState);
  };

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <Dialog open={open}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, padding: '0.5rem 0' }} variant="h6" component="div">
            {props.modalHeading}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          width: { lg: '400px', md: '400px', sm: 'auto', xs: 'auto' },
        }}
      >
        <FormControl>
          <InputLabel htmlFor="continent-input-box" required>
            Continent
          </InputLabel>
          <OutlinedInput required id="continent-input-box" label="Continent" onChange={handleForm('continent')} />
          {/* {!isNameValid && (
            <FormHelperText error id="name-error">
              Please enter valid name
            </FormHelperText>
          )} */}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="country-input-box" required>
            Country
          </InputLabel>
          <OutlinedInput required id="country-input-box" label="Country" onChange={handleForm('country')} />
          {/* {!isNameValid && (
            <FormHelperText error id="name-error">
              Please enter valid name
            </FormHelperText>
          )} */}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="state-input-box" required>
            State
          </InputLabel>
          <OutlinedInput required id="state-input-box" label="State" onChange={handleForm('state')} />
          {/* {!isNameValid && (
            <FormHelperText error id="name-error">
              Please enter valid name
            </FormHelperText>
          )} */}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="district-input-box" required>
            District
          </InputLabel>
          <OutlinedInput required id="district-input-box" label="District" onChange={handleForm('district')} />
          {/* {!isNameValid && (
            <FormHelperText error id="name-error">
              Please enter valid name
            </FormHelperText>
          )} */}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="taluka-input-box" required>
            Taluka
          </InputLabel>
          <OutlinedInput required id="taluka-input-box" label="taluka" onChange={handleForm('taluka')} />
          {/* {!isNameValid && (
            <FormHelperText error id="name-error">
              Please enter valid name
            </FormHelperText>
          )} */}
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="village-input-box" required>
            Village
          </InputLabel>
          <OutlinedInput required id="village-input-box" label="village" onChange={handleForm('village')} />
          {/* {!isNameValid && (
            <FormHelperText error id="name-error">
              Please enter valid name
            </FormHelperText>
          )} */}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmitForm}
          disabled={
            formData.continent === '' ||
            formData.country === 'other' ||
            formData.state === '' ||
            formData.district === '' ||
            formData.taluka === '' ||
            formData.village === ''
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
