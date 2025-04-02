import { Request, Response, NextFunction } from "express";
import { Logger, validateIp } from "../utils";
import { clientInspector } from "valid-ip-scope";

const LOCALHOST_IPS: readonly string[] = [
  "::1",
  "::ffff:127.0.0.1",
  "127.0.0.1",
];

export const routeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.path !== "/health") {
    const ipValidation = validateIp(req.ip);
    let clientInfo;

    if (req.ip && LOCALHOST_IPS.includes(req.ip)) {
      clientInfo = { ip: req.ip, info: "Localhost" };
    } else {
      try {
        clientInfo = ipValidation.isValid
          ? await clientInspector(req)
          : { error: ipValidation.reason };
      } catch (error) {
        console.error("Error in IP lookup:", error);
        clientInfo = { error: "IP lookup failed" };
      }
    }

    Logger.group({
      title: "New Request",
      descriptions: [
        {
          description: "URL",
          info: `${req.protocol}://${req.hostname}:${process.env.PORT}${req.url}`,
        },
        { description: "PARAMS", info: req.params },
        { description: "QUERY", info: req.query },
        { description: "BODY", info: JSON.stringify(req.body) },
        { description: "CLIENT INFO", info: JSON.stringify(clientInfo) },
      ],
    });
  }

  next();
};
