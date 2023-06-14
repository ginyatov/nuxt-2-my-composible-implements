// @ts-nocheck

import { computed, ComputedRef } from 'vue'
import { Store, mapState as mapStateVuex } from 'vuex'
import { useInstance } from '~/composition'
import { RootState } from '~/types/store'

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

  const store: Store<RootState> = vm.$store

  return {
    store,
    state: store.state,
    getters: store.getters,
    commit: store.commit,
    dispatch: store.dispatch,
    useMapState,
  }
}

export const useGetters = () => {
  const { getters } = useStore()

  return getters
}
