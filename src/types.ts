export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  avatarUrl?: string;
  text: string;
  ownerResponse?: {
    date: string;
    text: string;
  };
  tags: string[];
  likes?: number;
  location?: string;
}

export interface BusinessDetails {
  name: string;
  rating: number;
  totalReviews: number;
  category: string;
  address: string;
  addressExtra: string;
  plusCode: string;
  phone: string;
  hours: { [key: string]: string };
  isOpenNow: boolean;
  services: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  features: string[];
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  monthlyBill: string;
  propertyType: string;
  notes: string;
}

export interface AiChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
