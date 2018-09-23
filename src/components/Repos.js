import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const RepoTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding-bottom: 1rem;
  }
`;

const Extra = styled.td`
  width: 0;
  white-space: nowrap;
`;

const RepoLink = styled.a.attrs({
  target: '_blank'
})`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Repos = observer(({ repos, children: renderExtra }) => {
  if (repos.length === 0)
    return null;

  return (
    <RepoTable className="repo-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Language</th>
          <th>Latest tag</th>
        </tr>
      </thead>
      <tbody>
        {repos.map(repo => 
          <tr key={repo.id}>
            <td><RepoLink href={repo.url}>{repo.nameWithOwner}</RepoLink></td>
            <td>{repo.primaryLanguage}</td> 
            <td>{repo.lastReleaseTag || '-'}</td>
            <Extra>{renderExtra(repo)}</Extra>
          </tr>
        )}
      </tbody>
    </RepoTable>
  );
});

export default Repos;
