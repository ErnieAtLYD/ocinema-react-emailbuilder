// @flow
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const ImageUploaderModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={(): void => {
          handleOpen();
        }}
      >
        Trigger modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="modal">
          <Tabs>
            <Tab label="Image gallery" />
            <Tab label="Add an image" />
            <Tab label="Get film assets" />
          </Tabs>
        </div>
      </Modal>
    </>
  );
};

export default ImageUploaderModal;
