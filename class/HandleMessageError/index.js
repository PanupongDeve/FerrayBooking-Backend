class HandleMessageError {
    constructor() {
        this.errorMessage = 'มีบางอย่างผิดพลาด กรุณาลองใหม่'
    }

    set(error) {
        if (typeof error === 'string') {
            return error;
        } else {
            error = this.errorMessage;
            return error;
        }
    }

}

module.exports = HandleMessageError;