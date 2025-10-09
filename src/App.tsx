import { BrowserRouter as Router, useLocation, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css'

import List from "./pages/list";
import AuthPage from "./pages/AuthPage";
import Settings from "./pages/Settings";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";

const queryClient = new QueryClient();

const AppRouter = () => {
  const location = useLocation();

  const protectedRoute = [
    { path: '/', element:
      <PrivateRoute>
        <List/>
      </PrivateRoute>
    },
    { path: '/settings', element:
      <PrivateRoute>
        <Settings/>
      </PrivateRoute>
    }
  ];

  const publicPath = [
    { path: '/login', element:
      <PublicRoute>
        <AuthPage/>
      </PublicRoute>
    },
    ...protectedRoute
  ];

  const routes = useRoutes(publicPath, location);

  return (
    <div key={location.pathname}>{routes}</div>
  )
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppRouter/>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
