import { UserState } from '~/store/user/profile'
import { UserSetting } from '~/store/user/setting'

// Define RootState interface
export interface RootState {
  user: {
    profile: UserState
    setting: UserSetting
  }
}
