const getLoggerTest = async (req, res) => {
  try {
    req.logger.debug("Esto es un mensaje de depuración (debug).");
    req.logger.http("Esto es un mensaje de solicitud HTTP (http).");
    req.logger.info("Esto es un mensaje informativo (info).");
    req.logger.warning("Esto es un mensaje de advertencia (warning).");
    req.logger.error("Esto es un mensaje de error (error).");
    req.logger.fatal("Esto es un mensaje de fatal (fatal).");

    res.status(200).send({ message: "Prueba logger" });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

export default {
  getLoggerTest,
};
