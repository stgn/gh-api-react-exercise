import { decorate, observable } from 'mobx';

class SettingsModel {
  apiToken = '';

  static fromJS(js) {
    const model = new SettingsModel();
    model.apiToken = js.apiToken;
    return model;
  }

  toJS = () => {
    return {
      apiToken: this.apiToken
    };
  }
}

decorate(SettingsModel, {
  apiToken: observable,
});

export default SettingsModel;
