import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";


function App() {
  return (
    <div >
      <Routes>
        <Route index element={<HomePage/>}/>
      </Routes>

    </div>
  );
}

export default App;
