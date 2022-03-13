import { AuthContext } from 'presentation/contexts'
import { useContext } from 'react'

export const useAuth = () => {
  return useContext(AuthContext)
}
