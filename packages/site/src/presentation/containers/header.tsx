import React, { memo, useContext, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Box,
  Stack,
  AppBar,
  Toolbar as T,
  Popover,
  Avatar,
  Divider,
  MenuItem,
  IconButton
} from '@mui/material'
import { useRouter } from 'next/router'
import { AuthContext } from 'presentation/contexts'
import MenuIcon from '@mui/icons-material/Menu'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'

type RootProps = {
  isCollapse: boolean | undefined
}

const Root = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse'
})<RootProps>(({ isCollapse, theme }) => ({
  boxShadow: 'none',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter
  })
}))

const Toolbar = styled(T)<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  minHeight: 88,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(0, isMobile ? 2 : 5)
}))

const PopoverItem = styled(MenuItem)({
  borderRadius: 1,
  minHeight: 22
})

type Props = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = memo(({ setIsMenuOpen }: Props) => {
  const avatarRef = useRef()
  const isMobile = useIsMobile()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { logout, user } = useContext(AuthContext)

  const name = user.displayName

  return (
    <Root as="div" isCollapse={false}>
      <Toolbar isMobile={isMobile}>
        <IconButton onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </IconButton>

        <Box flexGrow={1} />

        <IconButton onClick={() => setIsPopoverOpen(true)}>
          <Avatar ref={avatarRef} />
        </IconButton>

        <Popover
          open={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          anchorEl={avatarRef.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{
            sx: {
              marginTop: 1.5
            }
          }}
        >
          <PopoverItem>{name}</PopoverItem>

          <Divider />

          <Stack spacing={0.5}>
            <PopoverItem>Profile</PopoverItem>
            <PopoverItem>Settings</PopoverItem>
          </Stack>

          <Divider />

          <PopoverItem onClick={logout}>Logout</PopoverItem>
        </Popover>
      </Toolbar>
    </Root>
  )
})
