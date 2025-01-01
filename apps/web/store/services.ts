import { create } from 'zustand';

export type SocialService = {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  price: number;
  type: 'followers' | 'views' | 'likes';
  platform: 'instagram' | 'youtube' | 'tiktok';
};

type ServicesStore = {
  services: SocialService[];
  selectedPlatform: string | null;
  selectedType: string | null;
  setSelectedPlatform: (platform: string | null) => void;
  setSelectedType: (type: string | null) => void;
  filterServices: () => SocialService[];
};

export const useServicesStore = create<ServicesStore>((set, get) => ({
  services: [
    {
      id: '1',
      name: 'Instagram Followers',
      icon: 'instagram',
      description: 'Get real Instagram followers',
      features: ['Real accounts', 'Instant delivery', 'No password required'],
      price: 4.99,
      type: 'followers',
      platform: 'instagram',
    },
    {
      id: '2',
      name: 'Instagram Views',
      icon: 'instagram',
      description: 'Increase your Instagram views',
      features: ['Real views', 'Fast delivery', 'No password needed'],
      price: 2.99,
      type: 'views',
      platform: 'instagram',
    },
    {
      id: '3',
      name: 'YouTube Views',
      icon: 'youtube',
      description: 'Get more YouTube views',
      features: ['Organic views', 'Quick delivery', 'Safe & secure'],
      price: 3.99,
      type: 'views',
      platform: 'youtube',
    },
    {
      id: '4',
      name: 'TikTok Followers',
      icon: 'tiktok',
      description: 'Grow your TikTok following',
      features: ['Active followers', 'Fast start', 'No password required'],
      price: 5.99,
      type: 'followers',
      platform: 'tiktok',
    },
  ],
  selectedPlatform: null,
  selectedType: null,
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
  setSelectedType: (type) => set({ selectedType: type }),
  filterServices: () => {
    const { services, selectedPlatform, selectedType } = get();
    return services.filter(
      (service) =>
        (!selectedPlatform || service.platform === selectedPlatform) &&
        (!selectedType || service.type === selectedType)
    );
  },
}));
