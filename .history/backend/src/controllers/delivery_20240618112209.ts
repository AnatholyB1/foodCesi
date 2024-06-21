import { getDeliveries,getDeliveryById,createDelivery,updateDelivery,deleteDelivery,getDeliveriesByUserId,getDeliveriesByCity,getDeliveryByUserIdAndCity,getAvailableDelivery } from "../db/delivery";
import { getAddressById } from "../db/addresses";
import express from "express";
import { withLogging } from "../helpers";


export const getAvailableDeliveriesByCity = async (address_id: number) => {
  const deliveries = await getAvailableDelivery();
  if (deliveries.length === 0) return null;

  const address = await getAddressById(address_id);

  if (!address) return null;

  const city = address.city;

  deliveries.filter(async (delivery) => {
    
    if (delivery.city === city) {
      return delivery;
    } else {
      return null;
    }
  });
  return deliveries;
};


export const getAllDeliveries = withLogging( "getAllDeliveries", async (req: express.Request, res: express.Response) => {
  try {
    const deliveries = await getDeliveries();
    if(!deliveries) return res.status(400);
    return res.status(200).json(deliveries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }).end();
  }
});

export const getADeliveryById = withLogging( "getADeliveryById", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const delivery = await getDeliveryById(Number(id));
    if(!delivery) return res.status(400);
    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }).end();
  }
});

export const createADelivery = withLogging( "createADelivery", async (req: express.Request, res: express.Response) => {
  try {
    const {user_id, city, available } = req.body;

    if (!user_id || !city || !available) return res.status(400);
    const delivery = {
      user_id,
      city,
      available,
    };
    const newDelivery = await createDelivery(delivery);

    if (!newDelivery) return res.status(400);

    return res.status(200).json(newDelivery);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }).end();
  }
});

export const updateADelivery = withLogging( "updateADelivery", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const delivery = req.body;
    const updatedDelivery = await updateDelivery(Number(id), delivery);
    if(!updatedDelivery) return res.status(400);
    return res.status(200).json(updatedDelivery);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }).end();
  }
});

export const deleteADelivery = withLogging( "deleteADelivery", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const delivery = await deleteDelivery(Number(id));
    if(!delivery) return res.status(400);
    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }).end();
  }
});

export const getAllDeliveriesByUserId = withLogging( "getAllDeliveriesByUserId", async (req: express.Request, res: express.Response) => {
  try {
    const { user_id } = req.params;
    const deliveries = await getDeliveriesByUserId(Number(user_id));
    if(!deliveries) return res.status(400);
    return res.status(200).json(deliveries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }).end();
  }
});

export const getAllDeliveriesByCity = withLogging( "getAllDeliveriesByCity", async (req: express.Request, res: express.Response) => {
  try {
    const { city } = req.params;
    const deliveries = await getDeliveriesByCity(city);
    if(!deliveries) return res.status(400);
    return res.status(200).json(deliveries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }).end();
  }
});

export const getADeliveryByUserIdAndCity = withLogging( "getADeliveryByUserIdAndCity", async (req: express.Request, res: express.Response) => {
  try {
    const { user_id, city } = req.params;
    const deliveries = await getDeliveryByUserIdAndCity(Number(user_id), city);
    if(!deliveries) return res.status(400);
    return res.status(200).json(deliveries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }).end();
  }
});

