import { Avatar, Drawer, List, ListItemButton, styled } from '@mui/material'
import { Box, Text } from 'presentation/components'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import DescriptionIcon from '@mui/icons-material/Description'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import { useAuth } from 'presentation/hooks/use-auth'
import WidgetsIcon from '@mui/icons-material/Widgets'

const ListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  paddingX: 1,
  height: 48,
  color: theme.palette.text.secondary,
  fontSize: 14
}))

const User = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: 12,
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.grey[200]
}))

type Props = {
  isMenuOpen: boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar = memo(({ isMenuOpen, setIsMenuOpen }: Props) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { user } = useAuth()

  const push = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  return (
    <Box width={isMobile ? 0 : 280}>
      <Drawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        variant={isMobile ? 'temporary' : 'permanent'}
        PaperProps={{
          sx: {
            width: 280,
            height: '100%',
            borderRightStyle: isMobile ? 'hidden' : 'dashed'
          }
        }}
      >
        <User>
          <Avatar />
          <Box ml={1}>
            <Text fontWeight={500} color="text.secondary"></Text>
            <Text fontSize={14} color="text.secondary">
              Administrator
            </Text>
          </Box>
        </User>

        <List sx={{ paddingX: 2 }}>
          <ListItem onClick={() => push('/articles')}>
            <DescriptionIcon sx={{ marginRight: 1 }} />
            Resumes
          </ListItem>
          <ListItem onClick={() => push('/widgets')}>
            <WidgetsIcon sx={{ marginRight: 1 }} />
            Widgets
          </ListItem>
          <ListItem onClick={() => push('/account')}>
            <SettingsIcon sx={{ marginRight: 1 }} />
            Account
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
})
