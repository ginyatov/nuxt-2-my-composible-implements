import { getCurrentInstance } from 'vue'

export const useInstance = (nameHook?: string) => {
  const vm = getCurrentInstance()

  if (!vm) {
    const name = nameHook || 'useInstance'

    throw new Error(
      `${name} must be called within a setup function or script-setup.`
    )
  }

  return vm.proxy
}
