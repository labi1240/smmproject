import { env } from '@repo/env';

interface ApiData {
  action: string;
  [key: string]: string | number | undefined;
}

export class JAPClient {
  private apiUrl = 'https://justanotherpanel.com/api/v2';
  private apiKey: string;

  constructor() {
    if (!env.JAP_API_KEY) {
      throw new Error('JAP_API_KEY is not set');
    }
    this.apiKey = env.JAP_API_KEY;
  }

  private async connect(data: ApiData) {
    const formData = new URLSearchParams();
    formData.append('key', this.apiKey);

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)',
      },
    });

    return response.json();
  }

  async getServices() {
    return this.connect({ action: 'services' });
  }

  async createOrder(data: {
    service: number;
    link: string;
    quantity: number;
    runs?: number;
    interval?: number;
  }) {
    return this.connect({ action: 'add', ...data });
  }

  async getOrderStatus(orderId: number) {
    return this.connect({ action: 'status', order: orderId });
  }

  async getMultipleOrderStatus(orderIds: number[]) {
    return this.connect({
      action: 'status',
      orders: orderIds.join(','),
    });
  }

  async createRefill(orderId: number) {
    return this.connect({ action: 'refill', order: orderId });
  }

  async getRefillStatus(refillId: number) {
    return this.connect({
      action: 'refill_status',
      refill: refillId,
    });
  }

  async cancelOrders(orderIds: number[]) {
    return this.connect({
      action: 'cancel',
      orders: orderIds.join(','),
    });
  }

  async getBalance() {
    return this.connect({ action: 'balance' });
  }
}

export const japClient = new JAPClient();
