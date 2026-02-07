import { getStore } from '@netlify/blobs';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export interface SiteSettingsData {
  brand: string;
  siteName: string;
  baseUrl: string;
  locale: string;
  tagline: string;
  description: string;
  hero: Record<string, unknown>;
  cryotherapy: Record<string, unknown>;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    bookingLink: string;
    address: string;
    mapProfileUrl: string;
    mapEmbedUrl: string;
    hours: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface ServiceSeo {
  title: string;
  description: string;
}

export interface ServiceLocaleContent {
  name: string;
  category: string;
  tagline: string;
  summary: string;
  seo: ServiceSeo;
}

type ServiceTranslations = Partial<Record<'fr' | 'ar', ServiceLocaleContent>>;

export interface ServiceData {
  slug: string;
  path: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  benefits: string[];
  duration: string;
  priceNote: string;
  featured: boolean;
  heroImage: string;
  galleryImages?: string[];
  needsCopy: boolean;
  seo: ServiceSeo;
  translations?: ServiceTranslations;
}

interface ServicesPayload {
  categories: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  services: ServiceData[];
}

export interface BusinessSettingsInput {
  siteName: string;
  description: string;
  phone: string;
  whatsapp: string;
  publicEmail: string;
  address: string;
  mapProfileUrl: string;
  mapEmbedUrl: string;
  openingHours: string[];
}

export interface ServiceUpdateInput {
  name: string;
  category: string;
  tagline: string;
  summary: string;
  duration: string;
  priceNote: string;
  heroImage: string;
  galleryImages: string[];
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  fr: {
    name: string;
    category: string;
    tagline: string;
    summary: string;
    seoTitle: string;
    seoDescription: string;
  };
  ar: {
    name: string;
    category: string;
    tagline: string;
    summary: string;
    seoTitle: string;
    seoDescription: string;
  };
}

export interface AdminSettings {
  formRecipientEmail: string;
  resendFromEmail: string;
  resendFromName: string;
}

export type LeadSubmissionStatus = 'received' | 'emailed' | 'email_failed';

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  slot: string;
  zone?: string;
  contactPreference?: string;
  locale?: string;
  sourcePath?: string;
  submittedAt: string;
  status: LeadSubmissionStatus;
  recipientEmail: string;
  emailError?: string;
}

interface LeadSubmissionsPayload {
  submissions: LeadSubmission[];
}

export interface LeadSubmissionInput {
  name: string;
  phone: string;
  slot: string;
  zone?: string;
  contactPreference?: string;
  locale?: string;
  sourcePath?: string;
  recipientEmail: string;
}

export interface LeadAnalytics {
  total: number;
  today: number;
  last7Days: number;
  last30Days: number;
  emailed: number;
  emailFailed: number;
}

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');
const DATA_DIR = path.join(process.cwd(), 'data');

const SITE_SETTINGS_FILE = path.join(CONTENT_DIR, 'site-settings.json');
const SERVICES_FILE = path.join(CONTENT_DIR, 'services.json');
const ADMIN_SETTINGS_FILE = path.join(DATA_DIR, 'admin-settings.json');
const LEAD_SUBMISSIONS_FILE = path.join(DATA_DIR, 'lead-submissions.json');

const NETLIFY_ADMIN_STORE = 'icelady-admin';

const BLOB_KEYS = {
  siteSettings: 'site-settings',
  services: 'services',
  adminSettings: 'admin-settings',
  leadSubmissions: 'lead-submissions'
} as const;

function toJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function writeJsonAtomic(filePath: string, value: unknown): void {
  mkdirSync(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(tempPath, toJson(value), 'utf8');
  renameSync(tempPath, filePath);
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  mkdirSync(path.dirname(filePath), { recursive: true });

  if (!existsSync(filePath)) {
    writeJsonAtomic(filePath, fallback);
    return fallback;
  }

  try {
    const raw = readFileSync(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    writeJsonAtomic(filePath, fallback);
    return fallback;
  }
}

function normalizeString(value: string, maxLength: number): string {
  return value.replace(/\r/g, '').trim().slice(0, maxLength);
}

function normalizeImagePath(value: string): string {
  const trimmed = normalizeString(value, 500);
  if (!trimmed) {
    return '';
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed;
  }

  return `/${trimmed}`;
}

function normalizeLocalizedContent(
  input: ServiceUpdateInput['fr'],
  fallback: ServiceLocaleContent
): ServiceLocaleContent {
  return {
    name: normalizeString(input.name, 180) || fallback.name,
    category: normalizeString(input.category, 120) || fallback.category,
    tagline: normalizeString(input.tagline, 180) || fallback.tagline,
    summary: normalizeString(input.summary, 2000) || fallback.summary,
    seo: {
      title: normalizeString(input.seoTitle, 180) || fallback.seo.title,
      description: normalizeString(input.seoDescription, 320) || fallback.seo.description
    }
  };
}

function buildDefaultSiteSettings(): SiteSettingsData {
  return {
    brand: 'Ice Lady',
    siteName: 'Ice Lady Marrakech',
    baseUrl: 'https://islady.ma',
    locale: 'en-MA',
    tagline: '',
    description: '',
    hero: {},
    cryotherapy: {},
    contact: {
      phone: '',
      whatsapp: '',
      email: '',
      bookingLink: '/en/pages/contact',
      address: '',
      mapProfileUrl: '',
      mapEmbedUrl: '',
      hours: []
    }
  };
}

function buildDefaultServicesPayload(): ServicesPayload {
  return {
    categories: [],
    services: []
  };
}

function buildDefaultSubmissions(): LeadSubmissionsPayload {
  return {
    submissions: []
  };
}

function getBlobStore() {
  const hasContext = Boolean(
    process.env.NETLIFY_BLOBS_CONTEXT ||
      process.env.NETLIFY ||
      (globalThis as { netlifyBlobsContext?: unknown }).netlifyBlobsContext
  );

  if (!hasContext) {
    return null;
  }

  try {
    return getStore({ name: NETLIFY_ADMIN_STORE, consistency: 'strong' });
  } catch {
    return null;
  }
}

async function readPersistentJson<T>(key: string, filePath: string, fallback: T): Promise<T> {
  const store = getBlobStore();

  if (!store) {
    return readJsonFile<T>(filePath, fallback);
  }

  try {
    const blobValue = (await store.get(key, {
      consistency: 'strong',
      type: 'json'
    })) as T | null;

    if (blobValue !== null) {
      return blobValue;
    }

    await store.setJSON(key, fallback, { onlyIfNew: true });
    return fallback;
  } catch {
    return readJsonFile<T>(filePath, fallback);
  }
}

async function writePersistentJson(key: string, filePath: string, value: unknown): Promise<void> {
  const store = getBlobStore();

  if (!store) {
    writeJsonAtomic(filePath, value);
    return;
  }

  try {
    await store.setJSON(key, value);
  } catch {
    writeJsonAtomic(filePath, value);
  }
}

function buildNextBusinessSettings(
  current: SiteSettingsData,
  input: BusinessSettingsInput
): SiteSettingsData {
  return {
    ...current,
    siteName: normalizeString(input.siteName, 120),
    description: normalizeString(input.description, 500),
    contact: {
      ...current.contact,
      phone: normalizeString(input.phone, 60),
      whatsapp: normalizeString(input.whatsapp, 60),
      email: normalizeString(input.publicEmail, 120),
      address: normalizeString(input.address, 260),
      mapProfileUrl: normalizeString(input.mapProfileUrl, 500),
      mapEmbedUrl: normalizeString(input.mapEmbedUrl, 1000),
      hours: input.openingHours
        .map((hour) => normalizeString(hour, 120))
        .filter((hour) => hour.length > 0)
    }
  };
}

function buildNextServiceData(current: ServiceData, input: ServiceUpdateInput): ServiceData {
  const nextName = normalizeString(input.name, 180) || current.name;
  const nextCategory = normalizeString(input.category, 120) || current.category;
  const nextTagline = normalizeString(input.tagline, 180) || current.tagline;
  const nextSummary = normalizeString(input.summary, 2000) || current.summary;
  const nextSeoTitle = normalizeString(input.seoTitle, 180) || current.seo.title;
  const nextSeoDescription = normalizeString(input.seoDescription, 320) || current.seo.description;

  const frFallback: ServiceLocaleContent = current.translations?.fr || {
    name: current.name,
    category: current.category,
    tagline: current.tagline,
    summary: current.summary,
    seo: {
      title: current.seo.title,
      description: current.seo.description
    }
  };

  const arFallback: ServiceLocaleContent = current.translations?.ar || {
    name: current.name,
    category: current.category,
    tagline: current.tagline,
    summary: current.summary,
    seo: {
      title: current.seo.title,
      description: current.seo.description
    }
  };

  return {
    ...current,
    name: nextName,
    category: nextCategory,
    tagline: nextTagline,
    summary: nextSummary,
    duration: normalizeString(input.duration, 80),
    priceNote: normalizeString(input.priceNote, 180),
    featured: input.featured,
    heroImage: normalizeImagePath(input.heroImage),
    galleryImages: input.galleryImages
      .map((image) => normalizeImagePath(image))
      .filter((image) => image.length > 0),
    seo: {
      title: nextSeoTitle,
      description: nextSeoDescription
    },
    translations: {
      ...(current.translations || {}),
      fr: normalizeLocalizedContent(input.fr, frFallback),
      ar: normalizeLocalizedContent(input.ar, arFallback)
    }
  };
}

function buildDefaultAdminSettings(): AdminSettings {
  const siteSettings = getSiteSettingsData();

  return {
    formRecipientEmail: siteSettings.contact.email || 'contact@islady.ma',
    resendFromEmail: siteSettings.contact.email || 'contact@islady.ma',
    resendFromName: siteSettings.siteName || 'Ice Lady'
  };
}

function getLeadSubmissionsPayload(): LeadSubmissionsPayload {
  return readJsonFile<LeadSubmissionsPayload>(LEAD_SUBMISSIONS_FILE, buildDefaultSubmissions());
}

export function getSiteSettingsData(): SiteSettingsData {
  return readJsonFile<SiteSettingsData>(SITE_SETTINGS_FILE, buildDefaultSiteSettings());
}

export async function getSiteSettingsDataAsync(): Promise<SiteSettingsData> {
  return readPersistentJson<SiteSettingsData>(
    BLOB_KEYS.siteSettings,
    SITE_SETTINGS_FILE,
    getSiteSettingsData()
  );
}

export function updateBusinessSettings(input: BusinessSettingsInput): SiteSettingsData {
  const current = getSiteSettingsData();
  const next = buildNextBusinessSettings(current, input);

  writeJsonAtomic(SITE_SETTINGS_FILE, next);
  return next;
}

export async function updateBusinessSettingsAsync(
  input: BusinessSettingsInput
): Promise<SiteSettingsData> {
  const current = await getSiteSettingsDataAsync();
  const next = buildNextBusinessSettings(current, input);

  await writePersistentJson(BLOB_KEYS.siteSettings, SITE_SETTINGS_FILE, next);
  return next;
}

export function getServicesData(): ServicesPayload {
  return readJsonFile<ServicesPayload>(SERVICES_FILE, buildDefaultServicesPayload());
}

export async function getServicesDataAsync(): Promise<ServicesPayload> {
  return readPersistentJson<ServicesPayload>(BLOB_KEYS.services, SERVICES_FILE, getServicesData());
}

export function updateServiceData(slug: string, input: ServiceUpdateInput): ServiceData | null {
  const payload = getServicesData();
  const serviceIndex = payload.services.findIndex((service) => service.slug === slug);

  if (serviceIndex < 0) {
    return null;
  }

  const current = payload.services[serviceIndex];
  const nextService = buildNextServiceData(current, input);

  const nextPayload: ServicesPayload = {
    ...payload,
    services: payload.services.map((service, index) =>
      index === serviceIndex ? nextService : service
    )
  };

  writeJsonAtomic(SERVICES_FILE, nextPayload);
  return nextService;
}

export async function updateServiceDataAsync(
  slug: string,
  input: ServiceUpdateInput
): Promise<ServiceData | null> {
  const payload = await getServicesDataAsync();
  const serviceIndex = payload.services.findIndex((service) => service.slug === slug);

  if (serviceIndex < 0) {
    return null;
  }

  const current = payload.services[serviceIndex];
  const nextService = buildNextServiceData(current, input);

  const nextPayload: ServicesPayload = {
    ...payload,
    services: payload.services.map((service, index) =>
      index === serviceIndex ? nextService : service
    )
  };

  await writePersistentJson(BLOB_KEYS.services, SERVICES_FILE, nextPayload);
  return nextService;
}

export function getAdminSettings(): AdminSettings {
  return readJsonFile<AdminSettings>(ADMIN_SETTINGS_FILE, buildDefaultAdminSettings());
}

export async function getAdminSettingsAsync(): Promise<AdminSettings> {
  return readPersistentJson<AdminSettings>(
    BLOB_KEYS.adminSettings,
    ADMIN_SETTINGS_FILE,
    getAdminSettings()
  );
}

export function updateAdminSettings(input: AdminSettings): AdminSettings {
  const nextSettings: AdminSettings = {
    formRecipientEmail: normalizeString(input.formRecipientEmail, 120),
    resendFromEmail: normalizeString(input.resendFromEmail, 120),
    resendFromName: normalizeString(input.resendFromName, 120)
  };

  writeJsonAtomic(ADMIN_SETTINGS_FILE, nextSettings);
  return nextSettings;
}

export async function updateAdminSettingsAsync(input: AdminSettings): Promise<AdminSettings> {
  const nextSettings: AdminSettings = {
    formRecipientEmail: normalizeString(input.formRecipientEmail, 120),
    resendFromEmail: normalizeString(input.resendFromEmail, 120),
    resendFromName: normalizeString(input.resendFromName, 120)
  };

  await writePersistentJson(BLOB_KEYS.adminSettings, ADMIN_SETTINGS_FILE, nextSettings);
  return nextSettings;
}

async function getLeadSubmissionsPayloadAsync(): Promise<LeadSubmissionsPayload> {
  return readPersistentJson<LeadSubmissionsPayload>(
    BLOB_KEYS.leadSubmissions,
    LEAD_SUBMISSIONS_FILE,
    getLeadSubmissionsPayload()
  );
}

export function getLeadSubmissions(limit = 50): LeadSubmission[] {
  return getLeadSubmissionsPayload()
    .submissions.slice()
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, limit);
}

export async function getLeadSubmissionsAsync(limit = 50): Promise<LeadSubmission[]> {
  const payload = await getLeadSubmissionsPayloadAsync();

  return payload.submissions
    .slice()
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, limit);
}

