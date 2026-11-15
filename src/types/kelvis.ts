export type RegionId = 'london' | 'germany' | 'dubai';

export type ServiceCategory =
  | 'all'
  | 'engineering'
  | 'video-reels'
  | 'faqs'
  | 'mep'
  | 'build'
  | 'security-it'
  | 'grounds';

export interface ServiceTechSpecs {
  dispatchTier: string;
  emergencySupport: string;
  certifications: string;
  coverageRegions: string;
  inspectionFrequency: string;
  warrantyPeriod: string;
  typicalDeliverables: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: Exclude<
    ServiceCategory,
    'all' | 'engineering' | 'video-reels' | 'faqs'
  >;
  categoryLabel: string;
  tagline: string;
  responseSla: string;
  image: string;
  featured?: boolean;
  specs: ServiceTechSpecs;
}

export interface OfficeLocation {
  id: RegionId;
  city: string;
  country: string;
  hubCode: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  email: string;
  hours: string;
  coverage: string;
  timezone: string;
  lat: number;
  lng: number;
  image: string;
}

export interface VideoChapter {
  id: string;
  title: string;
  regionLabel: string;
  durationSec: number;
  durationFormatted: string;
  frames: {
    image: string;
    caption: string;
  }[];
}

export interface ClientCase {
  id: string;
  name: string;
  sector: string;
  city: string;
  metric: string;
  outcome: string;
  servicesUsed: string[];
  logo?: string;
  logoScaleClass?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  hub: string;
  credential: string;
  specialty: string;
  initials: string;
  photo: string;
  bio: string;
  skills: string[];
}

export interface BookingRecord {
  id: string;
  referenceCode: string;
  serviceId: string;
  serviceName: string;
  regionId: RegionId;
  regionLabel: string;
  propertyType: 'Commercial' | 'Residential' | 'Industrial';
  preferredDate: string;
  timeWindow: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  siteAddress: string;
  notes: string;
  status: 'Confirmed' | 'Dispatched';
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  authorName: string;
  role: string;
  organization: string;
  regionId: RegionId;
  regionLabel: string;
  serviceName: string;
  rating: number;
  comment: string;
  outcomeMetric: string;
  createdAt: string;
}

export interface ClientSpotlightClip {
  id: string;
  regionId: 'london' | 'germany';
  regionLabel: string;
  cityBadge: string;
  partnerName: string;
  partnerLogo?: string;
  logoCircleClass?: string;
  speakerName: string;
  speakerRole: string;
  clipTitle: string;
  serviceTag: string;
  outcomeMetric: string;
  durationSec: number;
  durationFormatted: string;
  quote: string;
  frames: {
    image: string;
    caption: string;
    timestamp: string;
  }[];
}

