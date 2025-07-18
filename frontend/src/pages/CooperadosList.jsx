import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './CooperadosList.css';
import { mask } from 'remask';

export default function CooperadosList() {
  const [cooperados, setCooperados] = useState([]);
  const [search, setSearch] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  const porPagina = 5;

  useEffect(() => {
     api.get('/cooperados')
      .then(res => setCooperados(res.data))
      .catch(() => alert('Erro ao carregar cooperados.'));
  }, []);

  const formatarCpfCnpj = (valor) => {
    const digits = valor.replace(/\D/g, '');
    if (digits.length === 11) {
      return mask(digits, '999.999.999-99');
    } else if (digits.length === 14) {
      return mask(digits, '99.999.999/9999-99');
    }
    return valor;
  };

  const formatarTelefone = (valor) => {
    const digits = valor.replace(/\D/g, '');
    if (digits.length === 10) {
      return mask(digits, '(99) 9999-9999');
    } else if (digits.length === 11) {
      return mask(digits, '(99) 99999-9999');
    }
    return valor;
  };

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

  const abrirModalExclusao = (id) => {
  setIdParaExcluir(id);
  setMostrarModal(true);
};

const confirmarExclusao = () => {
  api.delete(`/cooperados/${idParaExcluir}`)
    .then(() => {
      setCooperados((prev) => prev.filter(c => c.id !== idParaExcluir));
      setMostrarModal(false);
      alert('Cooperado excluído com sucesso.');
    })
    .catch(() => {
      alert('Erro ao excluir cooperado.');
      setMostrarModal(false);
    });
};

const cancelarExclusao = () => {
  setIdParaExcluir(null);
  setMostrarModal(false);
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
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cooperadosPaginados.length > 0 ? cooperadosPaginados.map((coop) => (
            <tr key={coop.id}>
              <td>{coop.nome}</td>
              <td>{formatarCpfCnpj(coop.cpf)}</td>
              <td>{formatarTelefone(coop.telefone)}</td>
              <td>
                <Link to={`/cooperados/${coop.id}/editar`} className="botao-editar">Editar</Link>
                <button className="botao-excluir" onClick={() => abrirModalExclusao(coop.id)}>Excluir</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Nenhum cooperado encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

  {mostrarModal && (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmar exclusão</h2>
        <p>Tem certeza que deseja excluir este cooperado?</p>
        <div className="modal-botoes">
          <button className="confirmar" onClick={confirmarExclusao}>Sim, excluir</button>
          <button className="cancelar" onClick={cancelarExclusao}>Cancelar</button>
        </div>
      </div>
    </div>
  )}

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
