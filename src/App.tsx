import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserScreen from "./screens/UserScreen";
import AdminScreen from "./screens/AdminScreen";
import AppBarAll from "./component/AppBarAll";

function App() {
  return (
    <BrowserRouter>
      <AppBarAll />
      <Routes>
        <Route path="/" element={<UserScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
