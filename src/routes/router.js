import { Router } from "express";

export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  handlePolicies(policies) {
    return (req, res, next) => {
      if (policies[0] === "PUBLIC") return next();

      if (!req.isAuthenticated() || !req.user) {
        return res.status(401).send({ status: "error", error: "Unauthorized" });
      }

      if (!policies.includes(req.user.role.toUpperCase())) {
        return res.status(403).send({ status: "error", error: "Forbidden" });
      }

      next();
    };
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }
}
