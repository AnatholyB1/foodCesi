export {};

declare global {
    interface Restaurant {
        id?: number;
        name: string;
        image: string;
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
}