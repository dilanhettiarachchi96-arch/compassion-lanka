import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import {
  impactStats,
  mockCampaigns,
  mockDonors,
  mockHomes,
  mockSponsoredChildren,
} from '@/lib/mock-data';
import type { Campaign, ChildrenHome, SponsoredChild } from '@/types';

/* -------------------------------------------------------------------------- */
/*  Raw row shapes (DB snake_case)                                            */
/* -------------------------------------------------------------------------- */

interface CampaignRow {
  id: string;
  slug: string;
  title: string;
  category: Campaign['category'];
  description: string;
  short_description: string;
  goal_amount: number;
  raised_amount: number;
  image_url: string;
  location: string;
  district: string;
  children_home_id: string;
  is_urgent: boolean;
  is_active: boolean;
  donor_count: number;
  days_left: number;
  created_at: string;
}

interface HomeRow {
  id: string;
  name: string;
  location: string;
  district: string;
  latitude: number;
  longitude: number;
  children_count: number;
  contact_person: string;
  phone: string;
  current_needs: ChildrenHome['currentNeeds'];
  description: string;
  image_url: string;
}

interface SponsoredChildRow {
  id: string;
  age: number;
  grade: number;
  school_name: string;
  district: string;
  items_needed: string[];
  sponsorship_cost_lkr: number;
  is_sponsored: boolean;
}

interface DonationRow {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  is_anonymous: boolean;
  created_at: string;
}

/* -------------------------------------------------------------------------- */
/*  Mappers (snake_case DB row -> typed camelCase model)                      */
/* -------------------------------------------------------------------------- */

function mapCampaign(row: CampaignRow): Campaign {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    shortDescription: row.short_description,
    goalAmount: Number(row.goal_amount),
    raisedAmount: Number(row.raised_amount),
    imageUrl: row.image_url,
    location: row.location,
    district: row.district,
    childrenHomeId: String(row.children_home_id),
    isUrgent: Boolean(row.is_urgent),
    isActive: Boolean(row.is_active),
    donorCount: Number(row.donor_count),
    daysLeft: Number(row.days_left),
    createdAt: row.created_at,
  };
}

function mapHome(row: HomeRow): ChildrenHome {
  return {
    id: String(row.id),
    name: row.name,
    location: row.location,
    district: row.district,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    childrenCount: Number(row.children_count),
    contactPerson: row.contact_person,
    phone: row.phone,
    currentNeeds: Array.isArray(row.current_needs) ? row.current_needs : [],
    description: row.description,
    imageUrl: row.image_url,
  };
}

function mapSponsoredChild(row: SponsoredChildRow): SponsoredChild {
  return {
    id: String(row.id),
    age: Number(row.age),
    grade: Number(row.grade),
    schoolName: row.school_name,
    district: row.district,
    itemsNeeded: Array.isArray(row.items_needed) ? row.items_needed : [],
    sponsorshipCostLKR: Number(row.sponsorship_cost_lkr),
    isSponsored: Boolean(row.is_sponsored),
  };
}

/* -------------------------------------------------------------------------- */
/*  Queries (real Supabase read, silent mock fallback on error/empty)         */
/* -------------------------------------------------------------------------- */

/** All active campaigns, newest first. Falls back to mock on error or empty. */
export const getCampaigns = cache(async (): Promise<Campaign[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return mockCampaigns;
    return (data as CampaignRow[]).map(mapCampaign);
  } catch (err) {
    console.warn('[queries.getCampaigns] falling back to mock:', err);
    return mockCampaigns;
  }
});

/** Single campaign by slug. Falls back to a mock match if DB has none. */
export const getCampaignBySlug = cache(
  async (slug: string): Promise<Campaign | null> => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      if (data) return mapCampaign(data as CampaignRow);

      // DB returned no row — fall back to mock by slug.
      return mockCampaigns.find((c) => c.slug === slug) ?? null;
    } catch (err) {
      console.warn('[queries.getCampaignBySlug] falling back to mock:', err);
      return mockCampaigns.find((c) => c.slug === slug) ?? null;
    }
  }
);

/** Featured campaigns for the home page (limited). Falls back to mock. */
export const getFeaturedCampaigns = cache(
  async (limit = 6): Promise<Campaign[]> => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      if (!data || data.length === 0) return mockCampaigns.slice(0, limit);
      return (data as CampaignRow[]).map(mapCampaign);
    } catch (err) {
      console.warn('[queries.getFeaturedCampaigns] falling back to mock:', err);
      return mockCampaigns.slice(0, limit);
    }
  }
);

/** All partner children's homes. Falls back to mock. */
export const getHomes = cache(async (): Promise<ChildrenHome[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('children_homes').select('*');

    if (error) throw error;
    if (!data || data.length === 0) return mockHomes;
    return (data as HomeRow[]).map(mapHome);
  } catch (err) {
    console.warn('[queries.getHomes] falling back to mock:', err);
    return mockHomes;
  }
});

/** Children available for school-kit sponsorship. Falls back to mock. */
export const getSponsoredChildren = cache(async (): Promise<SponsoredChild[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('sponsored_children')
      .select('*');

    if (error) throw error;
    if (!data || data.length === 0) return mockSponsoredChildren;
    return (data as SponsoredChildRow[]).map(mapSponsoredChild);
  } catch (err) {
    console.warn('[queries.getSponsoredChildren] falling back to mock:', err);
    return mockSponsoredChildren;
  }
});

/** Impact stats for the home counter. Real active-campaign count when available. */
export const getImpactStats = cache(async () => {
  const base = { ...impactStats };
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from('campaigns')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (error) throw error;
    if (typeof count === 'number') {
      return { ...base, activeCampaigns: count };
    }
  } catch (err) {
    console.warn('[queries.getImpactStats] using mock stats:', err);
  }
  return base;
});

/** Recent donors for a campaign. Falls back to mock donors. */
export const getCampaignDonors = cache(
  async (campaignId: string, limit = 10) => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('donations')
        .select('id, donor_name, donor_email, amount, is_anonymous, created_at')
        .eq('campaign_id', campaignId)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      if (!data || data.length === 0) return mockDonors.slice(0, limit);

      return (data as DonationRow[]).map((row) => ({
        name: row.is_anonymous ? 'Anonymous' : row.donor_name,
        amount: Number(row.amount),
        date: row.created_at,
        anonymous: Boolean(row.is_anonymous),
      }));
    } catch (err) {
      console.warn('[queries.getCampaignDonors] falling back to mock:', err);
      return mockDonors.slice(0, limit);
    }
  }
);
