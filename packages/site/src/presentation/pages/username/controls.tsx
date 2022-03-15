import { Link, Stack } from '@mui/material'

export const Controls = ({ list, item, index }) => {
  const onEdit = (item) => {}

  const onMoveDown = (index) => {}

  const onDelete = (item) => {}

  return (
    <Stack flexDirection="row" marginTop={1}>
      <Link color="text.secondary" variant="body2" onClick={() => onEdit(item)}>
        Edit
      </Link>
      <Link
        color="text.secondary"
        variant="body2"
        marginX={1}
        onClick={() => onDelete(item)}
      >
        Delete
      </Link>
      <Link
        color="text.secondary"
        variant="body2"
        onClick={() => onMoveDown(index)}
      >
        Move down
      </Link>
    </Stack>
  )
}
