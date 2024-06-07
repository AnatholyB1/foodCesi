import express from "express";
import { withLogging } from "helpers";
import {getAddresses, getAddressById, getAddressesByUserId,createAddress,updateAddress,deleteAddress,deleteAddressesByUserId, getUserByCity, getUserByState, getUserByCountry, getUserByZipCode, getUserByStreet} from "../db/addresses";


export const getAllAddresses = withLogging('getAllAddresses', async (req: express.Request, res: express.Response) => {
    try {
        const addresses = await getAddresses();
        if (!addresses) {
            return res.status(404).end();
        }
        return res.status(200).json(addresses).end();
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

export const getAddress = withLogging('getAddress', async (req: express.Request, res: express.Response) => {
    try {
        const address = await getAddressById(Number(req.params.id));
        if (!address) {
            return res.status(404).end();
        }
        return res.status(200).json(address).end();
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});



export const getAddressesByUser = withLogging('getAddressesByUser', async (req: express.Request, res: express.Response) => {
    try {
        const addresses = await getAddressesByUserId(Number(req.params.user_id));
        if (!addresses) {
            return res.status(404).end();
        }
        return res.status(200).json(addresses).end();
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

export const createNewAddress = withLogging('createNewAddress', async (req: express.Request, res: express.Response) => {
    try {
        const { user_id, street, city, state,zip_code,country } = req.body;
        if (!user_id || !street || !city || !state || !zip_code || !country) {
            return res.status(400).end();
        }
        const address_info = {
            user_id,
            street,
            city,
            state,
            zip_code,
            country
        }
        const address = await createAddress(address_info);
        if(!address){   
            return res.status(404).end();
        }
        return res.status(201).json(address).end();
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});
