const BaseSocket = require("./BaseSocket");
const modelPromise = require('../database/mysqlDB').model;

class OwnersSocket extends BaseSocket {
  constructor() {
    super();
  }

  start() {
    this.socket.on(this.fetchAllUrl, this.fetchAll.bind(this));
    this.socket.on(this.fetchByIdUrl, this.fetchById.bind(this));
    this.socket.on(this.createDataUrl, this.create.bind(this));
    this.socket.on(this.updateDataUrl, this.updateById.bind(this));
  }

  async fetchAll(data) {
    if(data === 'fetchAll') {
      const model = await Promise.resolve(modelPromise);
      let owners = await model.owner.findAll();
      this.io.emit(this.fetchAllUrl, owners);
    }
  }

  async fetchById(response) {
      const model = await Promise.resolve(modelPromise);
      let owner = await model.owner.findById(response.id);
      this.io.emit(this.fetchByIdUrl, owner);
  }

  async create(data) {
      const model = await Promise.resolve(modelPromise);
      await model.owner.create(data);
      let owners = await model.owner.findAll();
      this.io.emit(this.fetchAllUrl, owners);
  }

  async updateById(response) {
    const { data, id } = response;
    const model = await Promise.resolve(modelPromise);
    let owner = await model.owner.findById(id);
    owner = await owner.updateAttributes(data, {
      include: [model.cat]
    });
    let owners = await model.owner.findAll();
    this.io.emit(this.fetchAllUrl, owners);
  }
}

module.exports = new OwnersSocket();
