import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryProviderWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:false
        }
    }
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default queryProviderWrapper;
