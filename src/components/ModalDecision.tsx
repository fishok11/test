import { Modal, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';

type ModalDesisionProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  averageGrade: number | undefined;
  decision: string;
};

const ModalDesision: FC<ModalDesisionProps> = ({
  openModal,
  setOpenModal,
  averageGrade,
  decision,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          p: '10px',
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Решение
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Средний балл: {averageGrade}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {decision}
        </Typography>
      </Paper>
    </Modal>
  );
};

export default ModalDesision;
