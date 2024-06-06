import express from "express";
import { getUserByEmail, createUser } from "../db/users";
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

      if (!user) return res.status(400).end();

      const valid = bcrypt.compareSync(password, user.password);

      if (!valid) return res.status(400).end();

      const sessionToken = await req.cookies['auth-session'];

      if(!sessionToken) return res.status(400).end();

      jwt.verify(sessionToken, process.env.ACCESS_JWT_KEY || "secret", (err : any) => {
        if (err) {
          return res.status(403).end();
        }
      });

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

      if (!email || !password || !username || !type) return res.sendStatus(400);

      const existingUser = await getUserByEmail(email);

      if (existingUser) return res.sendStatus(400);

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
        username : username,
        type : type,
        password: saltedPassword,
        refreshToken: refreshToken,
      });

      if (!user) return res.sendStatus(500).end();

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
