import {
  Avatar,
  Container,
  Dialog,
  Divider,
  Drawer,
  Fab,
  Link,
  MenuItem,
  MenuList,
  Stack,
  useTheme
} from '@mui/material'
import { container } from 'container/server'
import { GraphQLHttpClient } from 'infra/protocols/http/graphql-http-client'
import { GetResumeRepository } from 'infra/repositories/get-resume'
import { GetServerSideProps } from 'next'
import { Text } from 'presentation/components'
import { useGetResume } from 'presentation/hooks/use-get-resume'
import { QUERIES } from 'presentation/queries'
import { useState } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import EditIcon from '@mui/icons-material/Edit'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { WorkExperiences } from 'presentation/pages/username/contents/work-experiences/work-experiences'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Contacts,
  getName
} from 'presentation/pages/username/contents/contacts/contacts'
import { Languages } from 'presentation/pages/username/contents/languages/languages'
import { ListLanguages } from 'presentation/pages/username/contents/languages/list-languages'
import { Skills } from 'presentation/pages/username/contents/skills/skills'
import { ListSkills } from 'presentation/pages/username/contents/skills/list-skills'
import { General } from 'presentation/pages/username/contents/general/General'
import { ListContacts } from 'presentation/pages/username/contents/contacts/list-contacts'

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

export enum Render {
  MENU = 'MENU',
  CONTENT = 'CONTENT'
}

export default function ({ pageProps }) {
  const username = pageProps.username
  const { data, isLoading } = useGetResume(username)
  const theme = useTheme()
  const [dialog, setDialog] = useState(false)
  const [content, setContent] = useState(Content.GENERAL)
  const [render, setRender] = useState(Render.MENU)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
          <Link color="text.secondary">Logout</Link>
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

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          left: 90,
          bottom: 25,
          boxShadow: 'none',
          '.MuiTypography-root': {
            fontSize: 14,
            textTransform: 'none'
          }
        }}
        onClick={() => setDialog(true)}
        variant="extended"
      >
        <EditIcon fontSize="small" />
        <Text marginLeft={1}>Edit profile</Text>
      </Fab>

      <Fab
        size="medium"
        color="primary"
        sx={{
          position: 'fixed',
          left: 25,
          bottom: 25,
          boxShadow: 'none'
        }}
        onClick={() => setIsMenuOpen(true)}
      >
        <MenuIcon fontSize="small" />
      </Fab>

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
                {window.location.hostname}/{username}
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient()
  const username = query?.username as string

  try {
    await queryClient.fetchQuery([QUERIES.Resume], () =>
      new GetResumeRepository(container.get(GraphQLHttpClient)).execute(
        username
      )
    )
  } catch (error) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      username,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
