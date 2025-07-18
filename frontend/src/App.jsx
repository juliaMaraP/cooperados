import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CooperadosList from './pages/CooperadosList';
import Formulario from './pages/Formulario';
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/cooperados" element={<CooperadosList />} />
          <Route path="/cooperados/novo" element={<Formulario />} />
          <Route path="/cooperados/:id/editar" element={<Formulario />} />
        </Route>
      </Routes>
    </Router>
  );
}
