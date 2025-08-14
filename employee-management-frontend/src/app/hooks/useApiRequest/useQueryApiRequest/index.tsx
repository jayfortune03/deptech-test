import { useCallback, useEffect } from 'react';

import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

import { SnackBarController } from '@/app/components/Snackbar';
import { allQueries } from '@/app/data-services/queries';
import { AxiosErrorResponse } from '@/app/types';
import { constructUrl } from '@/app/utils/constructUrl';

import useAxiosWithAuth from '../../use-axios-with-auth';
import useAxiosWithoutAuth from '../../use-axios-without-auth';
import { UseQueryApiRequestProps } from './types';

function useQueryApiRequest<T = unknown>({
  key,
  options,
  config,
  needAuth = true,
}: UseQueryApiRequestProps<T>) {
  const url = allQueries[key as keyof typeof allQueries];
  const queryClient = useQueryClient();
  const replacedUrl = constructUrl(url, config);

  const axiosWithAuth = useAxiosWithAuth();
  const axiosWithoutAuth = useAxiosWithoutAuth();
  const axiosFetch = needAuth ? axiosWithAuth : axiosWithoutAuth;

  const fetchData = useCallback(async () => {
    const response = await axiosFetch({
      method: 'GET',
      url: replacedUrl,
      params: config?.query,
    });
    if (!response) throw new Error('Response data is missing');
    if (response.data.message) return response.data.data;
    return response.data;
  }, [axiosFetch, config?.query, replacedUrl]);

  const queryOptions: Partial<
    Omit<UseQueryOptions<T, AxiosErrorResponse, T, QueryKey>, 'queryKey' | 'queryFn'>
  > = {
    retry: 1,
    ...options,
  };

  const queryFetch = useQuery<T, AxiosErrorResponse>({
    queryKey: [key, url, config],
    queryFn: fetchData,
    ...queryOptions,
  });
  useEffect(() => {
    if (queryFetch.isError && queryFetch.error) {
      SnackBarController.open({
        message: queryFetch.error.message,
        variant: 'Error',
      });
    }
  }, [queryFetch.isError, queryFetch.error, queryClient]);

  return queryFetch;
}

export default useQueryApiRequest;
