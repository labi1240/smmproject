declare module '*.json' {
  const value: {
    [key: string]: Array<{
      service: number;
      name: string;
      type: string;
      category: string;
      rate: string;
      min: string;
      max: string;
      refill: boolean;
      cancel: boolean;
      platform: string;
      serviceType: string;
    }>;
  };
  export default value;
}
