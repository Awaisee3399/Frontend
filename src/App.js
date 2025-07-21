// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import SignIn from "./Auth/Signin";
// import Taskmanagenment from "./Taskmanagenment";
// import SignUp from "./Auth/SignUp";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/Taskmanagenment" element={<Taskmanagenment />} />
//         <Route path="/SignUp" element={<SignUp />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Auth/Signin";
import SignUp from "./Auth/Signup";
import Taskmanagenment from "./Taskmanagenment";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Taskmanagenment"
          element={
            <PrivateRoute>
              <Taskmanagenment />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
