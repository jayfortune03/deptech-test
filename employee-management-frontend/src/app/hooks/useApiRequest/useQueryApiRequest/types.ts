import { UseQueryOptions } from '@tanstack/react-query';

import { AllQueriesKeys } from '@/app/data-services/queries';
import { AxiosErrorResponse } from '@/app/types';

export interface UseQueryApiRequestProps<T> {
  key: AllQueriesKeys;
  config?: {
    params?: Record<string, string>;
    query?: Record<string, unknown>;
  };
  options?: Omit<UseQueryOptions<T, AxiosErrorResponse>, 'queryKey'>;
  needAuth?: boolean;
}
