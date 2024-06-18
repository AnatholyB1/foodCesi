import request from 'supertest';
import express from 'express';
import { getAllAddresses } from '../address';
import { getAddresses } from '../../db/addresses';

jest.mock('../../db/addresses');

describe('getAllAddresses', () => {
    it('should return 200 and all addresses when addresses exist', async () => {
      const mockAddresses = [{ id: 1, street: '123 Main St' }, { id: 2, street: '456 Oak St' }];
      (getAddresses as jest.Mock).mockResolvedValue(mockAddresses);
  
      const app = express();
      app.get('/addresses', getAllAddresses);
  
      const res = await request(app).get('/addresses');
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockAddresses);
    });
  
    it('should return 404 when no addresses exist', async () => {
      (getAddresses as jest.Mock).mockResolvedValue(null);
  
      const app = express();
      app.get('/addresses', getAllAddresses);
  
      const res = await request(app).get('/addresses');
  
      expect(res.statusCode).toEqual(404);
    });
  
    it('should return 500 when an error occurs', async () => {
        (getAddresses as jest.Mock).mockRejectedValue(new Error('Test error'));
      
        const app = express();
        app.get('/addresses', getAllAddresses);
      
        const res = await request(app).get('/addresses');
      
        expect(res.statusCode).toEqual(500);
      }, 10000);
  });