import axios from "axios";
import md5 from "md5";

const privateKey = "19fc93a6a201ef2e5b3531262fbd41655a847644";
const publicKey = "8d56f6257eb4b12f96b3c618544611dc";
const time = Number(new Date());
const hash = md5(time + privateKey + publicKey);

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
  params: {
    ts: time,
    apikey: publicKey,
    hash: hash,
  },
});

export default api;
