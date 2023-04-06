import { useState } from 'react';
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { Continents } from '../../../data/Continents';
import { countries } from '../../../data/Countries';
import { states } from '../../../data/States';

import './UnderGroupLocation.css';

const UnderGroupLocation = () => {
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
    // navigate('/under-group-admin-actual');
  };

  // Reset Data function to reset form inputs
  const resetData = () => {
    setFormData(initialFormState);
  };

  // Update Country list after selecting the state
  const newCountryList = countries.filter((items) => items.continent.includes(formData?.continent));

  // Update State list after selecting the country
  const newStateList = states.filter((items) => items.country.includes(formData?.country));

  console.log('index', formData);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* <Typography variant="h6">Residential Details</Typography> */}
        <Typography variant="body">Virtual Level</Typography>
        <FormControl
          sx={{
            display: 'flex',
            width: '320px',
          }}
        >
          <Typography>Continent</Typography>
          <Select value={formData.continent} onChange={handleForm('continent')} displayEmpty>
            <MenuItem value="">
              <em>select the continent</em>
            </MenuItem>
            {Continents.map((continent, index) => (
              <MenuItem value={continent.name} key={index}>
                {continent.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            display: 'flex',
            width: '320px',
            marginTop: '1rem',
          }}
        >
          <Typography>Country</Typography>
          <Select
            value={formData.country}
            disabled={formData.continent === ''}
            onChange={handleForm('country')}
            displayEmpty
          >
            <MenuItem value="">
              <em>{formData.continent === '' ? 'select the continent first' : 'select the country'}</em>
            </MenuItem>
            {newCountryList.map((continent, index) => (
              <MenuItem value={continent.country} key={index}>
                {continent.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            display: 'flex',
            width: '320px',
            marginTop: '1rem',
          }}
        >
          <Typography>State</Typography>
          <Autocomplete
            freeSolo
            onChange={(event, newValue) => {
              setFormData({ ...formData, state: newValue });
            }}
            onInputChange={(event, newInputValue) => {
              setFormData({ ...formData, state: newInputValue });
            }}
            disabled={!!(formData.continent === '' || formData.country === '')}
            options={newStateList[0].states}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                value={formData.state}
                placeholder={formData.continent === '' || formData.country === '' ? 'Please Select Country first' : ''}
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{
            display: 'flex',
            width: '320px',
            marginTop: '1rem',
          }}
        >
          <Typography>District</Typography>
          <OutlinedInput required onChange={handleForm('district')} />
        </FormControl>
        <FormControl
          sx={{
            display: 'flex',
            width: '320px',
            marginTop: '1rem',
          }}
        >
          <Typography>Taluka</Typography>
          <OutlinedInput required onChange={handleForm('taluka')} />
        </FormControl>

        <FormControl
          sx={{
            display: 'flex',
            width: '320px',
            marginTop: '1rem',
          }}
        >
          <Typography>Village</Typography>
          <OutlinedInput required onChange={handleForm('village')} />
        </FormControl>
        <Container
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          {/* <Button onClick={resetData}>Cancel</Button>
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
          </Button> */}
        </Container>
      </div>
    </>
  );
};

export default UnderGroupLocation;
