export {};

declare global {
    interface User {
        id: number;
        email: string;
        username: string;
        type: string;
        refreshToken: string;
        restaurant_id?: number;
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

    interface Order {
        id: number;
        user_id: number;
        restaurant_id: number;
        delivery_id: number;
        address_id: number;
        total_price: string;
        status: string;
        Restaurant: Restaurant;
        OrderItems: OrderItem[];
        Address: Address;
    }

    interface OrderItem {
        id: number;
        order_id: number;
        menu_item_id: number;
        quantity: number;
        price: string;
        total_price: string;
        MenuItem: MenuItem;
    }

    interface OrderStatus {
        key: string;
        text: string;
    }

    interface Notif {
        user_id: string;
        message: string;
        read: boolean;
        createdAt: Date;
    }

    interface Notification {
        title: string;
        description: boolean;
        link: string;
        read: boolean;
        createdAt: Date;
        from: string;
    }
}
