import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Header, RepositoryInfo, Commits } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  id: number;
  full_name: string;
  description: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

interface Commit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    committer: {
      date: Date;
    };
  };
  committer: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repositoryData, setRepositoryData] = useState<Repository | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    const getRepositoryData = async (): Promise<void> => {
      try {
        const [repoinfo, commitsinfo] = await Promise.all([
          api.get(`/repos/${params.repository}`),
          api.get(`/repos/${params.repository}/commits`),
        ]);
        setRepositoryData(repoinfo.data);
        setCommits(commitsinfo.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRepositoryData();
  }, [params.repository]);
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>
      {repositoryData && (
        <RepositoryInfo>
          <header>
            <img src={repositoryData.owner.avatar_url} alt="nome" />
            <div>
              <strong>{repositoryData.full_name}</strong>
              <p>{repositoryData.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repositoryData.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repositoryData.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repositoryData.open_issues_count}</strong>
              <span>issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      {commits && (
        <Commits>
          {commits.map(commit => (
            <a key={commit.sha} href={commit.html_url}>
              <img
                src={commit.committer.avatar_url}
                alt={commit.committer.login}
              />
              <div>
                <strong>{commit.commit.message}</strong>
                <p>{commit.committer.login}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          ))}
        </Commits>
      )}
    </>
  );
};

export default Repository;
