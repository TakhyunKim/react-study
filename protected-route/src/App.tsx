import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

import Routers from "./routes";
import { worker } from "./mocks/browser";

import "./App.css";

worker.start();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Routers />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
