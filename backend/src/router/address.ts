import express from 'express'
import {getUserByStreetInfo,getUserByZipCodeInfo,getUserByCountryInfo,getUserByStateInfo,getUserByCityInfo,deleteAddressesByUser, deleteAddressInfo,updateAddressInfo,createNewAddress,getAddressesByUser, getAddress, getAllAddresses} from '../controllers/address'

export default (router: express.Router) => {
    router.get('/addresses', getAllAddresses);
    router.get('/addresses/:id', getAddress);
    router.get('/addresses/user/:user_id', getAddressesByUser);
    router.post('/addresses', createNewAddress);
    router.put('/addresses/:id', updateAddressInfo);
    router.delete('/addresses/:id', deleteAddressInfo);
    router.delete('/addresses/user/:user_id', deleteAddressesByUser);
    router.get('/addresses/city/:city', getUserByCityInfo);
    router.get('/addresses/state/:state', getUserByStateInfo);
    router.get('/addresses/country/:country', getUserByCountryInfo);
    router.get('/addresses/zip_code/:zip_code', getUserByZipCodeInfo);
    router.get('/addresses/street/:street', getUserByStreetInfo);
}