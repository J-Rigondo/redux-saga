import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./page/Home";
import MarketCondition from "./page/MarketCondition";

function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/market-condition" element={<MarketCondition/>}/>
        </Routes>
    </BrowserRouter>

  );
}

export default App;
