import { Divider, Stack } from '@mui/material'
import React, { Fragment } from 'react'
import { isEmpty } from 'lodash'
import { Text } from 'presentation/components'
import { getLanguageName, getProficiencyName } from './languages'
import { Controls } from '../../controls'
import { Is } from 'domain/vos/is'

export const ListLanguages = ({
  data,
  is = Is.NONE,
  hasControls = false,
  hasDivider = false
}) => {
  const canRenderData = is === Is.NONE && !isEmpty(data.languages)

  return (
    <>
      {canRenderData &&
        data.languages.map((language, index) => {
          return (
            <Fragment key={language.id}>
              {hasDivider && <Divider />}
              <Stack flexDirection={['column', 'row']} paddingY={2}>
                <Text variant="body2" width={60} color="text.secondary">
                  {getLanguageName(language.language)}
                </Text>

                <Stack marginLeft={[0, 4]}>
                  <Text variant="body2">
                    {getProficiencyName(language.proficiency)}
                  </Text>

                  {hasControls && (
                    <Controls
                      list={data.languages}
                      index={index}
                      item={language}
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
