import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { CardActionArea, CardActions, IconButton } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import React, { useContext } from 'react'
import TransitionsModal from '~/components/uiParts/modalWork'
import ColorModeContext from '~/context/ColorModeContext'
import { WorkContext } from '~/context/WorkView'
import { Work } from '~/models/types'

type Props = {
  work: Work
}

export const WorkImageCard: React.FC<Props> = ({ work }): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const colorMode = useContext(ColorModeContext)

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component='img'
            height='140'
            image='/vercel.svg'
            alt='green iguana'
            sx={{ position: 'relative' }}
          />
          <CardContent>
            <Typography
              variant='subtitle1'
              color={`text.main`}
              sx={{
                position: 'absolute',
                zIndex: 100,
                top: 0,
                right: 10,
              }}
            >
              {work.user.name}
            </Typography>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              color='text.main'
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2, // 行数指定
                overflow: 'hidden',
              }}
            >
              {work.title}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3, // 行数指定
                overflow: 'hidden',
              }}
            >
              {work.summary}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <WorkContext.Provider value={{ work }}>
        <TransitionsModal handleOpen={handleOpen} handleClose={handleClose} open={open} />
      </WorkContext.Provider>
    </>
  )
}
