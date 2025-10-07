import { BrowserRouter as Router, useLocation, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import List from "./pages/list";

const queryClient = new QueryClient();

const AppRouter = () => {
  const location = useLocation();

  const routePath = [
    { path: '/', element: <List/>}
  ];

  const routes = useRoutes(routePath, location);

  return (
    <div key={location.pathname}>{routes}</div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRouter/>
      </Router>
    </QueryClientProvider>
  )
}

export default App
