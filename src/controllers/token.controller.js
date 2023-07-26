import { tokenService } from "../services/index.js";

const postNewToken = async (req, res) => {
  try {
    const token = await tokenService.postOneToken();
    return res.status(200).send(token);
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const getToken = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenExists = await tokenService.getOneToken(token);
    return res.status(200).send({ status: "success", payload: tokenExists });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

export default {
  postNewToken,
  getToken,
};
