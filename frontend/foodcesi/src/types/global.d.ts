export {};

declare global {
    interface User {
        id: number;
        email: string;
        username: string;
        type: string;
        refreshToken: string;
    }
    interface Restaurant {
        id?: number;
        name: string;
        banner: string;
        logo: string;
        categories: RestaurantCategory[];
        items: any[];
    }

    interface RestaurantCategory {
        id?: number;
        name: string;
    }

    interface RestaurantItemsCategory {
        id?: number;
        name: string;
        MenuItems: MenuItem[];
    }

    interface MenuItem {
        id?: number;
        restaurant_id?: number;
        name: string;
        description: string;
        price: string;
        image_url: string;
        MenuCategory: {
            category_id: number;
        };
    }

    interface NewMenuItem {
        id?: number;
        restaurant_id?: number;
        name: string;
        description: string;
        price: string;
        image_url: string;
        category_id: number[];
        available: boolean;
    }

    interface Cart {
        user_id: number;
        restaurants: {
            restaurant: Restaurant;
            items: {
                item: MenuItem;
                quantity: number;
            }[];
        }[];
    }

    interface Address {
        id?: number;
        user_id?: number;
        name: string;
        street: string;
        zip_code: string;
        city: string;
        state: string;
        country: string;
    }
}
