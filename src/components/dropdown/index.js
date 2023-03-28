import PropTypes from 'prop-types';
// @mui
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

Dropdown.propTypes = {
  option: PropTypes.string,
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function Dropdown({ option, options, onSort }) {
    
  return (
    <TextField select size="small" value={option} onChange={onSort} sx={{ outline: 'none', border: 'none' }}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
