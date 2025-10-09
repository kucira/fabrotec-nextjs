import { isServer, QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | undefined = undefined;
export const generateQueryClient = () => {
  if (isServer)
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 60 * 1000,
        },
      },
    });
  if (!queryClient) queryClient = new QueryClient();
  return queryClient;
};

export function cleanUpParams(params = {}, excludeEmptyValue = true) {
  const result: any = {};

  Object.entries(params).forEach((param) => {
    if (excludeEmptyValue) {
      if (param[1]) result[param[0]] = param[1];
    } else {
      result[param[0]] = param[1];
    }
  });

  return result;
}

export function paramsToString(
  params = {},
  excludeEmptyValue = true,
  sort = true,
) {
  const cleanParams = cleanUpParams(params, excludeEmptyValue);
  const paramsArray: string[] = [];

  Object.entries(cleanParams).forEach((param) => {
    paramsArray.push(`${param[0]}=${param[1]}`);
  });

  if (sort) paramsArray.sort();

  return paramsArray.length ? `?${paramsArray.join('&')}` : '';
}
