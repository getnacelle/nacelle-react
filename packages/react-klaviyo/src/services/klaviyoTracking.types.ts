export type TrackEvent = [string, string, KlaviyoTrackingItem];
export type IdentifyCustomer = [string, KlaviyoCustomer];

export type Customer = {
  email?: string;
};

export type KlaviyoCustomer = {
  $email: string;
};

export type KlaviyoTrackingItem = {
  Name: string;
  ProductID: string;
  Categories: string[];
  ImageURL: string;
  URL: string;
  Brand: string;
  Price: string;
  CompareAtPrice: string;
};
