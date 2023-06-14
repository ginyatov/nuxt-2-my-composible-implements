import { Module } from 'vuex'
import { RootState } from '@/types/store'

export interface UserSetting {
  password: string
  role: string
}

const userSettingModule: Module<UserSetting, RootState> = {
  namespaced: true,
  state: () => ({
    password: '123456',
    role: 'admin',
  }),
}

export default userSettingModule
