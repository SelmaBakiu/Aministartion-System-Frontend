import {AxiosError} from "axios";
import {DefaultOptions, QueryCache, QueryClient} from "react-query";
import {Alert} from "react-bootstrap";

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
            Alert(error.message);
          }
    }),
  }
);