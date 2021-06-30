import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler,
  getUserSessionHandler } from "./controller/session.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import { requiresUser } from "./middleware";

export default function(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  // POST /api/v1/users
  app.post('/api/v1/users', validateRequest(createUserSchema), createUserHandler);

  // Login
  // POST /api/v1/sessions
  app.post(
    "/api/v1/session",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get user's session
  // GET /api/v1/session
  app.get("/api/v1/session", requiresUser, getUserSessionHandler)

  // Logout
  // DELETE /api/v1/session
  app.delete("/api/v1/session", requiresUser, invalidateUserSessionHandler);
}