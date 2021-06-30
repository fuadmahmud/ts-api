import jwt from "jsonwebtoken";
import config from "config";
import log from "../logger";

const privateKey = config.get("privateKey") as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    log.error({ error });
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null
    };
  }
}