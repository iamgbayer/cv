import {
  Avatar,
  Container,
  Dialog,
  Drawer,
  Fab,
  Link,
  MenuItem,
  MenuList,
  Stack,
  styled,
  useTheme
} from '@mui/material'
import { Render } from 'domain/vos/render'
import { Text } from 'presentation/components'
import { useGetResume } from 'presentation/hooks/use-get-resume'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import React, { useState } from 'react'
import { Contacts } from './contents/contacts/contacts'
import { General } from './contents/general/general'
import { Languages } from './contents/languages/languages'
import { Skills } from './contents/skills/skills'
import { WorkExperiences } from './contents/work-experiences/work-experiences'
import { isEmpty } from 'lodash'
import MenuIcon from '@mui/icons-material/Menu'
import dayjs from 'dayjs'
import EditIcon from '@mui/icons-material/Edit'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ListContacts } from './contents/contacts/list-contacts'
import { ListLanguages } from './contents/languages/list-languages'
import { ListSkills } from './contents/skills/list-skills'
import { useAuth } from 'presentation/hooks/use-auth'
import { useRouter } from 'next/router'

const reorder = (list, startIndex, endIndex): any[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

enum Content {
  GENERAL = 'GENERAL',
  LANGUAGES = 'LANGUAGES',
  WORK_EXPERIENCES = 'WORK_EXPERIENCES',
  SKILLS = 'SKILLS',
  CONTACTS = 'CONTACTS'
}

type Props = {
  username: string
}

const Edit = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  left: 90,
  bottom: 25,
  boxShadow: 'none',
  '.MuiTypography-root': {
    fontSize: 14,
    textTransform: 'none'
  }
}))

const Hamburguer = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  left: 25,
  bottom: 25,
  boxShadow: 'none',
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.background.default
}))

