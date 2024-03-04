import React, { useContext, useState } from 'react';
import { UserContext } from '../hooks/useAuth';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const AgreementButton = () => {
  const { updateAgreementStatus, agreementStatus } = useContext(UserContext);
  const [role, setRole] = useState('');

  const handleAgree = () => {
    updateAgreementStatus(!agreementStatus);
  };

  const handleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    localStorage.setItem('selectedRole', selectedRole);
  };

  return (
    <>
      <FormControl fullWidth sx={{marginTop: "10px"}}>
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          small
          labelId="role-select-label"
          id="role-select"
          value={role}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value="GUEST">Guest</MenuItem>
          <MenuItem value="CLIENT">Client</MenuItem>
          <MenuItem value="OWNER">Owner</MenuItem>
          <MenuItem value="COMPANY">Company</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Checkbox checked={agreementStatus} onChange={handleAgree} name="agree" />}
        label="I agree to the terms and conditions."
      />
    </>
  );
};

export default AgreementButton;