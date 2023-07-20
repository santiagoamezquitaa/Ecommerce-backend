import enumErrors from "../../utils.errors/enum.errors.js";

export default (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case enumErrors.INVALID_TYPES_ERROR:
      res.json({ status: "Error", error: error.name });
      break;
    default:
      res.json({ status: "Error", error: "Unhandled error" });
  }
};
