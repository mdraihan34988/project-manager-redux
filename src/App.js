import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
// import Conversation from "./pages/Conversation";
// import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import ProductPanel from "./pages/ProductPanel";
import Register from "./pages/Register";
import TeamPanel from "./pages/TeamPanel";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Layout>
                <TeamPanel />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Layout>
                <ProductPanel />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
