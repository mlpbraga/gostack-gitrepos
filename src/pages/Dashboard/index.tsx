import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>
      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/28370139?s=460&u=65ae03943a50815a79c6a2b86f7fa82745f7d5ec&v=4"
            alt="Girhub Image"
          />
          <div>
            <strong>Titulo aqui</strong>
            <p>descriçãoa qui</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/28370139?s=460&u=65ae03943a50815a79c6a2b86f7fa82745f7d5ec&v=4"
            alt="Girhub Image"
          />
          <div>
            <strong>Titulo aqui</strong>
            <p>descriçãoa qui</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/28370139?s=460&u=65ae03943a50815a79c6a2b86f7fa82745f7d5ec&v=4"
            alt="Girhub Image"
          />
          <div>
            <strong>Titulo aqui</strong>
            <p>descriçãoa qui</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
