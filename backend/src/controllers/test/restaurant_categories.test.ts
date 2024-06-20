import request from 'supertest';
import express from 'express';
import {
  getAllRestaurantCategories,
  getRestaurantCategory,
  deleteRestaurantCategoryInfo
} from '../restaurant_categories';
import {
  getRestaurantCategories,
  getCategoriesByRestaurant,
  deleteRestaurantCategory
} from '../../db/restaurants_categories';

jest.setTimeout(10000);

jest.mock('../../db/restaurants_categories');

const app = express();
app.use(express.json());

app.get('/restaurant-categories', getAllRestaurantCategories);
app.get('/restaurant-categories/:id', getRestaurantCategory);
app.delete('/restaurant-categories/:id', deleteRestaurantCategoryInfo);

describe('getAllRestaurantCategories', () => {
  it('should return 200 and all restaurant categories', async () => {
    const mockCategories = [
      { id: 1, name: 'Fast Food' },
      { id: 2, name: 'Fine Dining' }
    ];
    (getRestaurantCategories as jest.Mock).mockResolvedValue(mockCategories);

    const res = await request(app).get('/restaurant-categories');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockCategories);
  });
});

describe('getRestaurantCategory', () => {
  it('should return 200 and the restaurant category when the category exists', async () => {
    const mockCategory = { id: 1, name: 'Fast Food' };
    (getCategoriesByRestaurant as jest.Mock).mockResolvedValue(mockCategory);

    const res = await request(app).get('/restaurant-categories/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockCategory);
  });

  it('should return 404 when the category does not exist', async () => {
    (getCategoriesByRestaurant as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get('/restaurant-categories/999');

    expect(res.statusCode).toEqual(404);
  });

});

describe('deleteRestaurantCategoryInfo', () => {
  it('should return 200 and the deleted restaurant category', async () => {
    const mockCategory = { id: 1, name: 'Fast Food' };
    (deleteRestaurantCategory as jest.Mock).mockResolvedValue(mockCategory);

    const res = await request(app).delete('/restaurant-categories/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockCategory);
  });

  it('should return 404 when the category does not exist', async () => {
    (deleteRestaurantCategory as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete('/restaurant-categories/999');

    expect(res.statusCode).toEqual(404);
  });

});