import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import React from "react";

export const queryProviderWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const renderWithQueryClient = (
  ui: React.ReactElement,
  client?: QueryClient
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        initialData: undefined,
        staleTime: 0,
      },
    },
  });

  const { rerender, ...result } = render(
    <QueryClientProvider client={client ? client : queryClient}>
      {ui}
    </QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => {
      <QueryClientProvider client={client ? client : queryClient}>
        {rerenderUi}
      </QueryClientProvider>;
    },
  };
};
