import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Formulario() {
  const [form, setForm] = useState({
    nome: '',
    cpf_cnpj: '',
    data_nascimento: '',
    telefone: '',
    email: '',
    renda: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:9501/cooperados/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => alert('Erro ao carregar dados.'));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const req = id
      ? axios.put(`http://localhost:9501/cooperados/${id}`, form)
      : axios.post('http://localhost:9501/cooperados', form);

    req.then(() => {
      alert('Salvo com sucesso!');
      navigate('/cooperados');
    }).catch(() => {
      alert('Erro ao salvar dados.');
    });
  };

  return (
    <div className="container">
      <h1>{id ? 'Editar Cooperado' : 'Novo Cooperado'}</h1>
      <form onSubmit={handleSubmit} className="form">
        {['nome', 'cpf_cnpj', 'data_nascimento', 'telefone', 'email', 'renda'].map((field) => (
          <div key={field} className="form-group">
            <label>{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field !== 'email'}
            />
          </div>
        ))}
        <button type="submit" className="button">Salvar</button>
      </form>
    </div>
  );
}
