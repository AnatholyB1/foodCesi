import express from "express";
import { getUserByEmail, createUser, getUserById } from "../db/users";
import { withLogging } from "../helpers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = withLogging(
  "login",
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).end();

      const user = await getUserByEmail(email);

      if (!user) return res.status(400).end.json("invalid credentials").end();

      const valid = bcrypt.compareSync(password, user.password);

      if (!valid) return res.status(400).json("invalid credentials").end();

      const accessToken = jwt.sign(
        {
          id: user.id,
          exp: Math.floor(Date.now() / 1000) + 360000,
        },
        process.env.ACCESS_JWT_KEY || "secret"
      );

      const refreshToken = jwt.sign(
        {
          id: user.id,
          exp: Math.floor(Date.now() / 1000) + 36000000,
        },
        process.env.REFRESH || "secret"
      );

      user.refreshToken = refreshToken;

      await user.save();
      res.cookie("auth-session", accessToken, {
        domain: process.env.SERVER_NAME,
        httpOnly: true, // The cookie is only accessible by the web server
        expires: new Date(Date.now() + 24 * 3600000), // The cookie expires in 24 hours
        path: "/",
      });

      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const register = withLogging(
  "register",
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, username, type } = req.body;

      if (!email || !password || !username || !type)
        return res.sendStatus(400).json("missing fields").end();

      const existingUser = await getUserByEmail(email);

      if (existingUser) return res.sendStatus(400).json("invalid email").end();

      const saltedPassword = bcrypt.hashSync(password, 10);
      const accessToken = jwt.sign(
        { username: username, exp: Math.floor(Date.now() / 1000) + 360000 },
        process.env.ACCESS_JWT_KEY || "secret"
      );
      const refreshToken = jwt.sign(
        { username: username, exp: Math.floor(Date.now() / 1000) + 36000000 },
        process.env.REFRESH || "secret"
      );
      const user = await createUser({
        email: email,
        username: username,
        type: type,
        password: saltedPassword,
        refreshToken: refreshToken,
      });

      if (!user) return res.sendStatus(400).json("no user").end();

      res.cookie("auth-session", accessToken, {
        domain: process.env.SERVER_NAME,
        httpOnly: true, // The cookie is only accessible by the web server
        expires: new Date(Date.now() + 24 * 3600000), // The cookie expires in 24 hours
        path: "/",
      });

      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

export const refreshToken = withLogging(
  "refreshToken",
  async (req: express.Request, res: express.Response) => {
    try {
      const { refreshToken } = req.params;

      if (!refreshToken) return res.sendStatus(403).json("no token").end();

      jwt.verify(
        refreshToken,
        process.env.REFRESH || "secret",
        async (err: any, decoded: any) => {
          if (err) {
            return res.sendStatus(403).end();
          }

          const accessToken = jwt.sign(
            {
              id: decoded.id,
              exp: Math.floor(Date.now() / 1000) + 360000,
            },
            process.env.ACCESS_JWT_KEY || "secret"
          );

          const refreshToken = jwt.sign(
            {
              id: decoded.id,
              exp: Math.floor(Date.now() / 1000) + 36000000,
            },
            process.env.REFRESH || "secret"
          );

          const user = await getUserById(decoded.id);
          if (!user) return res.sendStatus(404).json("no user").end();

          user.refreshToken = refreshToken;

          user.save();

          res.cookie("auth-session", accessToken, {
            domain: process.env.SERVER_NAME,
            httpOnly: true, // The cookie is only accessible by the web server
            expires: new Date(Date.now() + 24 * 3600000), // The cookie expires in 24 hours
            path: "/",
          });

          return res.sendStatus(200).json(user).end();
        }
      );
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  }
);
