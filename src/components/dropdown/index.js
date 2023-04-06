import PropTypes from 'prop-types';
// @mui
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

Dropdown.propTypes = {
  option: PropTypes.string,
  options: PropTypes.array,
  onSort: PropTypes.func,
  disabled: PropTypes.bool
};

export default function Dropdown({ option, options, onSort,disabled }) {
    
  return (
    <TextField disabled={disabled} select size="small" value={option} onChange={onSort} sx={{ outline: 'none', border: 'none' }}>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
