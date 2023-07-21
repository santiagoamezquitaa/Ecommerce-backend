import enumErrors from "../../utils.errors/enum.errors.js";

export default (error, req, res, next) => {
  req.error(error.cause);
  switch (error.code) {
    case enumErrors.INVALID_TYPES_ERROR:
      res.json({ status: "Error", error: error.name });
      break;
    default:
      res.json({ status: "Error", error: "Unhandled error" });
  }
};
