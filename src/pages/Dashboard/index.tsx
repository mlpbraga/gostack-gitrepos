import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  id: number;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [input, setInput] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storage = localStorage.getItem('@githubrepos:repositories');
    if (storage) return JSON.parse(storage);
    return [];
  });
  const [inputError, setInputError] = useState('');

  const handleAddRepositories = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!input) {
      setInputError('Digite autor/nome do repositório');
      return;
    }
    try {
      const response = await api.get<Repository>(
        `repos/${input.replace('-', '%2D')}`,
      );
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setInput('');
      setInputError('');
    } catch (error) {
      setInputError('Erro na busca por esse repositório');
    }
  };

  useEffect(() => {
    localStorage.setItem(
      '@githubrepos:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepositories}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(repo => (
          <a key={repo.id} href="teste">
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
