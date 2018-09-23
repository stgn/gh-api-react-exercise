import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { observer, Observer } from 'mobx-react';
import styled from 'styled-components';

import { LinkButton } from './ui.js';
import Repos from './Repos.js';
import SearchForm from './SearchForm.js';
import Settings from './Settings.js';

const Header = styled.div`
  background: var(--theme-dark);
  color: white;
  line-height: 1;
  text-align: center;
  padding: var(--pad);

  h1 {
    margin: 0;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  flex: 1;
`;

const Column = styled.div`
  padding: var(--pad);
  background: ${props => props.bgColor || 'white'};
`;

const Navbar = styled.ul`
  display: block;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background: var(--theme-dark);
  font-weight: bold;
  padding: 0 3rem 1rem 3rem;

  li {
    display: inline-block;
    margin-right: 2rem;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const Warning = styled.div`
  color: #f66;
  border: 1px solid #f66;
  border-radius: 0.25rem;
  background: #fee;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const App = observer(class App extends Component {
  doSearch = query => {
    const { apiToken } = this.props.settings;
    this.props.search.fetchResults(apiToken, query);
  }

  isRepoFavorited = id => {
    const { favorites } = this.props.favorites;
    return favorites.some(repo => repo.id === id);
  }

  renderSearchResultsAction = repo => {
    if (this.isRepoFavorited(repo.id))
      return null;

    return (
      <LinkButton onClick={() => this.props.favorites.add(repo)}>
        Add
      </LinkButton>
    );
  }

  renderFavoritesAction = repo => {
    return (
      <LinkButton onClick={() => this.props.favorites.remove(repo.id)}>
        Remove
      </LinkButton>
    );
  }

  render() {
    const { favorites, search, settings } = this.props;

    return (
      <Router>
        <FlexContainer>
          <Header>
            <h1>My GitHub Favorites</h1>
          </Header>
          <Navbar>
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </Navbar>
          <GridContainer>
            <Column>
              <Route exact path="/" render={() => 
                <Observer>
                  {() => <div>
                    {settings.apiToken === '' && 
                      <Warning>Please provide a GitHub personal access token in the settings.</Warning>}
                    <SearchForm onSubmit={this.doSearch} onChange={search.clearResults} />
                    <Repos repos={search.results}>
                      {this.renderSearchResultsAction}
                    </Repos>
                  </div>}
                </Observer>
              }/>
              <Route path="/settings" render={() => <Settings settings={settings} />} />
            </Column>
            <Column bgColor="var(--theme-light)">
              <Repos repos={favorites.favorites}>
                {this.renderFavoritesAction}
              </Repos>
            </Column>
          </GridContainer>
        </FlexContainer>
      </Router>
    );
  }
});

export default App;
