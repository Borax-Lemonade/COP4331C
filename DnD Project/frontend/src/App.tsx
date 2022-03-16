import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./pages/Frontpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

/*

TODO: Add routing
TODO: Add protected routes
TODO: Add loading screen for getting jwt
TODO: Complete Login, Signup, and Front pages

*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<FrontPage />} />
          {/* Up to you guys if you want to combine it into one file  */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
