import { useState } from 'react';
import { Button, Container, FormControl, OutlinedInput, Typography } from '@mui/material';

const UnderGroupActual = () => {
  const initialFormState = {
    continent: '',
    country: '',
    state: null,
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
    console.log(formData);
  };

  // Reset Data function to reset form inputs
  const resetData = () => {
    setFormData(initialFormState);
  };

  console.log('index', formData);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6">Residential Details</Typography>
      <Typography variant="body">Actual Level</Typography>
      <FormControl
        sx={{
          display: 'flex',
          width: '320px',
          marginTop: '1rem',
        }}
      >
        <Typography>Ward</Typography>
        <OutlinedInput required onChange={handleForm('ward')} />
      </FormControl>
      <FormControl
        sx={{
          display: 'flex',
          width: '320px',
          marginTop: '1rem',
        }}
      >
        <Typography>Societies</Typography>
        <OutlinedInput required onChange={handleForm('societies')} />
      </FormControl>
      <FormControl
        sx={{
          display: 'flex',
          width: '320px',
          marginTop: '1rem',
        }}
      >
        <Typography>Blocks</Typography>
        <OutlinedInput required onChange={handleForm('blocks')} />
      </FormControl>
      <FormControl
        sx={{
          display: 'flex',
          width: '320px',
          marginTop: '1rem',
        }}
      >
        <Typography>Number of Flats/ Houses</Typography>
        <OutlinedInput required onChange={handleForm('no_of_flats')} />
      </FormControl>
      <Container
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <Button onClick={resetData}>Cancel</Button>
        <Button
          onClick={handleSubmitForm}
          disabled={
            formData.continent === '' ||
            formData.country === 'other' ||
            formData.state === '' ||
            formData.state === null ||
            formData.district === '' ||
            formData.taluka === '' ||
            formData.village === ''
          }
        >
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default UnderGroupActual;
