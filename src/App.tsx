import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Marketplace } from './pages/Marketplace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/category/:categoryId" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
