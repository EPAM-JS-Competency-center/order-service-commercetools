export interface Order {
  id: string;
  items: string[];
  state: string;
}

export interface OrderApiRequest extends Omit<Order, "id"> {}

export interface OrderApiResponse extends Order {}
