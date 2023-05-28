import { useState } from "react";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import useAuthorization from "../../hooks/useAuthorization";

export const Login = () => {
  const [open, setOpen] = useState(true);

  const [inputEmail, setInputEmail] = useState("");

  const { setEmail, login } = useAuthorization();
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    setEmail(inputEmail);
    login(inputEmail);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container maxWidth="sm">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent style={{ width: "30rem" }}>
          <DialogContentText>Please provide to continue</DialogContentText>
          <TextField
            autoFocus
            error={!isValidEmail(inputEmail)}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              if (isValidEmail(e.target.value)) {
                setInputEmail(e.target.value);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!isValidEmail(inputEmail)} onClick={handleLogin}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