export function recordLeadSubmission(input: LeadSubmissionInput): LeadSubmission {
  const payload = getLeadSubmissionsPayload();
  const submission: LeadSubmission = {
    id: randomUUID(),
    name: normalizeString(input.name, 120),
    phone: normalizeString(input.phone, 60),
    slot: normalizeString(input.slot, 120),
    zone: normalizeString(input.zone || '', 120) || undefined,
    contactPreference: normalizeString(input.contactPreference || '', 60) || undefined,
    locale: normalizeString(input.locale || '', 12) || undefined,
    sourcePath: normalizeString(input.sourcePath || '', 240) || undefined,
    submittedAt: new Date().toISOString(),
    status: 'received',
    recipientEmail: normalizeString(input.recipientEmail, 120)
  };

  const nextSubmissions = [submission, ...payload.submissions].slice(0, 5000);
  writeJsonAtomic(LEAD_SUBMISSIONS_FILE, {
    submissions: nextSubmissions
  });

  return submission;
}

export async function recordLeadSubmissionAsync(
  input: LeadSubmissionInput
): Promise<LeadSubmission> {
  const payload = await getLeadSubmissionsPayloadAsync();
  const submission: LeadSubmission = {
    id: randomUUID(),
    name: normalizeString(input.name, 120),
    phone: normalizeString(input.phone, 60),
    slot: normalizeString(input.slot, 120),
    zone: normalizeString(input.zone || '', 120) || undefined,
    contactPreference: normalizeString(input.contactPreference || '', 60) || undefined,
    locale: normalizeString(input.locale || '', 12) || undefined,
    sourcePath: normalizeString(input.sourcePath || '', 240) || undefined,
    submittedAt: new Date().toISOString(),
    status: 'received',
    recipientEmail: normalizeString(input.recipientEmail, 120)
  };

  const nextSubmissions = [submission, ...payload.submissions].slice(0, 5000);

  await writePersistentJson(BLOB_KEYS.leadSubmissions, LEAD_SUBMISSIONS_FILE, {
    submissions: nextSubmissions
  });

  return submission;
}

