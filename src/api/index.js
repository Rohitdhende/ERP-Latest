import { BASE_URL } from '../constants';

export const getContinentList = async () => {
  const res = await fetch(`${BASE_URL}/continent`);
  const data = await res.json();
  return data;
};

export const getCountryList = async () => {
  const res = await fetch(`${BASE_URL}/country/`);
  const data = await res.json();
  return data;
};

export const getStateList = async () => {
  const res = await fetch(`${BASE_URL}/state`);
  const data = await res.json();
  return data;
};

export const getCityList = async () => {
  const res = await fetch(`${BASE_URL}/city`);
  const data = await res.json();
  return data;
};

export const createData = (type, data, callback) => {
  const formdata = new FormData();

  if (type === 'continent') {
    formdata.append('continate', data.name);
  }
  if (type === 'country') {
    formdata.append('continate_id', data.selectedContinent);
    formdata.append('country_name', data.name);
  }
  if (type === 'state') {
    formdata.append('country_id', data.selectedCountry);
    formdata.append('state_name', data.name);
  }

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${BASE_URL}/${type}/create/`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => callback(error));
};

export const updateData = (type, data, callback) => {
  const formdata = new FormData();
  console.log('seleccccc', data);
  if (type === 'continent') {
    formdata.append('continate', data.name);
    formdata.append('id', data.id);
    formdata.append('status', data.selectedStatus === 'true' ? '1' : '0');
  }

  if (type === 'country') {

    formdata.append('country_name', data.name);
    formdata.append('id', data.id);
    formdata.append('status', data.selectedStatus === 'true' ? '1' : '0');
  }

  const requestOptions = {
    method: 'PUT',
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${BASE_URL}/${type}/update/`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => callback(error));
};
