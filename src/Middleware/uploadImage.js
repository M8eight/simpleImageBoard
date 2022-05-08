import multer from "multer";
import path from "path";

import { encodeText } from "../Helpers/encryption.js";

const fileFilter = (req, file, cb) => {
	let status;
	switch (file.mimetype) {
		case "image/jpeg":
			status = true;
			break;

		case "image/jpg":
			status = true;
			break;

		case "image/png":
			status = true;
			break;
	
		default:
			status = false;
			break;
	}

	if (status == true) {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/img");
	},
	filename: (req, file, cb) => {
		cb(null, encodeText(file.originalname) + path.extname(file.originalname));
	},
});

let upload = multer({ storage: storageConfig, fileFilter: fileFilter }).single("image");

export default upload;