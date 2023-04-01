import { ChildrenBox } from './style'
import Button from '@mui/material/Button'
import { Modal as MuiModal } from '@mui/material';
import * as React from 'react'

type Props = {
  buttonText: string
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ buttonText, children }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button size='small' color='primary' onClick={handleOpen}>
        {buttonText}
      </Button>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ChildrenBox>{children}</ChildrenBox>
      </MuiModal>
    </div>
  )
}

export default Modal
