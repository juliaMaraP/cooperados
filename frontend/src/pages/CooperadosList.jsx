import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CooperadosList.css';

export default function CooperadosList() {
  const cooperadosMock = [
    { id: 1, nome: 'Maria Silva', cpf: '123.456.789-00', telefone: '(11) 99999-0000' },
    { id: 2, nome: 'João Souza', cpf: '987.654.321-00', telefone: '(21) 98888-1111' },
    { id: 3, nome: 'Carlos Lima', cpf: '321.654.987-00', telefone: '(31) 97777-2222' },
    { id: 4, nome: 'Ana Paula', cpf: '456.123.789-00', telefone: '(41) 96666-3333' },
    { id: 5, nome: 'Pedro Henrique', cpf: '789.321.654-00', telefone: '(51) 95555-4444' },
    { id: 6, nome: 'Luciana Costa', cpf: '159.753.486-00', telefone: '(61) 94444-5555' },
    { id: 7, nome: 'Rafael Santos', cpf: '753.159.852-00', telefone: '(71) 93333-6666' },
    // ... mais dados se quiser
  ];

  const [search, setSearch] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const porPagina = 5;

  const cooperadosFiltrados = cooperadosMock.filter(coop =>
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
          setPaginaAtual(1); // reseta pra primeira página ao buscar
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
