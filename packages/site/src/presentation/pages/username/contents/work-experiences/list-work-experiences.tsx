import { Divider, Link, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { Is } from 'domain/vos/is'
import { Text } from 'presentation/components'
import { Fragment } from 'react'
import { isEmpty } from 'lodash'
import { Controls } from '../../controls'

export const ListWorkExperiences = ({
  data,
  is = Is.NONE,
  hasControls = false,
  hasDivider = false
}) => {
  const canRenderData = is === Is.NONE && !isEmpty(data.languages)

  return (
    <>
      {canRenderData &&
        data.experiences.map((experience, index) => {
          return (
            <Fragment key={experience.id}>
              {hasDivider && <Divider />}

              <Stack flexDirection={['column', 'row']} paddingY={2}>
                <Stack flexDirection="row">
                  <Text variant="body2" color="text.secondary">
                    {dayjs(experience.from).format('MMM YYYY')}
                  </Text>
                  <Text variant="body2" color="text.secondary" marginX={1}>
                    —
                  </Text>
                  <Text variant="body2" color="text.secondary">
                    {dayjs(experience.to).format('MMM YYYY')}
                  </Text>
                </Stack>

                <Stack marginLeft={[0, 4]}>
                  <Text variant="body2">
                    {experience.title} at {experience.company}
                  </Text>
                  <Text variant="body2" color="text.secondary">
                    {experience.location}
                  </Text>

                  {hasControls && (
                    <Controls
                      item={experience}
                      list={data.experiences}
                      index={index}
                    />
                  )}
                </Stack>
              </Stack>
            </Fragment>
          )
        })}
    </>
  )
}