export const Username = ({ username }: Props) => {
  const { data, isLoading, status } = useGetResume(username)
  const [dialog, setDialog] = useState(false)
  const [content, setContent] = useState(Content.GENERAL)
  const [render, setRender] = useState(Render.MENU)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { isAuthenticated, unauthenticate } = useAuth()
  console.log(status, isLoading, data)
  const isMobile = useIsMobile()
  const [list, setList] = useState([
    {
      title: 'Languages',
      id: Content.LANGUAGES
    },
    {
      title: 'Work Experiences',
      id: Content.WORK_EXPERIENCES
    },
    {
      title: 'Skills',
      id: Content.SKILLS
    },
    {
      title: 'Contacts',
      id: Content.CONTACTS
    }
  ])

  if (isLoading) {
    return <></>
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const items = reorder(list, result.source.index, result.destination.index)

    setList(items)
  }

  const contents = {
    [Content.GENERAL]: <General data={data} setRender={setRender} />,
    [Content.LANGUAGES]: (
      <Languages data={data} render={render} setRender={setRender} />
    ),
    [Content.WORK_EXPERIENCES]: (
      <WorkExperiences data={data} render={render} setRender={setRender} />
    ),
    [Content.SKILLS]: (
      <Skills data={data} render={render} setRender={setRender} />
    ),
    [Content.CONTACTS]: (
      <Contacts data={data} render={render} setRender={setRender} />
    )
  }

  const canRenderWorkExperiences = !isEmpty(data.experiences)
  const canRenderContacts = !isEmpty(data.contacts)
  const canRenderSkills = !isEmpty(data.skills)
  const canRenderLanguages = !isEmpty(data.languages)

  const canRender = (by) => (isMobile ? render === by : true)

  return (
    <>
      <Drawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <Stack
          padding={3}
          paddingBottom={15}
          justifyContent="flex-end"
          height="100%"
          width={230}
        >
          <Stack marginBottom={5}>
            <Avatar
              alt={data.general.displayName}
              src={data.general.photoUrl}
            />
          </Stack>

          <Link color="text.secondary">Settings</Link>
          <Link color="text.secondary" onClick={() => unauthenticate()}>
            Logout
          </Link>
        </Stack>
      </Drawer>

      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <Stack flexDirection="row" minHeight={550}>
          {canRender(Render.MENU) && (
            <Stack padding={3} width={isMobile ? '100%' : 265}>
              <Text>Profile</Text>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <MenuList
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <MenuItem
                        onClick={() => {
                          setRender(Render.CONTENT)
                          setContent(Content.GENERAL)
                        }}
                      >
                        <Text>General</Text>
                      </MenuItem>

                      {list.map((item, index) => (
                        <Draggable
                          key={item.title}
                          draggableId={item.title}
                          index={index}
                        >
                          {(provided) => (
                            <MenuItem
                              onClick={() => {
                                setRender(Render.CONTENT)
                                setContent(item.id)
                              }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={provided.draggableProps.style}
                            >
                              <Stack
                                justifyContent="space-between"
                                width="100%"
                                flexDirection="row"
                              >
                                <Text>{item.title}</Text>
                                <Stack
                                  paddingLeft={3}
                                  {...provided.dragHandleProps}
                                >
                                  <DragHandleIcon />
                                </Stack>
                              </Stack>
                            </MenuItem>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </MenuList>
                  )}
                </Droppable>
              </DragDropContext>
            </Stack>
          )}

          {canRender(Render.CONTENT) && (
            <Stack padding={3} width="100%">
              {contents[content]}
            </Stack>
          )}
        </Stack>
      </Dialog>

      {isAuthenticated && (
        <>
          <Edit onClick={() => setDialog(true)} variant="extended">
            <EditIcon fontSize="small" />
            <Text marginLeft={1}>Edit profile</Text>
          </Edit>

          <Hamburguer size="medium" onClick={() => setIsMenuOpen(true)}>
            <MenuIcon fontSize="small" />
          </Hamburguer>
        </>
      )}

      <Container maxWidth="md">
        <Stack paddingY={8}>
          <Stack flexDirection="row">
            <Avatar
              alt={data.general.displayName}
              src={data.general.photoUrl}
              sx={{ width: 80, height: 80 }}
            />

            <Stack marginLeft={2}>
              <Text variant="h3">{data.general.displayName}</Text>
              <Text variant="body1" color="text.secondary">
                {data.general.role} in {data.general.location}
              </Text>
              <Text fontSize={14} color="text.secondary">
                {username}
              </Text>
            </Stack>
          </Stack>

          <Stack marginY={4}>
            <Text variant="h5" marginBottom={1}>
              About
            </Text>
            <Text variant="body2" color="text.secondary">
              {data.general.about}
            </Text>
          </Stack>

          {canRenderWorkExperiences && (
            <Stack>
              <Text variant="h5">Work experiences</Text>

              {data.experiences.map((experience) => {
                return (
                  <>
                    <Stack flexDirection="row" paddingY={2}>
                      <Text variant="body2" color="text.secondary">
                        {dayjs(experience.from).format('MMM YYYY')}
                      </Text>
                      <Text variant="body2" color="text.secondary" marginX={1}>
                        -
                      </Text>
                      <Text variant="body2" color="text.secondary">
                        {dayjs(experience.to).format('MMM YYYY')}
                      </Text>

                      <Stack marginLeft={4}>
                        <Text variant="body2">
                          {experience.title} at {experience.company}
                        </Text>
                        <Text variant="body2" color="text.secondary">
                          {experience.location}
                        </Text>
                      </Stack>
                    </Stack>
                  </>
                )
              })}
            </Stack>
          )}

          {canRenderContacts && (
            <Stack>
              <Text variant="h5" marginBottom={1}>
                Contacts
              </Text>

              <ListContacts data={data} />
            </Stack>
          )}

          {canRenderLanguages && (
            <Stack>
              <Text variant="h5" marginBottom={1}>
                Languages
              </Text>

              <ListLanguages hasControls={false} data={data} />
            </Stack>
          )}

          {canRenderSkills && (
            <Stack>
              <Text variant="h5" marginBottom={1}>
                Skills
              </Text>

              <ListSkills data={data} />
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  )
}
