'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@repo/design-system/components/ui/tabs';
import { Check, Instagram, Star, Youtube, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { type FormEvent, useEffect, useState } from 'react';
import { AiFillTikTok } from 'react-icons/ai';
import { Balancer } from 'react-wrap-balancer';
import { createOrder, filterServices } from './actions';
import type { Service } from './types';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
  { id: 'tiktok', name: 'TikTok', icon: AiFillTikTok },
];

const types = [
  { id: 'followers', name: 'Followers' },
  { id: 'views', name: 'Views' },
  { id: 'likes', name: 'Likes' },
];

const benefits = [
  {
    title: 'Instant Start',
    description: 'The fulfillment starts right after the payment.',
    icon: Zap,
  },
  {
    title: 'High Quality',
    description: 'All accounts are real and active.',
    icon: Star,
  },
  {
    title: '24/7 Support',
    description: 'Our team is here to help you anytime.',
    icon: Check,
  },
];

interface OrderDialogProps {
  service: Service;
}

interface ActionResult<T> {
  data?: T;
  error?: string;
}

function OrderDialog({ service }: OrderDialogProps) {
  const [quantity, setQuantity] = useState(100);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createOrder({
      serviceId: service.id,
      quantity,
      targetUsername: username,
    });

    if (result && 'error' in result) {
      console.error(result.error);
    } else if (result && 'order' in result) {
      console.log('Order created:', result.order);
    }

    setIsLoading(false);
  };

  const discount = Math.floor((quantity / 1000) * 5); // 5% discount per 1000 units
  const originalPrice = (service.price * quantity) / 1000;
  const discountedPrice = originalPrice * (1 - discount / 100);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Order Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order {service.name}</DialogTitle>
          <DialogDescription>
            Fill in the details below to place your order.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter target username"
                className="bg-background"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={100}
                step={100}
                className="bg-background"
              />
              {discount > 0 && (
                <p className="text-green-500 text-sm">
                  {discount}% discount applied!
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>Price:</span>
              <div className="text-right">
                {discount > 0 && (
                  <span className="mr-2 text-gray-500 text-sm line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="font-bold text-xl">
                  ${discountedPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? 'Processing...' : 'Place Order'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon =
    platforms.find((p) => p.id === service.platform)?.icon || Instagram;

  const discount = Math.floor(Math.random() * 30 + 20); // Random discount between 20-50%
  const originalPrice = service.price;
  const discountedPrice = originalPrice * (1 - discount / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-4 right-4 rounded-full bg-red-500 px-2 py-1 text-sm text-white">
            Save {discount}%
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <CardTitle>{service.name}</CardTitle>
          </div>
          <CardDescription>
            <Balancer>{service.description}</Balancer>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="font-bold text-3xl">
                ${discountedPrice.toFixed(2)}
              </div>
              {discount > 0 && (
                <div className="text-gray-500 text-sm line-through">
                  ${originalPrice.toFixed(2)}
                </div>
              )}
              <div className="text-gray-500 text-sm">per 1000</div>
            </div>
            <ul className="space-y-2 text-sm">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <OrderDialog service={service} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      const result = await filterServices({
        platform: selectedPlatform,
        type: selectedType,
      });

      if (result && 'services' in result) {
        setServices(result.services as Service[]);
      }
      setIsLoading(false);
    };

    loadServices();
  }, [selectedPlatform, selectedType]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-12 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-bold text-4xl text-transparent md:text-5xl">
          <Balancer>Grow Your Social Media Presence</Balancer>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 text-lg">
          <Balancer>
            Choose from our range of premium services to boost your social media
            engagement. Fast delivery, real engagement, 24/7 support.
          </Balancer>
        </p>
      </div>

      <div className="mb-12 grid gap-8 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className="border-0 bg-gradient-to-br from-white to-gray-50"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8 space-y-4">
        <Tabs
          value={selectedPlatform || 'all'}
          onValueChange={(value) =>
            setSelectedPlatform(value === 'all' ? null : value)
          }
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Platforms</TabsTrigger>
            {platforms.map((platform) => (
              <TabsTrigger key={platform.id} value={platform.id}>
                <platform.icon className="mr-2 h-4 w-4" />
                {platform.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Tabs
          value={selectedType || 'all'}
          onValueChange={(value) =>
            setSelectedType(value === 'all' ? null : value)
          }
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Types</TabsTrigger>
            {types.map((type) => (
              <TabsTrigger key={type.id} value={type.id}>
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        )}
      </div>
    </div>
  );
}
