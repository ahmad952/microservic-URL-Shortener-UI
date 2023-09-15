import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserScreen from "./screens/UserScreen";
import AdminScreen from "./screens/AdminScreen";
import AppBarAll from "./component/AppBarAll";
import { Paths } from "./routes";
import ErrorBoundary from "./features/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <AppBarAll />
      <Routes>
        <Route
          path={Paths.UserInputMask}
          element={
            <ErrorBoundary>
              <UserScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path={Paths.AdminOverview}
          element={
            <ErrorBoundary>
              <AdminScreen />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
