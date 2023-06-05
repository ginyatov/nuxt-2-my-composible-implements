import { UserState } from '~/store/user/profile'

// Define RootState interface
export interface RootState {
  user: {
    profile: UserState
  }
}
