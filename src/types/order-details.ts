export type OrderDetails = {
  id: string;
  version: number;
  items: CartItem[];
  orderState: OrderState;
};

export type OrderState = 'Open' | 'Confirmed' | 'Complete' | 'Cancelled';

export type CartItem = {
  name: {
    en: string;
  };
  quantity: number;
  money: {
    currencyCode: 'USD';
    centAmount: number;
  };
  slug: string;
};

/* ----- Example -----
 {
    "version": 1,
    "items": [{
        "name": {
            "en": "en-name"
        },
        "quantity": 10,
        "money": {
            "currencyCode": "USD",
            "centAmount": 10000
        },
        "slug": "slug"
    }]
 }
  ----- Example -----   */
