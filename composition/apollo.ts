import {
  QueryOptions,
  DocumentNode,
  ApolloQueryResult,
  FetchResult,
  OperationVariables,
  MutationOptions,
  ApolloError,
} from '@apollo/client/core'
import { Ref, ref, onUnmounted } from 'vue'
import { useInstance } from '@/composition'
import { useEventHook } from '@/composition/utils/useEventHook'

type typeEventHookOff = Pick<ReturnType<typeof useEventHook>, 'off'>

type ReactiveFunction<TParam> = () => TParam

type ErrorWithApolloErrors = Error & {
  graphQLErrors?: ApolloError['graphQLErrors']
}

// cityID, token и publicUserId всегда прокинуты в запросах в Apollo Link, поэтому их можно исключить из типа
type OmitRequestConstantParams<T> = Omit<T, 'cityId' | 'token' | 'publicUserId'>

type UseQueryResult<TResult, TVariables> = {
  loading: Ref<boolean>
  result: Ref<TResult | undefined>
  error: Ref<ErrorWithApolloErrors | null>
  refetch: (
    variables?: OmitRequestConstantParams<TVariables>
  ) => Promise<ApolloQueryResult<TResult>>
  onResult: (
    fn: (result: ApolloQueryResult<TResult>) => void
  ) => typeEventHookOff
  onError: (fn: (error: ErrorWithApolloErrors) => void) => typeEventHookOff
}

export interface UseMutationOptions<
  TResult = any,
  TVariables = OperationVariables
> extends Omit<
    MutationOptions<TResult, OmitRequestConstantParams<TVariables>>,
    'mutation' | 'refetchQueries'
  > {
  throws?: 'auto' | 'always' | 'never'
}
type OptionsParameter<TResult, TVariables> = UseMutationOptions<
  TResult,
  OmitRequestConstantParams<TVariables>
>

export type MutateOverrideOptions<TResult> = Pick<
  UseMutationOptions<TResult>,
  | 'update'
  | 'optimisticResponse'
  | 'context'
  | 'updateQueries'
  | 'awaitRefetchQueries'
  | 'errorPolicy'
  | 'fetchPolicy'
>
export type MutateResult<TResult> = Promise<FetchResult<TResult> | null>
export type MutateFunction<TResult, TVariables> = (
  variables?: OmitRequestConstantParams<TVariables> | null,
  overrideOptions?: MutateOverrideOptions<TResult>
) => MutateResult<TResult>

export interface UseMutationReturn<TResult, TVariables> {
  mutate: MutateFunction<TResult, TVariables>
  loading: Ref<boolean>
  error: Ref<ErrorWithApolloErrors | null>
  called: Ref<boolean>
  onDone: (fn: (param: FetchResult<TResult>) => void) => typeEventHookOff
  onError: (fn: (param: ErrorWithApolloErrors) => void) => typeEventHookOff
}

type DocumentType = DocumentNode | ReactiveFunction<DocumentNode>

type UseLazyQueryResult<TResult, TVariables> = {
  loading: Ref<boolean>
  result: Ref<TResult | undefined>
  error: Ref<ErrorWithApolloErrors | null>
  load: (
    variables?: OmitRequestConstantParams<TVariables>
  ) => Promise<ApolloQueryResult<TResult>>
  refetch: (
    variables?: OmitRequestConstantParams<TVariables>
  ) => Promise<ApolloQueryResult<TResult>>
  onResult: (
    fn: (result: ApolloQueryResult<TResult>) => void
  ) => typeEventHookOff
  onError: (fn: (error: ErrorWithApolloErrors) => void) => typeEventHookOff
}

const getDocument = (query: DocumentType) => {
  if (typeof query === 'function') {
    return query()
  }
  return query
}

