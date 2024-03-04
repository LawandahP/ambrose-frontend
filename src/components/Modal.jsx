import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const TermsModal = ({ isOpen, onAgree, onClose }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleAgree = () => {
    if (isChecked) {
      onAgree();
    }
  };

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please read and agree to the terms and conditions to proceed.
        </DialogContentText>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheck} name="agree" />}
          label="I agree to the terms and conditions."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAgree} disabled={!isChecked}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsModal;