// src/components/Layout.jsx
import './Layout.css';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout-container">
      <aside className="menu-lateral">
        <h2>Unicred</h2>
        <nav>
          <a href="/cooperados">Cooperados</a>
          <a href="/cooperados/novo">Novo Cooperado</a>
          <a href="/">Sair</a>
        </nav>
      </aside>
      <main className="conteudo-principal">
        <Outlet />
      </main>
    </div>
  );
}
