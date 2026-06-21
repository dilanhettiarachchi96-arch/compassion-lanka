export type CampaignCategory = 'clothes' | 'food' | 'medicine' | 'school_supplies';
export type ShipmentStatus = 'registered' | 'in_transit' | 'received' | 'distributed';
export type PaymentMethod = 'card' | 'payhere' | 'bank_transfer';
export type DonationStatus = 'pending' | 'completed' | 'failed';

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: CampaignCategory;
  description: string;
  shortDescription: string;
  goalAmount: number;
  raisedAmount: number;
  imageUrl: string;
  location: string;
  district: string;
  childrenHomeId: string;
  isUrgent: boolean;
  isActive: boolean;
  donorCount: number;
  daysLeft: number;
  createdAt: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  isAnonymous: boolean;
  message?: string;
  status: DonationStatus;
  createdAt: string;
}

export interface GoodsShipment {
  id: string;
  senderName: string;
  senderEmail: string;
  senderCountry: string;
  contentsDescription: string;
  estimatedWeightKg: number;
  trackingNumber?: string;
  status: ShipmentStatus;
  notes?: string;
  createdAt: string;
}

export interface ChildrenHome {
  id: string;
  name: string;
  location: string;
  district: string;
  latitude: number;
  longitude: number;
  childrenCount: number;
  contactPerson: string;
  phone: string;
  currentNeeds: CampaignCategory[];
  description: string;
  imageUrl: string;
}

export interface SponsoredChild {
  id: string;
  age: number;
  grade: number;
  schoolName: string;
  district: string;
  itemsNeeded: string[];
  sponsorshipCostLKR: number;
  isSponsored: boolean;
}

export interface ImpactStory {
  id: string;
  firstName: string;
  age: number;
  location: string;
  quote: string;
  fullStory: string;
  imageUrl: string;
  program: CampaignCategory;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}