export function markLeadSubmissionStatus(
  id: string,
  status: LeadSubmissionStatus,
  emailError?: string
): LeadSubmission | null {
  const payload = getLeadSubmissionsPayload();
  const index = payload.submissions.findIndex((submission) => submission.id === id);

  if (index < 0) {
    return null;
  }

  const current = payload.submissions[index];
  const next: LeadSubmission = {
    ...current,
    status,
    emailError: emailError ? normalizeString(emailError, 240) : undefined
  };

  const submissions = payload.submissions.slice();
  submissions[index] = next;

  writeJsonAtomic(LEAD_SUBMISSIONS_FILE, {
    submissions
  });

  return next;
}

export async function markLeadSubmissionStatusAsync(
  id: string,
  status: LeadSubmissionStatus,
  emailError?: string
): Promise<LeadSubmission | null> {
  const payload = await getLeadSubmissionsPayloadAsync();
  const index = payload.submissions.findIndex((submission) => submission.id === id);

  if (index < 0) {
    return null;
  }

  const current = payload.submissions[index];
  const next: LeadSubmission = {
    ...current,
    status,
    emailError: emailError ? normalizeString(emailError, 240) : undefined
  };

  const submissions = payload.submissions.slice();
  submissions[index] = next;

  await writePersistentJson(BLOB_KEYS.leadSubmissions, LEAD_SUBMISSIONS_FILE, {
    submissions
  });

  return next;
}

function buildLeadAnalytics(submissions: LeadSubmission[]): LeadAnalytics {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  return {
    total: submissions.length,
    today: submissions.filter((submission) => {
      const diff = now - Date.parse(submission.submittedAt);
      return diff >= 0 && diff < dayMs;
    }).length,
    last7Days: submissions.filter((submission) => {
      const diff = now - Date.parse(submission.submittedAt);
      return diff >= 0 && diff <= dayMs * 7;
    }).length,
    last30Days: submissions.filter((submission) => {
      const diff = now - Date.parse(submission.submittedAt);
      return diff >= 0 && diff <= dayMs * 30;
    }).length,
    emailed: submissions.filter((submission) => submission.status === 'emailed').length,
    emailFailed: submissions.filter((submission) => submission.status === 'email_failed').length
  };
}

export function getLeadAnalytics(): LeadAnalytics {
  return buildLeadAnalytics(getLeadSubmissionsPayload().submissions);
}

export async function getLeadAnalyticsAsync(): Promise<LeadAnalytics> {
  const payload = await getLeadSubmissionsPayloadAsync();
  return buildLeadAnalytics(payload.submissions);
}
