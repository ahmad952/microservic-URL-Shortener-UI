import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserScreen from "./screens/UserScreen";
import AdminScreen from "./screens/AdminScreen";
import AppBarAll from "./component/AppBarAll";
import { Paths } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AppBarAll />
      <Routes>
        <Route path={Paths.UserInputMask} element={<UserScreen />} />
        <Route path={Paths.AdminOverview} element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
