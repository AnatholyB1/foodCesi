import express from 'express';
import {withLogging} from '../helpers'
import Delivery, {getDeliveries,getDeliveryById,createDelivery,updateDelivery,deleteDelivery, getDeliveriesByUserId, getDeliveriesByAddressId, getDeliveryByUserIdAndAddressId, getAvailableDelivery} from '../db/delivery'
import { getAddressById } from '../db/addresses';
import WebSocket from 'ws';
import url from 'url';

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', (ws: WebSocket) => {
    // Ici, vous pouvez écouter les événements de votre base de données
    // et envoyer des messages aux clients lorsque de nouvelles notifications sont créées
    ws.send('New notification');
  });

export const getAvailableDeliveriesByCity = async(address_id :number) =>
{
    const deliveries = await getAvailableDelivery()
    if(deliveries.length === 0) return null

    const address = await getAddressById(address_id)

    if(!address) return null

    const city = address.city

    deliveries.filter(async delivery => {
        const address = await getAddressById(delivery.address_id)
        if(address && address.city === city){
            return delivery
        }else{  
            return null
        }
    })
    return deliveries
}

export const askForDelivery = async(deliveries :  Delivery[]) =>
{
    if(deliveries.length === 0) return null

    wss.on('connection', (ws: WebSocket, req) => {

        if(!req.url) return

        const params = new url.URL(req.url, `http://${req.headers.host}`).searchParams;
        const userId = params.get('userId');
      
        if (!userId) {
          console.error('No userId provided');
          return;
        }
          
        // Écoutez les messages entrants du client
        ws.on('message', (message: string) => {
            // Ici, vous pouvez traiter le message reçu du client
            console.log(`Message received from client: ${message}`);
        });
      
      
    });


        
    return deliveries[0]  
}
