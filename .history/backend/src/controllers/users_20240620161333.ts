import express from "express";
import {
  deleteUserById,
  getUserById,
  deleteAllUsers,
  updateUserById,
  getUserBySponsorCode,
} from "../db/users";
import { withLogging } from "../helpers";
import User from '../db/users';
import { get } from "lodash";

export const getAllUsers = withLogging(
  "getAllUsers",
  async (req: express.Request, res: express.Response) => {
    try {
         // Filtering
         let filter = {};
         if (typeof req.query.filter === "string") {
           filter = JSON.parse(req.query.filter);
         }
   
         // Sorting
         let sort: [string, string][] = [];
         if (typeof req.query.sort === "string") {
           const [sortField, sortOrder] = JSON.parse(req.query.sort);
           sort = [[sortField, sortOrder === "ASC" ? 'ASC' : 'DESC']];
         }
   
         // Pagination
         let range = [0, 9]; // Default range
         if (typeof req.query.range === "string") {
           range = JSON.parse(req.query.range);
         }


         const { count: total, rows: users } = await User.findAndCountAll({
          where: filter,
          order: sort,
          offset: range[0],
          limit: range[1] - range[0] + 1
        });

         res.setHeader("Content-Range", `users ${range[0]}-${range[1]}/${total}`);
         res.setHeader("Access-Control-Expose-Headers", "Content-Range");
      
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }
);

export const deleteUser = withLogging(
  "deleteUser",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      const deleteUser = await deleteUserById(id);

      return res.status(200).json(deleteUser);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteAllTheUsers = withLogging(
  "deleteAllUsers",
  async (req: express.Request, res: express.Response) => {
    try {
      const users_number = await deleteAllUsers();
      return res.status(200).json(`${users_number} user deleted`);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const sponsorUser = withLogging(
  "sponsorUser",
  async (req: express.Request, res: express.Response) => {
    try {
      const { sponsor_code } = req.params;

      if (!sponsor_code) return res.status(400).json({message:"sponsor code not found"}).end();
      const user = await getUserBySponsorCode(sponsor_code);

      if (!user) return res.status(400).json({message:"user not found"}).end();

      const identityId = get(req, 'identity') ;
      console.log(identityId);
      if (!identityId) {
        return res.status(400).json({message: "identity not found"}).end();
      }
      const owner = await getUserById(Number(identityId));

      if (!owner) return res.status(400).json({message: "owner not found"}).end();

      if(owner.sponsor === true) return res.status(403).json({message: "owner already sponsor"}).end();


      user.sponsor = true;
      user.save();

      owner.sponsor_id = user.id;
      owner.save();
       

      return res.status(200).json({message : "user sponsored", user}).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const updateUser = withLogging(
  "updateUser",
  async (req: express.Request, res: express.Response) => {
    try {


      const { id } = req.params;
      const { username, type, active } = req.body;

      const user = await getUserById(Number(id));

      if (!user) return res.status(400);

      const values = { username, type, active };

      await updateUserById(Number(id), values);
      const updatedUser = await getUserById(Number(id));

      return res.status(200).json(updatedUser).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: " id not found" }).end();
    const user = await getUserById(Number(id));
    if (!user) return res.status(404).json({ message: "user not found" }).end();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
