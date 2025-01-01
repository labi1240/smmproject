export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  type: 'followers' | 'views' | 'likes';
  platform: 'instagram' | 'youtube' | 'tiktok';
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  serviceId: string;
  quantity: number;
  targetUsername: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}
