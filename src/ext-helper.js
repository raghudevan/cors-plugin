class ExtHelper {
  constructor() {
    this.extHelper = chrome; // eslint-disable-line no-undef
    this.result = new Promise((resolve, reject) => {
      try {
        this.extHelper.storage.local.get({ 'active': false, 'urls': [], 'exposedHeaders': '' }, function (result) {
          // { active, urls, exposedHeaders }
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  setNewState = (result) => {
    this.extHelper.storage.local.set(result);
    this.extHelper.extension.getBackgroundPage().reload();
  }
}

export default ExtHelper;
