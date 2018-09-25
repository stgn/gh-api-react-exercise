import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import { LinkButton } from './ui.js';
import Repos from './Repos.js';
import SearchForm from './SearchForm.js';

const Warning = styled.div`
  color: #f66;
  border: 1px solid #f66;
  border-radius: 0.25rem;
  background: #fee;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const SearchView = observer(class SearchView extends Component {
  doSearch = query => {
    const { settings, search } = this.props.app;
    const { apiToken } = settings;
    search.fetchResults(apiToken, query);
  }

  isRepoFavorited = id => {
    const { favorites } = this.props.app.favorites;
    return favorites.some(repo => repo.id === id);
  }

  renderSearchResultsAction = repo => {
    const { favorites } = this.props.app;

    if (this.isRepoFavorited(repo.id))
      return null;

    return (
      <LinkButton onClick={() => favorites.add(repo)}>
        Add
      </LinkButton>
    );
  }

  render() {
    const { search, settings } = this.props.app;

    return (
      <div>
        {settings.apiToken === '' && 
          <Warning>Please provide a GitHub personal access token in the settings.</Warning>}
        <SearchForm onSubmit={this.doSearch} onChange={search.clearResults} />
        <Repos repos={search.results}>
          {this.renderSearchResultsAction}
        </Repos>
      </div>
    );
  }
});

export default SearchView;
