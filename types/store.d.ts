import { ActionContext } from 'vuex'
import { UserState } from '~/store/user/profile'
import { UserSetting } from '~/store/user/setting'
import {
  State as CartState,
  Getters as CartGetter,
  Actions as CartActions,
  Mutations as CartMutations,
} from '~/store/cart'
import {
  State as ProductState,
  Getters as ProductGetter,
  Actions as ProductAction,
  Mutations as ProductMutations,
} from '~/store/cart/product'
import { Getters as TestGetter } from '~/store/cart/test'
import {
  Getters as CarGetter,
  Actions as CarActions,
  Mutations as CarMutations,
} from '~/store/car'

// Define RootState interface
export interface RootState {
  user: {
    profile: UserState
    setting: UserSetting
  }
  cart: CartState & {
    product: ProductState
  }
}

type ModulesMappingHelper<T, ModuleName extends string> = {
  [K in keyof T as `${ModuleName}/${string & K}`]: T[K]
}

export type RootActions = ModulesMappingHelper<CartActions, 'cart'> &
  ModulesMappingHelper<ProductAction, 'cart/product'> &
  ModulesMappingHelper<CarActions, 'car'>

export type RootMutations = ModulesMappingHelper<CartMutations, 'cart'> &
  ModulesMappingHelper<ProductMutations, 'cart/product'> &
  ModulesMappingHelper<CarMutations, 'car'>

export type RootGetters = ModulesMappingHelper<CartGetter, 'cart'> &
  ModulesMappingHelper<ProductGetter, 'cart/product'> &
  ModulesMappingHelper<TestGetter, 'cart/test'> &
  ModulesMappingHelper<CarGetter, 'car'>

type Mutations<State> = {
  [key: string]: (state: State, payload: any) => any
}

export type ActionAugments<State, M extends Mutations<State>> = Omit<
  ActionContext<State, RootState>,
  'commit'
> & {
  commit<K extends keyof M>(
    key: K,
    payload: Parameters<M[K]>[1]
  ): ReturnType<M[K]>
}
