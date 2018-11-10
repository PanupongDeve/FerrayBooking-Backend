

class BaseSocket {
    constructor() {
        this.io = null;
    }

    setUp(io, socket, url) {
        this.url = url
        this.io = io;
        this.socket = socket;
        this.fetchAllUrl = `${this.url}/fetchAll`;
        this.fetchByIdUrl= `${this.url}/fetchById`;
        this.createDataUrl = `${this.url}/create`;
        this.updateDataUrl = `${this.url}/update`;
        return this;
    }

    
}

module.exports = BaseSocket;