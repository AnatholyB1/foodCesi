import express from "express";
import { withLogging } from "../helpers";
import {getAddresses, getAddressById, getAddressesByUserId,createAddress,updateAddress,deleteAddress,deleteAddressesByUserId, getUserByCity, getUserByState, getUserByCountry, getUserByZipCode, getUserByStreet} from "../db/addresses";


export const getAllAddresses = withLogging('getAllAddresses', async (req: express.Request, res: express.Response) => {
    try {
        const addresses = await getAddresses();
        if (!addresses) {
            return res.status(404).json({message:"addresses not found"}).end();
        }
        return res.status(200).json(addresses).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
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
        return res.status(500).json({message:error}).end();
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
        return res.status(500).json({message:error}).end();
    }
});

export const createNewAddress = withLogging('createNewAddress', async (req: express.Request, res: express.Response) => {
    try {
        const { user_id, street, city, state,zip_code,country, name } = req.body;
        if (!user_id || !street || !city || !state || !zip_code || !country || !name) {
            return res.status(400).end();
        }
        const address_info = {
            user_id,
            street,
            city,
            state,
            zip_code,
            name,
            country
        }
        const address = await createAddress(address_info);
        if(!address){   
            return res.status(404).end();
        }
        return res.status(201).json(address).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});

export const updateAddressInfo = withLogging('updateAddressInfo', async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const { user_id, street, city, state,zip_code,country } = req.body;
        const values = {
            user_id,
            street,
            city,
            state,
            zip_code,
            country
        }
        if (!id ) {
            return res.status(400).end();
        }
        const address = await updateAddress(Number(id), values);
        if(!address){
            return res.status(404).end();
        }
        return res.status(200).json(address).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});

export const deleteAddressInfo = withLogging('deleteAddressInfo', async (req: express.Request, res: express.Response) => {
    try {
        const address = await deleteAddress(Number(req.params.id));
        if(!address){
            return res.status(404).end();
        }
        return res.status(204).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});

export const deleteAddressesByUser = withLogging('deleteAddressesByUser', async (req: express.Request, res: express.Response) => {
    try {
        const address = await deleteAddressesByUserId(Number(req.params.user_id));
        if(!address){
            return res.status(404).end();
        }
        return res.status(204).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});

export const getUserByCityInfo = withLogging('getUserByCityInfo', async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUserByCity(req.params.city);
        if(!user){
            return res.status(404).end();
        }
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});

export const getUserByStateInfo = withLogging('getUserByStateInfo', async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUserByState(req.params.state);
        if(!user){
            return res.status(404).end();
        }
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});


export const getUserByCountryInfo = withLogging('getUserByCountryInfo', async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUserByCountry(req.params.country);
        if(!user){
            return res.status(404).end();
        }
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});


export const getUserByZipCodeInfo = withLogging('getUserByZipCodeInfo', async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUserByZipCode(req.params.zip_code);
        if(!user){
            return res.status(404).end();
        }
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});

export const getUserByStreetInfo = withLogging('getUserByStreetInfo', async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUserByStreet(req.params.street);
        if(!user){
            return res.status(404).end();
        }
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error}).end();
    }
});
