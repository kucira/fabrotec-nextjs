"use client";

import {
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { generateQueryClient } from "./libs";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = generateQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
