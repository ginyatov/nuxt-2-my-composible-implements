import { computed } from 'vue'
import { useInstance } from '~/composition'

type InstanceReturnType = ReturnType<typeof useInstance>

export const wrapProperty = <K extends keyof InstanceReturnType>(
  property: K,
  makeComputed = true
) => {
  return (): InstanceReturnType[K] => {
    const instance = useInstance(property)

    if (makeComputed) {
      const computedValue = computed(() => instance[property])

      // Так как у нас vue 2.7 и мы НЕ хотим использовать `.value` в script setup,
      // то сделал такой грязный хак через Proxy
      return new Proxy(computedValue, {
        get(target, prop, receiver) {
          return target.value[prop]
        },
      }) as InstanceReturnType[K]
    }

    return instance[property]
  }
}

export const useRoute: () => InstanceReturnType['$route'] =
  wrapProperty('$route')

export const useRouter: () => InstanceReturnType['$router'] = wrapProperty(
  '$router',
  false
)
