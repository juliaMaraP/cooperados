import { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    data_nascimento: '',
    renda: '',
    telefone: '',
    email: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9501/cooperados', form);
      setMensagem('Cooperado cadastrado com sucesso!');
      setForm({
        nome: '',
        cpf: '',
        data_nascimento: '',
        renda: '',
        telefone: '',
        email: '',
      });
    } catch (err) {
      if (err.response?.data?.message) {
        setMensagem('Erro: ' + err.response.data.message);
      } else {
        setMensagem('Erro ao cadastrar cooperado.');
      }
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Cadastro de Cooperado</h1>
      <form onSubmit={handleSubmit}>
        {['nome', 'cpf', 'data_nascimento', 'renda', 'telefone', 'email'].map((field) => (
          <div key={field} style={{ marginBottom: '1rem' }}>
            <label>
              {field.replace('_', ' ').toUpperCase()}:
              <input
                type={field === 'data_nascimento' ? 'date' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required={field !== 'email'}
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </label>
          </div>
        ))}
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Cadastrar</button>
      </form>
      {mensagem && <p style={{ marginTop: '1rem' }}>{mensagem}</p>}
    </div>
  );
}

export default App;
