import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './CooperadosList.css';

export default function CooperadosList() {
  const [cooperados, setCooperados] = useState([]);
  const [search, setSearch] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const porPagina = 5;

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get('/cooperados');
        setCooperados(data);
      } catch (error) {
        console.error('Erro ao carregar cooperados:', error);
      }
    }

    carregar();
  }, []);

  const cooperadosFiltrados = cooperados.filter(coop =>
    coop.nome.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaginas = Math.ceil(cooperadosFiltrados.length / porPagina);
  const cooperadosPaginados = cooperadosFiltrados.slice(
    (paginaAtual - 1) * porPagina,
    paginaAtual * porPagina
  );

  const trocarPagina = (nova) => {
    if (nova >= 1 && nova <= totalPaginas) setPaginaAtual(nova);
  };

  return (
    <div className="lista-cooperados">
      <div className="cabecalho">
        <h1>Lista de Cooperados</h1>
        <Link to="/cooperados/novo" className="botao-novo">Novo Cooperado</Link>
      </div>

      <input
        type="text"
        className="campo-pesquisa"
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPaginaAtual(1);
        }}
      />

      <table className="tabela-cooperados">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cooperadosPaginados.length > 0 ? cooperadosPaginados.map((coop) => (
            <tr key={coop.id}>
              <td>{coop.nome}</td>
              <td>{coop.cpf}</td>
              <td>{coop.telefone}</td>
              <td>
                <Link to={`/cooperados/${coop.id}/editar`} className="botao-editar">Editar</Link>
                <button className="botao-excluir">Excluir</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Nenhum cooperado encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="paginacao">
        <button onClick={() => trocarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>Página {paginaAtual} de {totalPaginas}</span>
        <button onClick={() => trocarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>
    </div>
  );
}
