import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout.tsx";
import { ModalProvider } from "./contexts/ModalContext";

const SalesHome = lazy(() => import("./pages/sales-home/SalesHome"));
const CustomersHome = lazy(
  () => import("./pages/customers-home/CustomersHome")
);

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<CustomersHome />} />
      <Route path="sales" element={<SalesHome />} />
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <ModalProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
