import React from 'react';
import { render } from 'react-dom';
import { observable, autorun } from 'mobx';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './components/App';
import SettingsModel from './models/SettingsModel';
import FavoritesModel from './models/FavoritesModel';
import SearchModel from './models/SearchModel';

function loadAndPersist(key, model) {
  let instance;
  const stored = localStorage.getItem(key);

  if (stored !== null)
    instance = model.fromJS(JSON.parse(stored));
  else
    instance = new model();

  autorun(() => {
    localStorage.setItem(key, JSON.stringify(instance.toJS()));
  });

  return instance;
}

const settings = loadAndPersist('settings', SettingsModel);
const favorites = loadAndPersist('favorites', FavoritesModel);
const search = new SearchModel();

const store = observable({
  settings,
  favorites,
  search
});

render(
  <App store={store} />, 
  document.getElementById('root')
);

registerServiceWorker();
