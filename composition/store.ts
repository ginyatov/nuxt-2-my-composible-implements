// @ts-nocheck

import { computed, ComputedRef } from 'vue'
import { CommitOptions, DispatchOptions, Store } from 'vuex'
import { useInstance } from '~/composition'
import {
  RootState,
  RootGetters,
  RootMutations,
  RootActions,
} from '~/types/store'

type MapStateReturnType<T extends Record<string, (state: RootState) => any>> = {
  [K in keyof T]: ComputedRef<ReturnType<T[K]>>
}

const useMapState = <T extends Record<string, (state: RootState) => any>>(
  map: T
): MapStateReturnType<T> => {
  const store = useStore()

  return Object.entries(map).reduce((acc, [key, getter]) => {
    acc[key as keyof T] = computed(() => getter(store.state))
    return acc
  }, {} as MapStateReturnType<T>)
}
/*
Old

const useMapState = <T extends Record<string, (state: RootState) => any>>(
  map: T
): { [K in keyof T]: ComputedRef<ReturnType<T[K]>> } => {
  const store = useStore()

  return Object.entries(map).reduce((acc, [key, getter]) => {
    acc[key as keyof T] = computed(() => getter(store.state))
    return acc
  }, {} as MapStateReturnType<T>)
} */

export const useStore = () => {
  const vm = useInstance('useStore')

  const store: Omit<Store, 'getter'> & {
    getters: {
      [K in keyof RootGetters]: ReturnType<RootGetters[K]>
    }
  } = vm.$store

  const commit = <K extends keyof RootMutations>(
    key: K,
    payload: Parameters<RootMutations[K]>[1],
    options?: CommitOptions
  ): ReturnType<RootMutations[K]> => store.commit(key, payload, options)

  const dispatch = <K extends keyof RootActions>(
    key: K,
    payload?: Parameters<RootActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<RootActions[K]> => store.dispatch(key, payload, options)

  return {
    store,
    state: store.state,
    getters: store.getters,
    commit,
    dispatch,
    useMapState,
    useMapGetters,
  }
}

export const useGetters = () => {
  const { getters } = useStore()

  return getters
}
