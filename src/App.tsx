import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route index element={<HomePage/>}/>
      </Routes>
    </>
  );
}

export default App;
