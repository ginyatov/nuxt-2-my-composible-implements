import { computed, ComputedRef } from 'vue'
import { CommitOptions, DispatchOptions, Store } from 'vuex'
import { useInstance } from '~/composition'
import {
  RootState,
  RootGetters,
  RootMutations,
  RootActions,
} from '~/types/store'

type MapGettersReturnType<T extends Record<string, keyof RootGetters>> = {
  [K in keyof T]: ComputedRef<RootGetters[T[K]]>
}

const useMapGetters = <T extends Record<string, keyof RootGetters>>(
  map: T
): MapGettersReturnType<T> => {
  const store = useStore()

  return Object.entries(map).reduce((acc, [key, getter]) => {
    acc[key as keyof T] = computed(() => store.getters[getter])
    return acc
  }, {} as MapGettersReturnType<T>)
}

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

export const useStore = () => {
  const vm = useInstance('useStore')

  const store: Omit<Store<RootState>, 'getter'> & {
    getters: {
      [K in keyof RootGetters]: ReturnType<RootGetters[K]>
    }
  } = vm.$store

  const commit = <K extends keyof RootMutations>(
    key: K,
    payload: Parameters<RootMutations[K]>[1],
    options?: CommitOptions
  ): ReturnType<RootMutations[K]> | void => store.commit(key, payload, options)

  const dispatch = async <K extends keyof RootActions>(
    key: K,
    payload?: Parameters<RootActions[K]>[1],
    options?: DispatchOptions
  ): Promise<ReturnType<RootActions[K]>> =>
    await store.dispatch(key, payload, options)

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
