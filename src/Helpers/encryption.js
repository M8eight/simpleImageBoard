import crypto from "crypto";

export function encodeText(text) {
	let Crypto = crypto.createHash("md5");
	let hash = Crypto.update(text).digest("hex");
	return hash;
}
