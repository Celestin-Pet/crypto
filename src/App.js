
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import Coins from './Coins.jsx';
import Coin from './Coin.jsx';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/crypto-currency" element={<Navigate to={<Coins />} />} />
        <Route path="/" element={<Coins />} />
        <Route path="coin/:coinId" element={<Coin />} />
      </Routes>
    </HashRouter>
  );
}

export default App;