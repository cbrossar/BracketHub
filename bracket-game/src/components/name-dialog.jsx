import React from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function NameDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Display Name</DialogTitle>
        <DialogContent>
          <DialogContentText>Less is more.</DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Display Name"
            fullWidth
            value={props.value}
            onChange={props.handlePlayerChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Link to="/lobby" style={{ textDecoration: "none" }}>
            <Button onClick={props.handleSaveName} color="primary">
              Save Name
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
