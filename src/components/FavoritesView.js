import React from 'react';
import { observer } from 'mobx-react';

import { LinkButton } from './ui.js';
import Repos from './Repos.js';

const FavoritesView = observer(({ favorites }) =>
  <Repos repos={favorites.favorites}>
    {repo =>
      <LinkButton onClick={() => favorites.remove(repo.id)}>
        Remove
      </LinkButton>
    }
  </Repos>
);

export default FavoritesView;