export const useApollo = () => {
  const vm = useInstance('useApollo')

  // @ts-ignore
  const apollo = vm.$apollo
  // @ts-ignore
  const apolloProvider = vm.$apolloProvider

  const useQuery = <TResult, TVariables>(
    document: DocumentType,
    variables?: OmitRequestConstantParams<TVariables>,
    options?: Omit<QueryOptions, 'variables' | 'query' | 'pollInterval'>
  ): UseQueryResult<TResult, TVariables> => {
    const loading = ref(true)
    const result = ref<TResult | undefined>()
    const error = ref<Error | null>(null)

    const resultEvent = useEventHook<ApolloQueryResult<TResult>>()
    const errorEvent = useEventHook<Error>()

    const queryOptions = {
      query: getDocument(document),
      variables,
      ...options,
    }

    const onQuerySuccess = (response: ApolloQueryResult<TResult>) => {
      result.value = response.data
      resultEvent.trigger(response)
    }

    const onQueryError = (errorResponse: Error) => {
      error.value = errorResponse
      errorEvent.trigger(errorResponse)
    }

    const onQueryCompletion = () => {
      loading.value = false
    }

    const refetch = (
      variablesLocal?: OmitRequestConstantParams<TVariables>
    ) => {
      return apollo.query<TResult, OmitRequestConstantParams<TVariables>>({
        ...queryOptions,
        fetchPolicy: 'network-only',
        variables: variablesLocal ?? variables,
      })
    }

    console.log(5555, apollo)
    /*  apollo.addSmartQuery<TResult, OmitRequestConstantParams<TVariables>>(
      'test',
      queryOptions
    ) */

    apollo
      .query<TResult, OmitRequestConstantParams<TVariables>>(queryOptions)
      .then(onQuerySuccess)
      .catch(onQueryError)
      .finally(onQueryCompletion)

    if (document instanceof Function) {
      const observe = apollo
        .watchQuery<TResult, OmitRequestConstantParams<TVariables>>(
          queryOptions
        )
        .subscribe({
          next: onQuerySuccess,
          error: onQueryError,
        })

      onUnmounted(() => {
        observe.unsubscribe()
      })
    }

    return {
      loading,
      result,
      refetch,
      error,
      onResult: resultEvent.on,
      onError: errorEvent.on,
    }
  }

  const useMutation = <
    TResult,
    TVariables extends OperationVariables = OperationVariables
  >(
    document: DocumentNode,
    options: OptionsParameter<TResult, TVariables> = {}
  ): UseMutationReturn<TResult, TVariables> => {
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const called = ref<boolean>(false)

    const doneEvent = useEventHook<FetchResult<TResult>>()
    const errorEvent = useEventHook<Error>()

    async function mutate(
      variables?: OmitRequestConstantParams<TVariables> | null,
      overrideOptions: Omit<
        UseMutationOptions<TResult, OmitRequestConstantParams<TVariables>>,
        'variables'
      > = {}
    ) {
      const mutationOptions = {
        mutation: document,
        ...options,
        ...overrideOptions,
        variables:
          variables ?? options.variables
            ? {
                ...(options.variables as OmitRequestConstantParams<TVariables>),
                ...(variables as OmitRequestConstantParams<TVariables>),
              }
            : undefined,
      }

      error.value = null
      loading.value = true
      called.value = true
      try {
        // Добить тип, уже запарился малехо :)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = await apollo.mutate<
          TResult,
          OmitRequestConstantParams<TVariables>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        >(mutationOptions)
        loading.value = false
        doneEvent.trigger(result)
        return result
      } catch (e) {
        error.value = e as ErrorWithApolloErrors
        loading.value = false
        errorEvent.trigger(e as ErrorWithApolloErrors)
        throw e
      }
    }

    return {
      mutate,
      called,
      error,
      loading,
      onDone: doneEvent.on,
      onError: errorEvent.on,
    }
  }

  const useLazyQuery = <TResult, TVariables>(
    document: DocumentNode,
    variables?: OmitRequestConstantParams<TVariables>,
    options?: Omit<QueryOptions<TVariables>, 'query' | 'variables'>
  ): UseLazyQueryResult<TResult, TVariables> => {
    const loading = ref(false)
    const result = ref<TResult | undefined>()
    const error = ref<ErrorWithApolloErrors | null>(null)

    const resultEvent = useEventHook<ApolloQueryResult<TResult>>()
    const errorEvent = useEventHook<ErrorWithApolloErrors>()

    const queryOptions = {
      query: document,
      fetchPolicy: 'network-only',
      ...options,
    }

    const load = async (
      variablesNew?: OmitRequestConstantParams<TVariables>
    ) => {
      loading.value = true
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await apollo.query<
          TResult,
          OmitRequestConstantParams<TVariables>
        >({
          ...queryOptions,
          variables: variablesNew ?? variables,
        })
        result.value = response.data
        resultEvent.trigger(response)
        return response
      } catch (e) {
        error.value = e as ErrorWithApolloErrors
        errorEvent.trigger(e as ErrorWithApolloErrors)
        throw e
      } finally {
        loading.value = false
      }
    }

    const refetch = (variables?: OmitRequestConstantParams<TVariables>) => {
      return load(variables)
    }

    return {
      loading,
      result,
      error,
      load,
      refetch,
      onResult: resultEvent.on,
      onError: errorEvent.on,
    }
  }

  return {
    apollo,
    apolloProvider,
    useQuery,
    useMutation,
    useLazyQuery,
  }
}
