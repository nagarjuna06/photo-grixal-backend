import { config } from "dotenv";

config();

const { MODE: mode, CLIENT_URL: url } = process.env;

let origins = [url];

if (mode === "dev") {
  origins.push("http://localhost:3000", "http://localhost:5500", undefined);
}

const allowOrigin = {
  origin: function (origin, callback) {
    if (origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default allowOrigin;
