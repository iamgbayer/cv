import {
  Avatar,
  Container,
  Dialog,
  Divider,
  Fab,
  MenuItem,
  MenuList,
  Stack,
  useMediaQuery,
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
import { WorkExperiences } from 'presentation/pages/username/contents/work-experiences'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'

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
  SKILLS = 'SKILLS'
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
    [Content.GENERAL]: <>general</>,
    [Content.LANGUAGES]: <>languages</>,
    [Content.WORK_EXPERIENCES]: (
      <WorkExperiences data={data} render={render} setRender={setRender} />
    ),
    [Content.SKILLS]: <>skills</>
  }

  const canRenderWorkExperiences = !isEmpty(data.experiences)

  const canRender = (by) => {
    return isMobile ? render === by : true
  }

  return (
    <>
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <Stack flexDirection="row">
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
          position: 'absolute',
          left: 25,
          bottom: 25,
          boxShadow: 'none',
          fontSize: 14
        }}
        onClick={() => setDialog(true)}
        variant="extended"
      >
        <EditIcon />
        <Text>Edit profile</Text>
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
              <Text variant="body1">
                {data.general.role} in {data.general.location}
              </Text>
            </Stack>
          </Stack>

          <Stack marginY={4}>
            <Text variant="h5" marginBottom={1}>
              About
            </Text>
            <Text variant="body2">{data.general.about}</Text>
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
                        <Text variant="body2">{experience.location}</Text>
                      </Stack>
                    </Stack>
                  </>
                )
              })}
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

  await queryClient.fetchQuery([QUERIES.Resume], () =>
    new GetResumeRepository(container.get(GraphQLHttpClient)).execute(username)
  )

  return {
    props: {
      username,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
