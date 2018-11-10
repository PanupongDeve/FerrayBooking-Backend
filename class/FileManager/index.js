const multer = require('multer');


class FileManager {
    constructor(storePAth) {
        this.storePAth = storePAth;
        this.upload = multer({ storage: this.createStorage() });

    }

    createStorage() {
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.storePAth)
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname))
            }
        });

        return storage;
    }

    middlewareImage() {
        return this.upload.single('image');
    }
}

module.exports = FileManager;