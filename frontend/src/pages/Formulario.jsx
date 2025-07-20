import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { mask } from 'remask';
import './Formulario.css';

export default function Formulario() {
  const [form, setForm] = useState({
    nome: '',
    cpf_cnpj: '',
    data_nascimento: '',
    telefone: '',
    email: '',
    renda: '',
  });

  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState(''); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/cooperados/${id}`)
        .then(({ data }) => {
          setForm({
            nome: data.nome,
            cpf_cnpj: data.cpf,
            data_nascimento: formatarDataParaInput(data.data_nascimento),
            telefone: data.telefone,
            email: data.email,
            renda: data.renda || '',
          });
        })
        .catch(() => {
          setMensagem('Erro ao carregar os dados.');
          setTipoMensagem('erro');
        });
    }
  }, [id]);

  const formatarDataParaInput = (data) => {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let novoValor = value;

    if (name === 'cpf_cnpj') {
      const clean = value.replace(/\D/g, '');
      novoValor = mask(clean, clean.length <= 11 ? '999.999.999-99' : '99.999.999/9999-99');
    }

    if (name === 'telefone') {
      const clean = value.replace(/\D/g, '');
      novoValor = mask(clean, ['(99) 9999-9999', '(99) 9 9999-9999']);
    }

    if (name === 'data_nascimento') {
      const clean = value.replace(/\D/g, '');
      novoValor = mask(clean, '99/99/9999');
    }

    setForm({ ...form, [name]: novoValor });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      nome: form.nome,
      cpf: form.cpf_cnpj.replace(/\D/g, ''),
      data_nascimento: form.data_nascimento.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'),
      telefone: form.telefone.replace(/\D/g, ''),
      email: form.email,
      renda: form.renda,
    };

    const req = id
      ? api.put(`/cooperados/${id}`, payload)
      : api.post('/cooperados', payload);

    req
      .then(() => {
        setTipoMensagem('sucesso');
        setMensagem('Cooperado salvo com sucesso!');
        setTimeout(() => navigate('/cooperados'), 1500);
      })
      .catch((err) => {
      let msg = 'Erro ao salvar dados.';

      if (err.response) {
        const data = err.response.data;

        if (data.errors) {
          msg = Object.values(data.errors).flat().join('\n');
        } else if (data.message) {
          msg = data.message;
        }
      }

      setTipoMensagem('erro');
      setMensagem(msg);
    });

  };

  return (
    <div className="form-container">
      <h1>{id ? 'Editar Cooperado' : 'Novo Cooperado'}</h1>

      {mensagem && (
        <div className={`mensagem ${tipoMensagem}`}>
          {mensagem.split('\n').map((linha, i) => (
            <div key={i}>{linha}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario">
        {['nome', 'cpf_cnpj', 'data_nascimento', 'telefone', 'email', 'renda'].map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              id={field}
              value={form[field]}
              onChange={handleChange}
              required={field !== 'email'}
            />
          </div>
        ))}
        <div className="form-actions">
          <button type="submit" className="btn">Salvar</button>
        </div>
      </form>
    </div>
  );
}
