import { Divider, Stack } from '@mui/material'
import React, { Fragment } from 'react'
import { isEmpty } from 'lodash'
import { Text } from 'presentation/components'
import { getName, Is } from './contacts'
import { Controls } from '../../controls'

export const ListContacts = ({
  data,
  is = Is.NONE,
  hasControls = false,
  hasDivider = false
}) => {
  const canRenderData = is === Is.NONE && !isEmpty(data.contacts)

  return (
    <>
      {canRenderData &&
        data.contacts.map((contact, index) => {
          return (
            <Fragment key={contact.id}>
              {hasDivider && <Divider />}

              <Stack flexDirection="row" paddingY={2}>
                <Text variant="body2" width={60} color="text.secondary">
                  {getName(contact.type)}
                </Text>

                <Stack marginLeft={4}>
                  <Text variant="body2">{contact.value}</Text>

                  {hasControls && (
                    <Controls
                      list={data.contacts}
                      index={index}
                      item={contact}
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
