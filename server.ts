import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

interface StoreShape {
  bookings: Array<{
    id: string;
    referenceCode: string;
    serviceId: string;
    serviceName: string;
    regionId: string;
    regionLabel: string;
    propertyType: string;
    preferredDate: string;
    timeWindow: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    siteAddress: string;
    notes: string;
    status: string;
    createdAt: string;
  }>;
  reviews: Array<{
    id: string;
    authorName: string;
    role: string;
    organization: string;
    regionId: string;
    regionLabel: string;
    serviceName: string;
    rating: number;
    comment: string;
    outcomeMetric: string;
    createdAt: string;
  }>;
  quotes?: Array<{
    id: string;
    referenceCode: string;
    serviceId: string;
    serviceName: string;
    regionId: string;
    regionLabel: string;
    facilitySize: string;
    estimatedRange: string;
    clientName: string;
    clientEmail: string;
    brief: string;
    createdAt: string;
  }>;
  newsletterSubscribers?: Array<{
    id: string;
    email: string;
    language: string;
    regionId: string;
    subscribedAt: string;
  }>;
}

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    authorName: 'Claire Thornton',
    role: 'Head of Workplace',
    organization: 'Bishopsgate Asset Partners',
    regionId: 'london',
    regionLabel: 'London, UK',
    serviceName: 'HVAC',
    rating: 5,
    comment:
      'Replaced two aging rooftop chillers over one weekend with zero tenant disruption. Energy draw dropped 34% in the very first quarter.',
    outcomeMetric: '-34% energy load in Q1',
    createdAt: '2026-10-18T09:30:00Z',
  },
  {
    id: 'rev-2',
    authorName: 'Stefan Becker',
    role: 'Facility Operations Lead',
    organization: 'RheinWerk Logistics GmbH',
    regionId: 'germany',
    regionLabel: 'Munich, Germany',
    serviceName: 'Electrical Maintenance',
    rating: 5,
    comment:
      'Their VDE-certified team caught a phase imbalance during a routine thermal scan before it could halt our automated sorting bay.',
    outcomeMetric: 'Zero unplanned outage',
    createdAt: '2026-10-29T14:15:00Z',
  },
  {
    id: 'rev-3',
    authorName: 'Nadia Haddad',
    role: 'Development Director',
    organization: 'Al-Maktoum Hospitality Group',
    regionId: 'dubai',
    regionLabel: 'Dubai, UAE',
    serviceName: 'Construction',
    rating: 5,
    comment:
      'Seamless handover from structural fit-out and acoustic painting to IT cabling and biometric security across 60 suites in 42 days.',
    outcomeMetric: 'Completed 6 days ahead of schedule',
    createdAt: '2026-11-04T11:20:00Z',
  },
  {
    id: 'rev-4',
    authorName: 'Oliver Bennett',
    role: 'Estate Manager',
    organization: 'Thameside Medical Suites',
    regionId: 'london',
    regionLabel: 'London, UK',
    serviceName: 'Plumbing',
    rating: 5,
    comment:
      'Emergency riser repair arrived on site in 35 minutes at 2 a.m. Clean workmanship and full pressure certification before morning clinics.',
    outcomeMetric: '35 min overnight arrival',
    createdAt: '2026-11-09T08:05:00Z',
  },
];

function ensureStore(): StoreShape {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    const initial: StoreShape = {
      bookings: [],
      reviews: DEFAULT_REVIEWS,
      quotes: [],
      newsletterSubscribers: [],
    };
    fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as StoreShape;
    return {
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
      reviews:
        Array.isArray(parsed.reviews) && parsed.reviews.length > 0
          ? parsed.reviews
          : DEFAULT_REVIEWS,
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
      newsletterSubscribers: Array.isArray(parsed.newsletterSubscribers)
        ? parsed.newsletterSubscribers
        : [],
    };
  } catch {
    const fallback: StoreShape = {
      bookings: [],
      reviews: DEFAULT_REVIEWS,
      quotes: [],
      newsletterSubscribers: [],
    };
    fs.writeFileSync(STORE_PATH, JSON.stringify(fallback, null, 2), 'utf-8');
    return fallback;
  }
}

function saveStore(store: StoreShape) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

const REGION_CODES: Record<string, string> = {
  london: 'LDN',
  germany: 'DEU',
  dubai: 'DXB',
};

