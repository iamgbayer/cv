import { render } from '@testing-library/react'
import { ListLanguages } from './list-languages'

it('Should render nothing when it does not have any languae', () => {
  render(<ListLanguages data={{ languages: [] }} />)
})
