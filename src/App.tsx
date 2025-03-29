import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OrderProvider } from "@/lib/OrderContext";
import Index from "@/pages/Index";
import BlogPostPage from "@/pages/BlogPostPage";
import NotFound from "@/pages/NotFound";
import BlankPage from "@/pages/BlankPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/blog/google-cloud-free-trial",
    element: <BlogPostPage />,
  },
  {
    path: "/blank",
    element: <BlankPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
        </TooltipProvider>
      </OrderProvider>
    </QueryClientProvider>
  );
};

export default App;
