import express from 'express';
import {withLogging} from '../helpers'
import Delivery, {getDeliveries,getDeliveryById,createDelivery,updateDelivery,deleteDelivery, getDeliveriesByUserId, getDeliveriesByAddressId, getDeliveryByUserIdAndAddressId, getAvailableDelivery} from '../db/delivery'
import { getAddressById } from '../db/addresses';
import WebSocket from 'ws';
import url from 'url';
import Order from '../db/orders';
import { getRestaurantById } from '../db/restaurants';

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

export const askForDelivery = async(deliveries :  Delivery[], order : Order) =>
{
    if(deliveries.length === 0) return null

    const userId = deliveries[0].user_id; // Remplacez ceci par l'ID utilisateur réel
    const socket = new WebSocket(`ws://localhost:8000?userId=${userId}`);

    //partie client
    socket.addEventListener('message', (event: MessageEvent) => {
        // Mettez à jour votre interface utilisateur avec la nouvelle notification
        console.log('New notification received: ', event.data);

        // Si l'utilisateur accepte la notification, envoyez un message au serveur
        socket.send('User accepted the delivery with id=');
    });

    //envoie de message au client partie server
    wss.on('connection', async(ws: WebSocket, req) => {

        if(!req.url) return

        const params = new url.URL(req.url, `http://${req.headers.host}`).searchParams;
        const userId = Number(params.get('userId'));
      
        if (!userId) {
          console.error('No userId provided');
          return;
        }

        const delivery = deliveries.find(user => user.id === userId)

        if(!delivery){
            console.error('Delivery not found');
            return;
        }

        const restaurant = await getRestaurantById(order.restaurant_id)

        if(!restaurant){
            console.error('Restaurant not found');
            return;
        }

        const restaurant_address = getAddressById(order.address_id)

        if(!restaurant_address){
            console.error('Restaurant address not found');
            return;
        }

        const order_address = getAddressById(order.address_id)

        if(!order_address){
            console.error('Order address not found');
            return;
        }

        //resto, adresse resto, client, addresse client, id

        // Envoyer une notification au client
        const message = {
            type: 'delivery',
            order_id: order.id,
            restaurant: restaurant.name,
            restaurant_address: restaurant_address,
            order.add
        }




        
          
        // Écoutez les messages entrants du client
        ws.on('message', (message: string) => {
            // Ici, vous pouvez traiter le message reçu du client
            console.log(`Message received from client: ${message}`);
        });
      
      
    });


        
    return deliveries[0]  
}
