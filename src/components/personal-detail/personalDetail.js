import { useState } from 'react';
import { Button, Container, FormControl, FormGroup, OutlinedInput, Typography } from '@mui/material';

const UnderGroupAdminDashboard = () => {
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
    console.log(formData);
  };

  // Reset Data function to reset form inputs
  const resetData = () => {
    setFormData(initialFormState);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
              justifyContent: 'center',
            }}
          >
            <Typography>Religion</Typography>
            <OutlinedInput required id="religion-input-box" onChange={handleForm('Religion')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Community(Sampraday)</Typography>
            <OutlinedInput required onChange={handleForm('Community')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Sect(Panth)</Typography>
            <OutlinedInput required id="Sect-input-box" onChange={handleForm('Sect')} />
          </FormControl>
        </FormGroup>

        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Varna(i.e General/OBC/ST/SC)</Typography>
            <OutlinedInput required onChange={handleForm('varna')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Cast</Typography>
            <OutlinedInput required id="cast-input-box" onChange={handleForm('Cast')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Subcaste</Typography>
            <OutlinedInput required onChange={handleForm('subcaste')} />
          </FormControl>
        </FormGroup>

        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Gotra</Typography>
            <OutlinedInput required id="gotra-input-box" onChange={handleForm('gotra')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Sub Gotra</Typography>
            <OutlinedInput required onChange={handleForm('sub_gotra')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Pidhi(Generation)</Typography>
            <OutlinedInput required id="pidhi-input-box" onChange={handleForm('pidhi')} />
          </FormControl>
        </FormGroup>
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Post</Typography>
            <OutlinedInput required onChange={handleForm('post')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Post no.</Typography>
            <OutlinedInput required id="post_no-input-box" onChange={handleForm('post_no')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Relation</Typography>
            <OutlinedInput required onChange={handleForm('relation')} />
          </FormControl>
        </FormGroup>
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Real Name</Typography>
            <OutlinedInput required onChange={handleForm('real_name')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Pet Name</Typography>
            <OutlinedInput required id="pet_name-input-box" onChange={handleForm('pet_name')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Father name</Typography>
            <OutlinedInput required onChange={handleForm('father_name')} />
          </FormControl>
        </FormGroup>
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Mobile</Typography>
            <OutlinedInput required onChange={handleForm('mobile')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>DOB</Typography>
            <OutlinedInput required id="dob-input-box" onChange={handleForm('dob')} />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              width: '320px',
            }}
          >
            <Typography>Blood Group</Typography>
            <OutlinedInput required onChange={handleForm('blood_group')} />
          </FormControl>
        </FormGroup>
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
              formData.district === '' ||
              formData.taluka === '' ||
              formData.village === ''
            }
          >
            Submit
          </Button>
        </Container>
      </div>
    </>
  );
};

export default UnderGroupAdminDashboard;
