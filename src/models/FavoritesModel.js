import { decorate, observable, action } from 'mobx';

class FavoritesModel {
  favorites = [];

  add = repo => {
    this.favorites.push(repo);
  }

  remove = id => {
    const index = this.favorites.findIndex(repo => repo.id === id);
    this.favorites.splice(index, 1);
  }

  static fromJS(js) {
    const model = new FavoritesModel();
    model.favorites = js;
    return model;
  }

  toJS() {
    return this.favorites;
  }
}

decorate(FavoritesModel, {
  favorites: observable,
  add: action,
  remove: action,
});

export default FavoritesModel;
