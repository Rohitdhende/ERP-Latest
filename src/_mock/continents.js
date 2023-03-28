import { BASE_URL } from '../constants';

export const getContinentList = async () => {
  const response = await fetch(`${BASE_URL}/continent`);
  const json = await response.json();
  console.log(json);
  return json;
};

export const CONTINENT_LIST = [
  {
    name: 'Africa 0',
    key: '0',
    isActive: true,
  },
  {
    name: 'Asia 1',
    key: '1',
    isActive: false,
  },
  {
    name: 'Europe 2',
    key: '2',
    isActive: true,
  },
  {
    name: 'North America 3',
    key: '3',
    isActive: false,
  },
  {
    name: 'Oceania 4',
    key: '4',
    isActive: true,
  },
  {
    name: 'South America 5',
    key: '5',
    isActive: true,
  },
  {
    name: 'Antarctica 6',
    key: '6',
    isActive: true,
  },
];

// ----------------------------------------------------------------------
