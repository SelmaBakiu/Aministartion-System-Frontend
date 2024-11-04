import {AxiosError} from "axios";
import {DefaultOptions, QueryCache, QueryClient} from "react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient(
  {
    defaultOptions: queryConfig,
    queryCache: new QueryCache({
      onError: (error, query) => {
        if(error instanceof AxiosError)
          console.error(`[AxiosError] ${error.message} for query ${query.queryKey}`);
          }
    }),
  }
);