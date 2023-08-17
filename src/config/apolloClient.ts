import { IncomingMessage, ServerResponse } from 'http';
import { useMemo } from 'react';
import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map((graphqlError) => graphqlError);
  }
  if (networkError) {
    console.error('networkError', networkError);
  }
  // prepared for logging
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

function createApolloClient() {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token') || '';

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const uri = process.env.SERVER_URL;

  const httpLink = new HttpLink({
    uri,
    credentials: 'same-origin',
  });

  return new ApolloClient({
    cache,
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.concat(errorLink, authLink.concat(httpLink)),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null,
): ApolloClient<NormalizedCacheObject> {
  const apolloClientInitialized = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = apolloClientInitialized.extract();

    apolloClientInitialized.cache.restore({
      ...existingCache,
      ...initialState,
    });
  }

  if (typeof window === 'undefined') return apolloClientInitialized;

  if (!apolloClient) apolloClient = apolloClientInitialized;

  return apolloClientInitialized;
}

export function useApollo(
  initialState: NormalizedCacheObject | null,
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
