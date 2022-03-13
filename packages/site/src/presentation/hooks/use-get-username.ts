import { useRouter } from 'next/router'

export const useGetUsername = () => {
  const router = useRouter()
  const id = router.query?.id

  return id
}