const REGION_LABELS: Record<string, string> = {
  london: 'London, UK',
  germany: 'Munich & Frankfurt, Germany',
  dubai: 'Dubai, UAE',
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Lightweight security & cache headers for fast global delivery
  app.use((req, res, next) => {
    if (req.path.startsWith('/assets/') || req.path.startsWith('/src/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/maps-config', (_req, res) => {
    const apiKey =
      process.env.VITE_GOOGLE_MAPS_API_KEY ||
      process.env.GOOGLE_MAPS_API_KEY ||
      '';
    res.json({ apiKey });
  });

  app.post('/api/assistant', async (req, res) => {
    const { message, regionId } = req.body ?? {};
    const promptText = String(message || '').trim().slice(0, 600);
    if (!promptText) {
      res.status(400).json({ error: 'Please enter a message.' });
      return;
    }

    const regionName =
      regionId === 'germany'
        ? 'Munich & Frankfurt, Germany (+49 89 2154 8810)'
        : regionId === 'dubai'
          ? 'Dubai, UAE (+971 4 519 4200)'
          : 'London, UK (+44 20 7946 0821)';

    if (!ai) {
      res.json({
        reply: `Our ${regionName} dispatch team handles all 13 trades including HVAC, Electrical, Plumbing, Construction, Security, and IT with 45–60 minute priority SLAs. Click Open Booking Form below to confirm a technician slot.`,
      });
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Active client region: ${regionName}.\nClient inquiry: ${promptText}`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            'You are the Kelvix Solutions Dispatch & Client Support Assistant. Answer concisely in 2-3 clear sentences. Kelvix Solutions operates in London (+44 20 7946 0821), Germany Munich/Frankfurt (+49 89 2154 8810), and Dubai (+971 4 519 4200). Services (13): Plumbing (45 min SLA), Electrical (45 min SLA), HVAC (60 min SLA), Mechanical (60 min SLA), Electrical Maintenance (60 min SLA), IT (45 min SLA), Security (60 min SLA), Construction (24 hr), Painting (24 hr), Maintenance (90 min), Cleaning (2 hr), Pest Control (3 hr), Gardening (24 hr). Always recommend opening the dispatch booking form or calling the regional hotline when ready to schedule.',
        },
      });
      const text =
        response.text?.trim() ||
        `Our ${regionName} engineering desk is ready to assist. Please select Open Booking Form below to schedule your site visit.`;
      res.json({ reply: text });
    } catch {
      res.json({
        reply: `Our ${regionName} desk is available 24/7 for Plumbing, Electrical, HVAC, Construction, Security, IT, and Facility Maintenance. Use Open Booking Form below or our direct hotline for immediate dispatch.`,
      });
    }
  });

  app.get('/api/bookings', (_req, res) => {
    const store = ensureStore();
    // Return sanitized summary list for dispatch verification without leaking emails/phones publicly
    const sanitized = store.bookings.slice(0, 12).map((b) => ({
      id: b.id,
      referenceCode: b.referenceCode,
      serviceId: b.serviceId,
      serviceName: b.serviceName,
      regionId: b.regionId,
      regionLabel: b.regionLabel,
      propertyType: b.propertyType,
      preferredDate: b.preferredDate,
      timeWindow: b.timeWindow,
      status: b.status,
      createdAt: b.createdAt,
    }));
    res.json({ bookings: sanitized });
  });

  app.post('/api/bookings', (req, res) => {
    const {
      serviceId,
      serviceName,
      regionId,
      propertyType,
      preferredDate,
      timeWindow,
      clientName,
      clientEmail,
      clientPhone,
      siteAddress,
      notes,
    } = req.body ?? {};

    if (
      !serviceId ||
      !serviceName ||
      !regionId ||
      !preferredDate ||
      !timeWindow ||
      !clientName?.trim() ||
      !clientEmail?.trim() ||
      !clientPhone?.trim() ||
      !siteAddress?.trim()
    ) {
      res.status(400).json({ error: 'Please complete all required booking fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(clientEmail).trim())) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    const hubCode = REGION_CODES[String(regionId)] ?? 'GLB';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `KLV-${hubCode}-${randomNum}`;

    const booking = {
      id: `bk-${Date.now()}`,
      referenceCode,
      serviceId: String(serviceId),
      serviceName: String(serviceName),
      regionId: String(regionId),
      regionLabel: REGION_LABELS[String(regionId)] ?? 'Global Hub',
      propertyType: String(propertyType || 'Commercial'),
      preferredDate: String(preferredDate),
      timeWindow: String(timeWindow),
      clientName: String(clientName).trim().slice(0, 100),
      clientEmail: String(clientEmail).trim().slice(0, 120),
      clientPhone: String(clientPhone).trim().slice(0, 40),
      siteAddress: String(siteAddress).trim().slice(0, 200),
      notes: String(notes || '').trim().slice(0, 500),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    const store = ensureStore();
    store.bookings.unshift(booking);
    saveStore(store);

    res.status(201).json({ booking });
  });

  app.get('/api/reviews', (_req, res) => {
    const store = ensureStore();
    res.json({ reviews: store.reviews });
  });

  app.post('/api/reviews', (req, res) => {
    const { authorName, role, organization, regionId, serviceName, rating, comment, outcomeMetric } =
      req.body ?? {};

    if (!authorName?.trim() || !comment?.trim() || !serviceName?.trim() || !regionId) {
      res.status(400).json({ error: 'Name, region, service, and review feedback are required.' });
      return;
    }

    const parsedRating = Math.min(5, Math.max(1, Number(rating) || 5));

    const review = {
      id: `rev-${Date.now()}`,
      authorName: String(authorName).trim().slice(0, 80),
      role: String(role || 'Property Client').trim().slice(0, 80),
      organization: String(organization || 'Verified Client').trim().slice(0, 80),
      regionId: String(regionId),
      regionLabel: REGION_LABELS[String(regionId)] ?? 'London, UK',
      serviceName: String(serviceName).trim().slice(0, 60),
      rating: parsedRating,
      comment: String(comment).trim().slice(0, 400),
      outcomeMetric: String(outcomeMetric || 'Verified service delivery').trim().slice(0, 60),
      createdAt: new Date().toISOString(),
    };

    const store = ensureStore();
    store.reviews.unshift(review);
    saveStore(store);

    res.status(201).json({ review });
  });

  app.post('/api/quotes', (req, res) => {
    const {
      serviceId,
      serviceName,
      regionId,
      facilitySize,
      estimatedRange,
      clientName,
      clientEmail,
      brief,
    } = req.body ?? {};

    if (
      !serviceId ||
      !serviceName ||
      !regionId ||
      !facilitySize ||
      !clientName?.trim() ||
      !clientEmail?.trim()
    ) {
      res
        .status(400)
        .json({ error: 'Please complete service, name, and work email.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(clientEmail).trim())) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    const hubCode = REGION_CODES[String(regionId)] ?? 'GLB';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `KLV-QT-${hubCode}-${randomNum}`;

    const quote = {
      id: `qt-${Date.now()}`,
      referenceCode,
      serviceId: String(serviceId),
      serviceName: String(serviceName),
      regionId: String(regionId),
      regionLabel: REGION_LABELS[String(regionId)] ?? 'London, UK',
      facilitySize: String(facilitySize).slice(0, 80),
      estimatedRange: String(estimatedRange || 'Custom Site Survey').slice(0, 80),
      clientName: String(clientName).trim().slice(0, 100),
      clientEmail: String(clientEmail).trim().slice(0, 120),
      brief: String(brief || '').trim().slice(0, 500),
      createdAt: new Date().toISOString(),
    };

    const store = ensureStore();
    store.quotes = [quote, ...(store.quotes || [])].slice(0, 100);
    saveStore(store);

    res.status(201).json({ quote });
  });

  app.post('/api/newsletter', (req, res) => {
    const { email, language, regionId } = req.body ?? {};
    const cleanEmail = String(email || '').trim().toLowerCase().slice(0, 140);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      res.status(400).json({ error: 'Please enter a valid work or client email address.' });
      return;
    }

    const store = ensureStore();
    const existing = (store.newsletterSubscribers || []).find(
      (sub) => sub.email === cleanEmail
    );

    if (existing) {
      res.status(200).json({ subscriber: existing, alreadySubscribed: true });
      return;
    }

    const subscriber = {
      id: `nl-${Date.now()}`,
      email: cleanEmail,
      language: String(language || 'en').slice(0, 10),
      regionId: String(regionId || 'london').slice(0, 20),
      subscribedAt: new Date().toISOString(),
    };

    store.newsletterSubscribers = [
      subscriber,
      ...(store.newsletterSubscribers || []),
    ].slice(0, 500);
    saveStore(store);

    res.status(201).json({ subscriber, alreadySubscribed: false });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(
      express.static(distDir, {
        maxAge: '7d',
        etag: true,
      })
    );
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kelvix Solutions server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
