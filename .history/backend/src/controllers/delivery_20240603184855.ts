import express from 'express';
import {withLogging} from '../helpers'
import {getDeliveries,getDeliveryById,createDelivery,updateDelivery,deleteDelivery, getDeliveriesByUserId, getDeliveriesByAddressId, getDeliveryByUserIdAndAddressId, getAvailableDelivery} from '../db/delivery'
import { getAddressById } from '../db/addresses';

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


        return deliveries[0]
    }