import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import FavoritesView from './FavoritesView.js';
import SearchView from './SearchView.js';
import SettingsView from './SettingsView.js';

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

const App = observer(({ store }) => {
    const { favorites, settings } = store;

    return (
      <Router>
        <FlexContainer>
          <Header>
            <h1>My GitHub Favorites</h1>
          </Header>
          <Navbar>
            <li><Link to="/">Search</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </Navbar>
          <GridContainer>
            <Column>
              <Route exact path="/" render={() => 
                <SearchView app={store} />} />
              <Route path="/settings" render={() => 
                <SettingsView settings={settings} />} />
            </Column>
            <Column bgColor="var(--theme-light)">
              <FavoritesView favorites={favorites} />
            </Column>
          </GridContainer>
        </FlexContainer>
      </Router>
    );
  }
);

export default App;
