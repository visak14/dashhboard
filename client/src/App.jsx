import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";

import Charts from "./components/Charts";
import Login from "./components/Login";
import { RecoilRoot } from "recoil";


function App() {
  return (
    <RecoilRoot>
    <Router>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/charts" element={<Charts />} />
        </Route>
      </Routes>
    </Router>
    </RecoilRoot>
  );
}



export default App;
