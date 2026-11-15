export type LanguageCode = 'en' | 'de' | 'ar';

export interface TranslationPack {
  langLabel: string;
  nav: {
    regionalHubs: string;
    dispatch247: string;
    clientDispatch: string;
    homePage: string;
    servicesSolutions: string;
    all13Services: string;
    engineeringSolutions: string;
    viewDirectory: string;
    corporateHub: string;
    photosVideo: string;
    clientsTeam: string;
    globalOfficesMap: string;
    searchPlaceholder: string;
    searchModalPlaceholder: string;
    classicLight: string;
    midnight: string;
    midnightTheme: string;
    bookService: string;
    liveNews: string;
    servicesHeading: string;
    hubsHeading: string;
    mobileHome: string;
    mobileServices: string;
    mobileMedia: string;
    mobileBook: string;
    mobileMenuHome: string;
    mobileMenuServices: string;
    mobileMenuMedia: string;
    mobileMenuTeam: string;
    mobileMenuBook: string;
    complianceLabel: string;
    regionCompliance: Record<
      'london' | 'germany' | 'dubai',
      { certs: string[]; summary: string }
    >;
  };
  news: {
    ldnTag: string;
    ldnHeadline: string;
    ldnCta: string;
    deTag: string;
    deHeadline: string;
    deCta: string;
    dxbTag: string;
    dxbHeadline: string;
    dxbCta: string;
    slaTag: string;
    slaHeadline: string;
    slaCta: string;
  };
  regions: {
    london: string;
    germany: string;
    dubai: string;
    londonFull: string;
    germanyFull: string;
    dubaiFull: string;
  };
  hero: {
    eyebrow: string;
    headlinePrefix: string;
    headlineSuffix: string;
    bookService: string;
    quickQuote: string;
    londonSub: string;
    germanySub: string;
    dubaiSub: string;
  };
  milestones: {
    eyebrow: string;
    titlePrefix: string;
    titleSuffix: string;
    projectsDelivered: string;
    certifiedEngineers: string;
    managedFootprint: string;
    slaCompliance: string;
    methodologyLabel: string;
    methodologies: {
      projectsDelivered: { title: string; source: string; detail: string };
      certifiedEngineers: { title: string; source: string; detail: string };
      managedFootprint: { title: string; source: string; detail: string };
      slaCompliance: { title: string; source: string; detail: string };
    };
  };
  pillars: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    cards: [
      {
        badge: string;
        title: string;
        description: string;
        bullets: [string, string, string];
        cta: string;
      },
      {
        badge: string;
        title: string;
        description: string;
        bullets: [string, string, string];
        cta: string;
      },
      {
        badge: string;
        title: string;
        description: string;
        bullets: [string, string, string];
        cta: string;
      },
    ];
  };
  reviews: {
    eyebrowPrefix: string;
    ratingSuffix: string;
    headingPrefix: string;
    headingSuffix: string;
    all: string;
    writeReview: string;
    modalTitle: string;
    namePlaceholder: string;
    companyPlaceholder: string;
    ratingLabel: string;
    experiencePlaceholder: string;
    publishing: string;
    publishReview: string;
    standardsEyebrow: string;
    standardsUkDesc: string;
    standardsDeDesc: string;
    standardsUaeDesc: string;
    standardsIsoDesc: string;
  };
  spotlight: {
    eyebrow: string;
    titlePrefix: string;
    titleSuffix: string;
    subtitle: string;
    filterAll: string;
    verifiedPartner: string;
    captionsOn: string;
    captionsOff: string;
    playClip: string;
    pauseClip: string;
    fullscreen: string;
    bookSimilar: string;
    clipPlaylistLabel: string;
  };
  partners: {
    eyebrow: string;
    headingPrefix: string;
    headingSuffix: string;
  };
  services: {
    directoryEyebrow: string;
    directoryTitle: string;
    catAll: string;
    catEngineering: string;
    catVideoReels: string;
    catFaqs: string;
    catMep: string;
    catBuild: string;
    catSecurityIt: string;
    catGrounds: string;
    engineeringBanner: {
      eyebrow: string;
      title: string;
      description: string;
      standardsChip: string;
      slaChip: string;
      bookCta: string;
    };
    selectUpTo3: string;
    compareSpecs: string;
    compare: string;
    comparing: string;
    removeCompare: string;
    standards: string;
    warranty: string;
    bookPrefix: string;
    sla: string;
    limitWarning: string;
    names: Record<string, string>;
    categories: Record<string, string>;
  };
  comparison: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    selectedOf3: string;
    top3Mep: string;
    clearAll: string;
    techParameter: string;
    compareUpTo3: string;
    slotLabel: string;
    addServicePlaceholder: string;
    rows: {
      discipline: string;
      responseSla: string;
      dispatchTier: string;
      emergencySupport: string;
      certifications: string;
      inspectionFrequency: string;
      warrantyPeriod: string;
      coverageRegions: string;
      typicalDeliverables: string;
      scheduleService: string;
    };
    emptyState: string;
  };
  quickQuote: {
    eyebrow: string;
    title: string;
    guideEstimate: string;
    targetSla: string;
    serviceDiscipline: string;
    regionalHub: string;
    facilityFootprint: string;
    tiers: {
      zone: { label: string; sublabel: string };
      floor: { label: string; sublabel: string };
      campus: { label: string; sublabel: string };
    };
    namePlaceholder: string;
    emailPlaceholder: string;
    briefPlaceholder: string;
    submitting: string;
    submit: string;
    loggedTitle: string;
    labelService: string;
    labelHub: string;
    labelScope: string;
    labelEstimate: string;
    followUpNote: string;
    returnHome: string;
    scheduleDispatch: string;
  };
  media: {
    eyebrowPrefix: string;
    eyebrowSuffix: string;
    title: string;
    realPhotos: string;
    videos: string;
  };
  clientsTeam: {
    clientsHeading: string;
    teamHeading: string;
    clientsSub: string;
    teamSub: string;
    clientsTab: string;
    teamTab: string;
    book: string;
  };
  booking: {
    heading: string;
    subtitle: string;
    serviceLabel: string;
    regionLabel: string;
    propertyLabel: string;
    dateLabel: string;
    windowLabel: string;
    fullNamePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    addressPlaceholder: string;
    notesPlaceholder: string;
    confirming: string;
    confirmPrefix: string;
    confirmSuffix: string;
    confirmedLabel: string;
    newBooking: string;
  };
  footer: {
    eyebrow: string;
    headingPrefix: string;
    headingSuffix: string;
    bookPrefix: string;
    liveActive: string;
    coveragePrefix: string;
    openInMaps: string;
    scheduleDispatch: string;
    copyrightPrefix: string;
    copyrightSuffix: string;
    navServices: string;
    navGallery: string;
    navTeam: string;
    navBook: string;
    backToTop: string;
    regionalHubTag: string;
    newsletterEyebrow: string;
    newsletterTitlePrefix: string;
    newsletterTitleEmphasis: string;
    newsletterTitleSuffix: string;
    newsletterDescription: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    newsletterSubmitting: string;
    newsletterSuccess: string;
    newsletterAlready: string;
    newsletterInvalid: string;
    pinFocus: string;
    allHubs: string;
  };
  widget: {
    aiChat: string;
    aiAssistant: string;
    deskSubtitle: string;
    openBooking: string;
    quickPromptPlaceholder: string;
    scanQr: string;
    hotlineSuffix: string;
  };
  faq: {
    eyebrow: string;
    headingPrefix: string;
    headingSuffix: string;
    subtitle: string;
    allCategories: string;
    categories: {
      compliance: string;
      operations: string;
      methodology: string;
    };
    ctaPrompt: string;
    ctaButton: string;
    items: Array<{
      id: string;
      category: 'compliance' | 'operations' | 'methodology';
      badge: string;
      question: string;
      answer: string;
    }>;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationPack> = {
  en: {
    langLabel: 'EN',
    nav: {
      regionalHubs: 'Regional Hubs:',
      dispatch247: '24/7 Dispatch',
      clientDispatch: 'Client Dispatch',
      homePage: 'HOME PAGE',
      servicesSolutions: 'Services & Solutions',
      all13Services: 'All 13 Trade & Engineering Services',
      engineeringSolutions: 'Engineering Services & Solutions',
      viewDirectory: 'View Directory',
      corporateHub: 'Corporate Hub',
      photosVideo: 'Photos & Video',
      clientsTeam: 'Clients & Team',
      globalOfficesMap: 'Global Offices & Map',
      searchPlaceholder: 'Search services, hubs...',
      searchModalPlaceholder: 'Search plumbing, HVAC, electrical, London, Germany, Dubai...',
      classicLight: 'Classic Light',
      midnight: 'Midnight',
      midnightTheme: 'Midnight Theme',
      bookService: 'BOOK SERVICE',
      liveNews: 'Live News',
      servicesHeading: 'Services',
      hubsHeading: 'Regional Hubs',
      mobileHome: 'Home',
      mobileServices: 'Services',
      mobileMedia: 'Media',
      mobileBook: 'Book',
      mobileMenuHome: 'Home Page',
      mobileMenuServices: 'All 13 Services',
      mobileMenuMedia: 'Photos & Video',
      mobileMenuTeam: 'Clients & Team',
      mobileMenuBook: 'Book Service',
      complianceLabel: 'Regional Compliance',
      regionCompliance: {
        london: {
          certs: ['NICEIC', 'CIBSE', 'SafeContractor', 'F-Gas'],
          summary: 'UK Electrical, HVAC Chiller & Statutory Safety Standards',
        },
        germany: {
          certs: ['TÜV', 'VDE 0105', 'DIN EN', 'DGUV V3'],
          summary: 'DACH Industrial Plant, Switchgear & Thermal QA',
        },
        dubai: {
          certs: ['DEWA', 'SIRA', 'DCD', 'ISO 41001'],
          summary: 'Dubai Grid, Civil Defense & Smart Security Approvals',
        },
      },
    },
    news: {
      ldnTag: 'LONDON HUB',
      ldnHeadline:
        '24/7 Chiller, HVAC & HV/LV switchgear mobile engineering expanded across City of London & Bishopsgate towers.',
      ldnCta: 'Book London',
      deTag: 'GERMANY OPS',
      deHeadline:
        'Munich & Frankfurt industrial portfolios complete winter thermal load-balancing & preventive electrical audits.',
      deCta: 'Book Germany',
      dxbTag: 'DUBAI HUB',
      dxbHeadline:
        'Turnkey Boulevard Plaza corporate fit-out, biometric access & optical security commissioned 6 days ahead of schedule.',
      dxbCta: 'Book Dubai',
      slaTag: 'GLOBAL UPDATE',
      slaHeadline:
        'Kelvix Solutions surpasses 1.8M+ sqm under integrated 13-trade facility management across UK, Germany & UAE.',
      slaCta: 'View Services',
    },
    regions: {
      london: 'London',
      germany: 'Germany',
      dubai: 'Dubai',
      londonFull: 'London (UK)',
      germanyFull: 'Germany (DE)',
      dubaiFull: 'Dubai (UAE)',
    },
    hero: {
      eyebrow: 'Kelvix Solutions · London · Germany · Dubai',
      headlinePrefix: 'Integrated Facility',
      headlineSuffix: 'Engineering Solutions.',
      bookService: 'Book Service',
      quickQuote: 'Quick Quote',
      londonSub: 'City of London & Bishopsgate Hub',
      germanySub: 'Frankfurt Financial District & Munich',
      dubaiSub: 'Downtown Dubai & Boulevard Plaza',
    },
    milestones: {
      eyebrow: 'Operational Scale',
      titlePrefix: 'Project Delivery Milestones',
      titleSuffix: 'Operational Workforce Scale',
      projectsDelivered: 'Projects Delivered',
      certifiedEngineers: 'Certified Workforce Engineers',
      managedFootprint: 'Managed Asset Footprint',
      slaCompliance: '24/7 SLA Compliance',
      methodologyLabel: 'Calculation Methodology',
      methodologies: {
        projectsDelivered: {
          title: 'ERP Closed-Work-Order Count',
          source: 'LDN · DEU · DXB Ledger',
          detail:
            'Calculated from formally commissioned and client-signed capital retrofits, turnkey fit-outs, and major MEP overhauls recorded in our tri-region ERP since 2016.',
        },
        certifiedEngineers: {
          title: 'Active Trade-Licensed Headcount',
          source: 'ISO 9001 · VDE · DEWA',
          detail:
            'Counts full-time employed specialists holding current regional compliance credentials (NICEIC, Gas Safe, VDE 0100, and Dubai Civil Defense / DEWA permits).',
        },
        managedFootprint: {
          title: 'Gross Internal Managed Area',
          source: 'CAFM Spatial Registry',
          detail:
            'Aggregated square meters across multi-year preventive maintenance contracts in commercial towers, cold-chain retail estates, and industrial campuses.',
        },
        slaCompliance: {
          title: 'Timestamped Dispatch Adherence',
          source: 'Rolling 12-Mo CMMS Audit',
          detail:
            'Percentage of priority callouts where GPS-verified engineer arrival and initial diagnostic stabilization occurred within the contracted 45–60 minute SLA window.',
        },
      },
    },
    pillars: {
      eyebrow: 'Integrated Facility Divisions',
      heading: 'Three Strategic Pillars Powering Asset Operations',
      subtitle:
        'Select an operational division to review technical capabilities, 13 specialist trades, and regional SLA coverage.',
      cards: [
        {
          badge: 'MEP & Critical Engineering',
          title: 'Hard MEP & HVAC Systems',
          description:
            'Precision commercial plumbing, HV/LV electrical switchgear, central chiller overhauls, and preventive mechanical care.',
          bullets: [
            'HVAC Chillers, VRF & Air Handling Units',
            'HV/LV Electrical & Thermal Diagnostics',
            '45–60 Min Priority Emergency SLA Dispatch',
          ],
          cta: 'Explore MEP Specifications',
        },
        {
          badge: 'Turnkey Build & Grounds',
          title: 'Construction, Fit-Out & Care',
          description:
            'Complete commercial build-outs, architectural painting, corporate hygiene, courtyard landscaping, and ISO pest proofing.',
          bullets: [
            'Commercial Construction & Interior Retrofits',
            'Architectural Coatings & Institutional Hygiene',
            'Landscaping & Preventive Pest Monitoring',
          ],
          cta: 'View All 13 Specialist Trades',
        },
        {
          badge: '24/7 Smart Infrastructure',
          title: 'Security, IT & Site Dispatch',
          description:
            'Enterprise structured fiber cabling, biometric access control, perimeter CCTV arrays, and unified multi-site SLA contracts.',
          bullets: [
            'Biometric Access & HD CCTV Integration',
            'Structured Fiber Cabling & Wi-Fi 7 Cores',
            'Direct London, Germany & Dubai Dispatch',
          ],
          cta: 'Schedule Site Dispatch',
        },
      ],
    },
    reviews: {
      eyebrowPrefix: 'Client Audits',
      ratingSuffix: '/5.0 Rating',
      headingPrefix: 'Trusted by Premier Asset Owners in London',
      headingSuffix: 'Germany',
      all: 'All',
      writeReview: 'Write Review',
      modalTitle: 'Write a Review',
      namePlaceholder: 'Your Name *',
      companyPlaceholder: 'Company',
      ratingLabel: 'Rating',
      experiencePlaceholder: 'Your experience *',
      publishing: 'Publishing...',
      publishReview: 'Publish Review',
      standardsEyebrow: 'Regional Standards & Engineering Associations',
      standardsUkDesc: 'UK Electrical & MEP Compliance',
      standardsDeDesc: 'DACH Industrial & Thermal QA',
      standardsUaeDesc: 'Dubai Grid, Civil Defense & Security',
      standardsIsoDesc: 'Quality, Facility & HSE Governance',
    },
    spotlight: {
      eyebrow: 'Client Success Spotlight · London & Germany',
      titlePrefix: 'Partner Video Reels',
      titleSuffix: 'Field Results',
      subtitle:
        'Verified engineering outcomes filmed with commercial retail and industrial asset leaders across London and Germany.',
      filterAll: 'All Reels',
      verifiedPartner: 'Verified Partner Clip',
      captionsOn: 'CC On',
      captionsOff: 'CC Off',
      playClip: 'Play Clip',
      pauseClip: 'Pause Clip',
      fullscreen: 'Fullscreen View',
      bookSimilar: 'Book Audit in',
      clipPlaylistLabel: 'Partner Clips',
    },
    partners: {
      eyebrow: 'Our Clients & Strategic Partners',
      headingPrefix: 'Long-term asset',
      headingSuffix: 'engineering alliances.',
    },
    services: {
      directoryEyebrow: 'Services Directory',
      directoryTitle: '13 Specialist Services',
      catAll: 'All 13',
      catEngineering: 'Engineering Services & Solutions',
      catVideoReels: 'Partner Video Reels & Field Results',
      catFaqs: 'FAQs & Compliance',
      catMep: 'MEP',
      catBuild: 'Build',
      catSecurityIt: 'Security & IT',
      catGrounds: 'Grounds',
      engineeringBanner: {
        eyebrow: 'Dedicated Engineering Division',
        title: 'Engineering Services & Solutions',
        description:
          'Integrated HVAC chillers, HV/LV switchgear, rotating mechanical plant rooms, commercial plumbing, and smart fiber/security engineering—backed by unified tri-region SLAs.',
        standardsChip: 'NICEIC · VDE 0105 · DEWA · ISO 50001',
        slaChip: '45–60 Min Critical Engineering Dispatch',
        bookCta: 'Schedule Engineering Dispatch',
      },
      selectUpTo3: 'Select up to 3 to compare specs',
      compareSpecs: 'Compare Specs',
      compare: 'Compare',
      comparing: 'Comparing',
      removeCompare: 'Remove Compare',
      standards: 'Standards',
      warranty: 'Warranty',
      bookPrefix: 'Book',
      sla: 'SLA',
      limitWarning:
        'You can compare up to 3 services side-by-side. Remove one selected service below to add another.',
      names: {
        plumbing: 'Plumbing',
        electrical: 'Electrical',
        hvac: 'HVAC',
        painting: 'Painting',
        construction: 'Construction',
        security: 'Security',
        cleaning: 'Cleaning',
        gardening: 'Gardening',
        'pest-control': 'Pest Control',
        mechanical: 'Mechanical',
        'electrical-maintenance': 'Electrical Maintenance',
        it: 'IT',
        maintenance: 'Maintenance',
      },
      categories: {
        'MEP & Technical': 'MEP & Technical',
        'Build & Finish': 'Build & Finish',
        'Security & IT': 'Security & IT',
        'Facility & Grounds': 'Facility & Grounds',
      },
    },
    comparison: {
      eyebrow: 'Side-by-Side Specification Matrix',
      heading: 'Compare Maintenance Services',
      subtitle:
        'Select up to 3 services from the grid above or slot selectors below to compare SLAs, certifications, and technical scope.',
      selectedOf3: 'Selected',
      top3Mep: 'Top 3 MEP',
      clearAll: 'Clear All',
      techParameter: 'Technical Parameter',
      compareUpTo3: 'Compare up to 3 services',
      slotLabel: 'Service Slot',
      addServicePlaceholder: '+ Add service...',
      rows: {
        discipline: 'Discipline',
        responseSla: 'Response SLA',
        dispatchTier: 'Dispatch Tier',
        emergencySupport: 'Emergency Support',
        certifications: 'Standards & Compliance',
        inspectionFrequency: 'Inspection Cadence',
        warrantyPeriod: 'Workmanship Warranty',
        coverageRegions: 'Regional Coverage',
        typicalDeliverables: 'Technical Scope',
        scheduleService: 'Schedule Service',
      },
      emptyState:
        'Select any 1 to 3 services from the directory cards or slot selectors above to inspect specifications side-by-side.',
    },
    quickQuote: {
      eyebrow: 'Instant Cost Estimator',
      title: 'Quick Preliminary Quote',
      guideEstimate: 'Preliminary Guide Estimate',
      targetSla: 'Target SLA',
      serviceDiscipline: 'Service Discipline',
      regionalHub: 'Regional Hub',
      facilityFootprint: 'Facility Footprint',
      tiers: {
        zone: { label: 'Single Zone', sublabel: '< 500 sqm' },
        floor: { label: 'Multi-Floor', sublabel: '500–2,500 sqm' },
        campus: { label: 'Campus / Portfolio', sublabel: '2,500+ sqm' },
      },
      namePlaceholder: 'Full Name *',
      emailPlaceholder: 'Work Email *',
      briefPlaceholder: 'Brief scope or site postcode (optional)',
      submitting: 'Calculating & Saving...',
      submit: 'Request Preliminary Estimate',
      loggedTitle: 'Preliminary Estimate Logged',
      labelService: 'Service',
      labelHub: 'Hub',
      labelScope: 'Scope Tier',
      labelEstimate: 'Estimated Range',
      followUpNote:
        'Our regional estimator desk will send an itemized breakdown to your email within 2 hours.',
      returnHome: 'Return to Home',
      scheduleDispatch: 'Schedule Site Dispatch',
    },
    media: {
      eyebrowPrefix: 'Project Portfolio',
      eyebrowSuffix: 'Field Reels',
      title: 'Operational Showcase',
      realPhotos: 'Real Photos',
      videos: 'Videos (4)',
    },
    clientsTeam: {
      clientsHeading: 'Global Clients.',
      teamHeading: 'Leadership.',
      clientsSub: '420+ managed commercial & residential properties.',
      teamSub: '180+ certified engineers across three regions.',
      clientsTab: 'Clients',
      teamTab: 'Team',
      book: 'Book',
    },
    booking: {
      heading: 'Book Dispatch.',
      subtitle: 'Select trade, hub, and arrival window.',
      serviceLabel: 'Service',
      regionLabel: 'Region',
      propertyLabel: 'Property',
      dateLabel: 'Date',
      windowLabel: 'Window',
      fullNamePlaceholder: 'Full Name *',
      phonePlaceholder: 'Phone *',
      emailPlaceholder: 'Email *',
      addressPlaceholder: 'Site Address *',
      notesPlaceholder: 'Optional scope notes',
      confirming: 'Confirming...',
      confirmPrefix: 'Confirm',
      confirmSuffix: 'Dispatch',
      confirmedLabel: 'Confirmed',
      newBooking: 'New Booking',
    },
    footer: {
      eyebrow: 'Global Operations Network',
      headingPrefix: 'Regional Headquarters',
      headingSuffix: 'Dispatch Map',
      bookPrefix: 'Book',
      liveActive: 'Live: Active',
      coveragePrefix: 'Coverage:',
      openInMaps: 'Open in Maps',
      scheduleDispatch: 'Schedule Dispatch',
      copyrightPrefix: 'Kelvix Solutions. Integrated Facility Management',
      copyrightSuffix: 'Engineering across UK, Germany & UAE.',
      navServices: '13 Services',
      navGallery: 'Project Gallery',
      navTeam: 'Clients & Team',
      navBook: 'Book Dispatch',
      backToTop: 'Back to top',
      regionalHubTag: 'Regional Hub',
      newsletterEyebrow: 'Monthly Technical Briefing',
      newsletterTitlePrefix: 'Maintenance',
      newsletterTitleEmphasis: 'Intelligence',
      newsletterTitleSuffix: 'Updates',
      newsletterDescription:
        'Discreet monthly insights on HVAC load efficiency, electrical compliance & seasonal asset care.',
      newsletterPlaceholder: 'work.email@company.com',
      newsletterButton: 'Subscribe',
      newsletterSubmitting: 'Saving...',
      newsletterSuccess: 'Subscribed to our monthly technical dispatch.',
      newsletterAlready: 'Your email is already on our monthly briefing list.',
      newsletterInvalid: 'Please enter a valid email address.',
      pinFocus: 'Pin Focus',
      allHubs: 'All Hubs',
    },
    widget: {
      aiChat: 'Kelvix AI Chat',
      aiAssistant: 'AI Assistant',
      deskSubtitle: 'Desk · Instant Booking Guidance',
      openBooking: 'Open Booking Form',
      quickPromptPlaceholder: 'Ask about HVAC, plumbing, SLA...',
      scanQr: 'Scan QR Code',
      hotlineSuffix: '24/7 Hotline',
    },
    faq: {
      eyebrow: 'Frequently Asked Questions',
      headingPrefix: 'MEP Compliance, Regional Ops',
      headingSuffix: 'Service Methodology',
      subtitle:
        'Direct engineering answers covering statutory certifications across London, Germany & Dubai, 24/7 SLA dispatch protocols, and preventive maintenance workflows.',
      allCategories: 'All Topics',
      categories: {
        compliance: 'MEP Compliance',
        operations: 'Regional Operations',
        methodology: 'Service Methodology',
      },
      ctaPrompt: 'Need site-specific compliance documentation or an SLA audit?',
      ctaButton: 'Book Engineering Consultation',
      items: [
        {
          id: 'faq-certs',
          category: 'compliance',
          badge: 'NICEIC · VDE · DEWA',
          question:
            'Which regional MEP and statutory compliance certifications do Kelvix engineers hold?',
          answer:
            'Every field engineer operates under region-specific statutory licenses: NICEIC, CIBSE, SafeContractor, Gas Safe, and F-Gas in London (UK); TÜV, VDE 0105, DIN EN, and DGUV V3 in Germany (DACH); and DEWA, SIRA, and Dubai Civil Defense (DCD) approvals in Dubai (UAE), all governed under ISO 9001, ISO 41001, and ISO 45001.',
        },
        {
          id: 'faq-audit-logs',
          category: 'compliance',
          badge: 'CAFM Audit Trail',
          question:
            'Do you issue digital test certificates and auditable compliance packs after each inspection?',
          answer:
            'Yes. Every preventive inspection or capital retrofit produces a timestamped digital handover dossier containing EICR electrical test sheets, VDE 0105 thermal/insulation logs, F-Gas refrigerant balance records, or DCD/DEWA safety sign-offs, synced directly to your CAFM portal.',
        },
        {
          id: 'faq-live-isolation',
          category: 'compliance',
          badge: 'Zero-Downtime LOTO',
          question:
            'How are HV/LV switchgear works and chiller overhauls completed without disrupting live commercial buildings?',
          answer:
            'Our lead engineers execute strict Lock-Out/Tag-Out (LOTO) and Permit-to-Work (PTW) procedures during scheduled out-of-hours windows, deploying temporary N+1 bypass cooling or standby power bridging so retail floors, trading desks, and critical tenants stay online.',
        },
        {
          id: 'faq-sla-speed',
          category: 'operations',
          badge: '45–60 Min SLA',
          question:
            'How fast can Kelvix dispatch certified mobile engineers across London, Germany, and Dubai?',
          answer:
            'Our strategically positioned mobile hubs in Bishopsgate (London), Frankfurt & Munich (Germany), and Downtown Boulevard Plaza (Dubai) deliver a contracted 45–60 minute priority emergency arrival SLA, backed by 24/7 tri-region dispatch control.',
        },
        {
          id: 'faq-multi-region',
          category: 'operations',
          badge: 'Unified Tri-Region MSA',
          question:
            'Can international asset owners manage UK, German, and UAE portfolios under one contract?',
          answer:
            'Yes. Multi-country landlords and retail groups consolidate all three regions under a single Master Service Agreement with unified SLA reporting, while retaining localized statutory compliance, bilingual engineering leads, and regional currency billing (GBP, EUR, AED).',
        },
        {
          id: 'faq-inhouse-workforce',
          category: 'operations',
          badge: '180+ Specialists',
          question:
            'Are field technicians directly employed by Kelvix Solutions or outsourced to brokers?',
          answer:
            'Kelvix Solutions maintains 180+ full-time, security-vetted, trade-licensed engineers and technicians across our three operating hubs. Specialized OEM chiller or elevator tasks are only executed alongside our directly supervising Regional Lead Engineer.',
        },
        {
          id: 'faq-milestone-math',
          category: 'methodology',
          badge: '99.4% Verified SLA',
          question:
            'How do you measure and audit your 99.4% SLA adherence and delivery milestones?',
          answer:
            'All operational KPIs are audited over a rolling 12-month CMMS window using GPS-verified engineer arrival timestamps, formal client sign-offs in our tri-region ERP since 2016 (1,400+ projects), and gross internal square meters registered in CAFM (1.8M+ sqm).',
        },
        {
          id: 'faq-ppm-workflow',
          category: 'methodology',
          badge: 'SFG20 & VDMA 24186',
          question:
            'What predictive diagnostics are included in your Preventive Maintenance (PPM) methodology?',
          answer:
            'We align maintenance calendars with SFG20 and VDMA 24186 benchmarks, combining infrared thermography on distribution boards, ultrasonic bearing vibration analysis, BMS telemetry alerts, and seasonal chilled-water chemical dosing to prevent failures before downtime occurs.',
        },
        {
          id: 'faq-warranty-qa',
          category: 'methodology',
          badge: '12–24 Mo Warranty',
          question:
            'What quality assurance sign-off and workmanship warranty cover completed projects?',
          answer:
            'Every completed MEP installation, build fit-out, or technical repair undergoes dual-stage sign-off by a Regional Lead Engineer before client handover and carries a 12 to 24-month workmanship warranty backed by full SLA remediation guarantees.',
        },
      ],
    },
  },

  de: {
    langLabel: 'DE',
    nav: {
      regionalHubs: 'Regionale Standorte:',
      dispatch247: '24/7 Einsatz',
      clientDispatch: 'Kundeneinsatz',
      homePage: 'STARTSEITE',
      servicesSolutions: 'Leistungen & Technik',
      all13Services: 'Alle 13 Fach- & Ingenieurdienste',
      engineeringSolutions: 'Engineering Services & Solutions',
      viewDirectory: 'Verzeichnis öffnen',
      corporateHub: 'Unternehmen',
      photosVideo: 'Fotos & Videos',
      clientsTeam: 'Kunden & Team',
      globalOfficesMap: 'Standorte & Karte',
      searchPlaceholder: 'Leistungen, Standorte...',
      searchModalPlaceholder: 'Sanitär, Kälte/Klima, Elektrik, London, Deutschland, Dubai...',
      classicLight: 'Hell',
      midnight: 'Mitternacht',
      midnightTheme: 'Dunkelmodus',
      bookService: 'TERMIN BUCHEN',
      liveNews: 'Live-Meldung',
      servicesHeading: 'Leistungen',
      hubsHeading: 'Standorte',
      mobileHome: 'Start',
      mobileServices: 'Dienste',
      mobileMedia: 'Medien',
      mobileBook: 'Buchen',
      mobileMenuHome: 'Startseite',
      mobileMenuServices: 'Alle 13 Dienste',
      mobileMenuMedia: 'Fotos & Videos',
      mobileMenuTeam: 'Kunden & Team',
      mobileMenuBook: 'Termin buchen',
      complianceLabel: 'Regionale Zertifizierung',
      regionCompliance: {
        london: {
          certs: ['NICEIC', 'CIBSE', 'SafeContractor', 'F-Gas'],
          summary: 'UK Elektro-, Kälte- und gesetzliche Sicherheitsnormen',
        },
        germany: {
          certs: ['TÜV', 'VDE 0105', 'DIN EN', 'DGUV V3'],
          summary: 'DACH Industrieanlagen-, Schaltanlagen- & Thermoprüfung',
        },
        dubai: {
          certs: ['DEWA', 'SIRA', 'DCD', 'ISO 41001'],
          summary: 'Dubai Netz-, Brandschutz- & Sicherheitszulassungen',
        },
      },
    },
    news: {
      ldnTag: 'LONDON HUB',
      ldnHeadline:
        '24/7 Kälte-, HLK- und Mittel-/Niederspannungs-Service in der City of London & Bishopsgate erweitert.',
      ldnCta: 'London buchen',
      deTag: 'DEUTSCHLAND',
      deHeadline:
        'Industrieportfolios in München & Frankfurt schließen thermische Lastausgleichs- und VDE-Prüfungen ab.',
      deCta: 'Deutschland buchen',
      dxbTag: 'DUBAI HUB',
      dxbHeadline:
        'Schlüsselfertiger Ausbau, Biometrie-Zutritt & Sicherheitstechnik am Boulevard Plaza 6 Tage früher übergeben.',
      dxbCta: 'Dubai buchen',
      slaTag: 'GLOBALES UPDATE',
      slaHeadline:
        'Kelvix Solutions betreut über 1,8 Mio. m² im integrierten 13-Gewerke-Facility-Management in UK, DE & VAE.',
      slaCta: 'Leistungen ansehen',
    },
    regions: {
      london: 'London',
      germany: 'Deutschland',
      dubai: 'Dubai',
      londonFull: 'London (UK)',
      germanyFull: 'Deutschland (DE)',
      dubaiFull: 'Dubai (VAE)',
    },
    hero: {
      eyebrow: 'Kelvix Solutions · London · Deutschland · Dubai',
      headlinePrefix: 'Integrierte Facility-',
      headlineSuffix: 'Engineering-Lösungen.',
      bookService: 'Termin buchen',
      quickQuote: 'Schnellangebot',
      londonSub: 'City of London & Bishopsgate Zentrum',
      germanySub: 'Finanzviertel Frankfurt & München',
      dubaiSub: 'Downtown Dubai & Boulevard Plaza',
    },
    milestones: {
      eyebrow: 'Operative Leistungskraft',
      titlePrefix: 'Projekt-Meilensteine',
      titleSuffix: 'Personalkapazität im Einsatz',
      projectsDelivered: 'Abgeschlossene Projekte',
      certifiedEngineers: 'Zertifizierte Fachingenieure',
      managedFootprint: 'Betreute Gebäudefläche',
      slaCompliance: '24/7 SLA-Verfügbarkeit',
      methodologyLabel: 'Berechnungsmethodik',
      methodologies: {
        projectsDelivered: {
          title: 'ERP-Abnahmeregister',
          source: 'LDN · DEU · DXB Buchung',
          detail:
            'Erfasst ausschließlich abgenommene, vom Kunden unterzeichnete Ausbau-, Sanierungs- und TGA-Großprojekte in unserem Drei-Regionen-ERP seit 2016.',
        },
        certifiedEngineers: {
          title: 'Aktive Fachkräfte mit Zulassung',
          source: 'ISO 9001 · VDE · DEWA',
          detail:
            'Zählt festangestellte Ingenieure und Techniker mit gültigen regionalen Zertifikaten (VDE 0100, NICEIC, Gas Safe sowie DEWA-/Zivilschutz-Zulassungen).',
        },
        managedFootprint: {
          title: 'Brutto-Grundfläche im Bestand',
          source: 'CAFM-Flächenkataster',
          detail:
            'Summierte Quadratmeter aller laufenden Mehrjahres-Wartungsverträge für Bürohochhäuser, Einzelhandelsmärkte und Industriestandorte.',
        },
        slaCompliance: {
          title: 'Zeitstempel-SLA-Auswertung',
          source: '12-Monats-CMMS-Audit',
          detail:
            'Anteil aller Prioritätseinsätze, bei denen Ankunft per GPS-Zeitstempel und Erststabilisierung innerhalb des vertraglichen 45–60-Min.-SLA erfolgten.',
        },
      },
    },
    pillars: {
      eyebrow: 'Integrierte Fachbereiche',
      heading: 'Drei strategische Säulen für den Anlagenbetrieb',
      subtitle:
        'Wählen Sie einen Fachbereich, um technische Spezifikationen, 13 Gewerke und regionale SLAs einzusehen.',
      cards: [
        {
          badge: 'TGA & Kritische Technik',
          title: 'Technische Gebäudeausrüstung',
          description:
            'Gewerbliche Sanitärtechnik, Mittel-/Niederspannungsschaltanlagen, Kältemaschinen und vorbeugende Mechanik.',
          bullets: [
            'Kälteanlagen, VRF- & Lüftungszentralen',
            'Elektrotechnik & Thermografie-Diagnose',
            '45–60 Min. Notdienst-SLA vor Ort',
          ],
          cta: 'TGA-Spezifikationen prüfen',
        },
        {
          badge: 'Ausbau & Außenanlagen',
          title: 'Bau, Innenausbau & Pflege',
          description:
            'Schlüsselfertiger Innenausbau, Architekturbeschichtungen, Gebäudereinigung, Grünflächenpflege & Schädlingsprävention.',
          bullets: [
            'Gewerblicher Ausbau & Umbau im Bestand',
            'Fassadenanstriche & Objekthygiene',
            'Landschaftspflege & digitales Monitoring',
          ],
          cta: 'Alle 13 Fachgewerke ansehen',
        },
        {
          badge: '24/7 Smart Infrastructure',
          title: 'Sicherheit, IT & Einsatzleitung',
          description:
            'Strukturierte Glasfasernetze, biometrische Zutrittskontrolle, Perimeterschutz und zentrale SLA-Verträge.',
          bullets: [
            'Biometrische Zutrittssysteme & HD-CCTV',
            'Glasfaser-Backbone & Wi-Fi-7-Infrastruktur',
            'Direkteinsätze in London, DE & Dubai',
          ],
          cta: 'Einsatz direkt planen',
        },
      ],
    },
    reviews: {
      eyebrowPrefix: 'Kundenbewertungen',
      ratingSuffix: '/5,0 Bewertung',
      headingPrefix: 'Vertraut von Immobilieninhabern in London',
      headingSuffix: 'Deutschland',
      all: 'Alle',
      writeReview: 'Bewerten',
      modalTitle: 'Bewertung schreiben',
      namePlaceholder: 'Ihr Name *',
      companyPlaceholder: 'Unternehmen',
      ratingLabel: 'Bewertung',
      experiencePlaceholder: 'Ihre Erfahrung *',
      publishing: 'Wird veröffentlicht...',
      publishReview: 'Bewertung senden',
      standardsEyebrow: 'Regionale Normen & Fachverbände',
      standardsUkDesc: 'UK Elektro- & TGA-Zulassung',
      standardsDeDesc: 'DACH Industrie- & Thermoprüfung',
      standardsUaeDesc: 'Dubai Netz-, Brandschutz- & Sicherheitscode',
      standardsIsoDesc: 'Qualitäts-, FM- & Arbeitsschutz-Governance',
    },
    spotlight: {
      eyebrow: 'Client Success Spotlight · London & Deutschland',
      titlePrefix: 'Partner-Videoreferenzen',
      titleSuffix: 'Praxisergebnisse',
      subtitle:
        'Verifizierte Projektergebnisse mit Handels- und Industriekunden an den Standorten London, München und Frankfurt.',
      filterAll: 'Alle Clips',
      verifiedPartner: 'Verifizierter Partner-Clip',
      captionsOn: 'Untertitel An',
      captionsOff: 'Untertitel Aus',
      playClip: 'Abspielen',
      pauseClip: 'Pause',
      fullscreen: 'Vollbild',
      bookSimilar: 'Audit buchen in',
      clipPlaylistLabel: 'Partner-Videos',
    },
    partners: {
      eyebrow: 'Kunden & Strategische Partner',
      headingPrefix: 'Langfristige Anlagen-',
      headingSuffix: 'Engineering-Allianzen.',
    },
    services: {
      directoryEyebrow: 'Leistungsverzeichnis',
      directoryTitle: '13 Fachdienstleistungen',
      catAll: 'Alle 13',
      catEngineering: 'Engineering Services & Solutions',
      catVideoReels: 'Partner Video Reels & Praxisergebnisse',
      catFaqs: 'FAQ & Compliance',
      catMep: 'TGA / MEP',
      catBuild: 'Bau & Ausbau',
      catSecurityIt: 'Sicherheit & IT',
      catGrounds: 'Objektpflege',
      engineeringBanner: {
        eyebrow: 'Spezialabteilung Ingenieurtechnik',
        title: 'Engineering Services & Solutions',
        description:
          'Integrierte Kälte- und Klimatechnik, Mittel-/Niederspannungsnetze, rotierende Anlagen, gewerbliche Sanitärtechnik sowie Glasfaser- und Sicherheits-Engineering.',
        standardsChip: 'NICEIC · VDE 0105 · DEWA · ISO 50001',
        slaChip: '45–60 Min. Notdienst-SLA',
        bookCta: 'Ingenieureinsatz planen',
      },
      selectUpTo3: 'Bis zu 3 Dienste vergleichen',
      compareSpecs: 'Daten vergleichen',
      compare: 'Vergleichen',
      comparing: 'Gewählt',
      removeCompare: 'Entfernen',
      standards: 'Normen',
      warranty: 'Gewährleistung',
      bookPrefix: 'Buchen:',
      sla: 'SLA',
      limitWarning:
        'Maximal 3 Leistungen gleichzeitig vergleichbar. Entfernen Sie unten eine Auswahl, um eine neue hinzuzufügen.',
      names: {
        plumbing: 'Sanitärtechnik',
        electrical: 'Elektrotechnik',
        hvac: 'HLK / Klima',
        painting: 'Malerarbeiten',
        construction: 'Hoch- & Ausbau',
        security: 'Sicherheitstechnik',
        cleaning: 'Gebäudereinigung',
        gardening: 'Garten- & Landschaft',
        'pest-control': 'Schädlingsbekämpfung',
        mechanical: 'Maschinenbau',
        'electrical-maintenance': 'Elektrowartung',
        it: 'IT-Infrastruktur',
        maintenance: 'Gebäudewartung',
      },
      categories: {
        'MEP & Technical': 'TGA & Technik',
        'Build & Finish': 'Bau & Ausbau',
        'Security & IT': 'Sicherheit & IT',
        'Facility & Grounds': 'Service & Gelände',
      },
    },
    comparison: {
      eyebrow: 'Technischer Leistungsvergleich',
      heading: 'Wartungsleistungen vergleichen',
      subtitle:
        'Wählen Sie bis zu 3 Leistungen oben oder über die Spalten-Menüs aus, um SLAs, Normen und Leistungsumfang direkt zu vergleichen.',
      selectedOf3: 'Gewählt',
      top3Mep: 'Top 3 TGA',
      clearAll: 'Zurücksetzen',
      techParameter: 'Technischer Parameter',
      compareUpTo3: 'Bis zu 3 Dienste',
      slotLabel: 'Auswahlplatz',
      addServicePlaceholder: '+ Leistung wählen...',
      rows: {
        discipline: 'Fachbereich',
        responseSla: 'Reaktionszeit (SLA)',
        dispatchTier: 'Einsatzstufe',
        emergencySupport: 'Notfallbereitschaft',
        certifications: 'Normen & Zertifikate',
        inspectionFrequency: 'Prüfintervall',
        warrantyPeriod: 'Gewährleistung',
        coverageRegions: 'Einsatzregionen',
        typicalDeliverables: 'Technischer Umfang',
        scheduleService: 'Leistung buchen',
      },
      emptyState:
        'Wählen Sie 1 bis 3 Leistungen aus den Karten oder Spalten-Menüs oben aus, um technische Daten zu vergleichen.',
    },
    quickQuote: {
      eyebrow: 'Sofortige Kostenschätzung',
      title: 'Schnelles Richtpreis-Angebot',
      guideEstimate: 'Vorläufige Kostenschätzung',
      targetSla: 'Ziel-SLA',
      serviceDiscipline: 'Fachbereich',
      regionalHub: 'Standort',
      facilityFootprint: 'Objektgröße',
      tiers: {
        zone: { label: 'Einzelzone', sublabel: '< 500 m²' },
        floor: { label: 'Mehretagen', sublabel: '500–2.500 m²' },
        campus: { label: 'Campus / Portfolio', sublabel: '2.500+ m²' },
      },
      namePlaceholder: 'Vollständiger Name *',
      emailPlaceholder: 'Geschäftliche E-Mail *',
      briefPlaceholder: 'Kurzbeschreibung oder PLZ (optional)',
      submitting: 'Wird berechnet...',
      submit: 'Vorläufiges Angebot anfordern',
      loggedTitle: 'Anfrage registriert',
      labelService: 'Leistung',
      labelHub: 'Standort',
      labelScope: 'Objektgröße',
      labelEstimate: 'Richtpreis-Spanne',
      followUpNote:
        'Unser Kalkulationsteam sendet Ihnen innerhalb von 2 Stunden eine detaillierte Aufstellung per E-Mail.',
      returnHome: 'Zur Startseite',
      scheduleDispatch: 'Einsatz direkt buchen',
    },
    media: {
      eyebrowPrefix: 'Projektportfolio',
      eyebrowSuffix: 'Einsatzfilme',
      title: 'Operative Referenzen',
      realPhotos: 'Projektfotos',
      videos: 'Videos (4)',
    },
    clientsTeam: {
      clientsHeading: 'Globale Kunden.',
      teamHeading: 'Führungsteam.',
      clientsSub: '420+ betreute Gewerbe- und Wohnimmobilien.',
      teamSub: '180+ zertifizierte Ingenieure in drei Regionen.',
      clientsTab: 'Kunden',
      teamTab: 'Team',
      book: 'Buchen',
    },
    booking: {
      heading: 'Einsatz buchen.',
      subtitle: 'Gewerk, Standort und Zeitfenster wählen.',
      serviceLabel: 'Leistung',
      regionLabel: 'Region',
      propertyLabel: 'Objekttyp',
      dateLabel: 'Datum',
      windowLabel: 'Zeitfenster',
      fullNamePlaceholder: 'Vollständiger Name *',
      phonePlaceholder: 'Telefon *',
      emailPlaceholder: 'E-Mail *',
      addressPlaceholder: 'Einsatzadresse *',
      notesPlaceholder: 'Optionale Hinweise',
      confirming: 'Wird bestätigt...',
      confirmPrefix: 'Buchen:',
      confirmSuffix: 'Einsatz bestätigen',
      confirmedLabel: 'Bestätigt',
      newBooking: 'Neue Buchung',
    },
    footer: {
      eyebrow: 'Globales Einsatznetzwerk',
      headingPrefix: 'Regionale Zentralen',
      headingSuffix: 'Einsatzkarte',
      bookPrefix: 'Buchen:',
      liveActive: 'Live: Aktiv',
      coveragePrefix: 'Gebiet:',
      openInMaps: 'In Maps öffnen',
      scheduleDispatch: 'Einsatz planen',
      copyrightPrefix: 'Kelvix Solutions. Integriertes Facility Management',
      copyrightSuffix: 'Engineering in UK, Deutschland & VAE.',
      navServices: '13 Leistungen',
      navGallery: 'Projektgalerie',
      navTeam: 'Kunden & Team',
      navBook: 'Einsatz buchen',
      backToTop: 'Nach oben',
      regionalHubTag: 'Regionales Zentrum',
      newsletterEyebrow: 'Monatliches Fachbriefing',
      newsletterTitlePrefix: 'Wartungs-',
      newsletterTitleEmphasis: 'Intelligenz',
      newsletterTitleSuffix: 'Praxis-Updates',
      newsletterDescription:
        'Kompakte monatliche Hinweise zu HLK-Effizienz, VDE-Prüfungen & saisonaler Gebäudeinstandhaltung.',
      newsletterPlaceholder: 'ihre.adresse@unternehmen.de',
      newsletterButton: 'Abonnieren',
      newsletterSubmitting: 'Wird gespeichert...',
      newsletterSuccess: 'Für unser monatliches Fachbriefing registriert.',
      newsletterAlready: 'Diese Adresse erhält bereits unser monatliches Briefing.',
      newsletterInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      pinFocus: 'Standort-Fokus',
      allHubs: 'Alle Standorte',
    },
    widget: {
      aiChat: 'Kelvix KI-Chat',
      aiAssistant: 'KI-Assistent',
      deskSubtitle: 'Leitstelle · Sofortige Buchungshilfe',
      openBooking: 'Buchungsformular öffnen',
      quickPromptPlaceholder: 'Fragen zu HLK, Sanitär, SLA...',
      scanQr: 'QR-Code scannen',
      hotlineSuffix: '24/7 Notruf',
    },
    faq: {
      eyebrow: 'Häufig gestellte Fragen',
      headingPrefix: 'TGA-Compliance, Regionalbetrieb',
      headingSuffix: 'Service-Methodik',
      subtitle:
        'Klare technische Antworten zu gesetzlichen Zulassungen in London, Deutschland & Dubai, unseren 24/7-Einsatzzeiten und der vorausschauenden Wartungsmethodik.',
      allCategories: 'Alle Themen',
      categories: {
        compliance: 'TGA-Compliance',
        operations: 'Regionalbetrieb',
        methodology: 'Service-Methodik',
      },
      ctaPrompt: 'Benötigen Sie standortspezifische Nachweise oder ein SLA-Audit?',
      ctaButton: 'Ingenieurberatung buchen',
      items: [
        {
          id: 'faq-certs',
          category: 'compliance',
          badge: 'NICEIC · VDE · DEWA',
          question:
            'Über welche regionalen TGA- und Sicherheitszertifizierungen verfügen Ihre Ingenieure?',
          answer:
            'Jeder Techniker arbeitet mit gültigen Landeslizenzen: NICEIC, CIBSE, SafeContractor und F-Gas in London (UK); TÜV, VDE 0105, DIN EN und DGUV V3 in Deutschland (DACH); sowie DEWA-, SIRA- und DCD-Zulassungen in Dubai (VAE) – gesteuert nach ISO 9001, 41001 und 45001.',
        },
        {
          id: 'faq-audit-logs',
          category: 'compliance',
          badge: 'CAFM-Prüfpfad',
          question:
            'Erhalten wir nach jeder Wartung revisionssichere Prüfprotokolle und Zertifikate?',
          answer:
            'Ja. Jede Prüfung erzeugt ein digitales Übergabeprotokoll mit Zeitstempel – inklusive DGUV V3 / VDE 0105-Messwerten, Thermografie-Aufnahmen, Kältemittel-Logbüchern und DEWA-/UK-Compliance-Nachweisen direkt in Ihrem CAFM-Portal.',
        },
        {
          id: 'faq-live-isolation',
          category: 'compliance',
          badge: 'Unterbrechungsfreies LOTO',
          question:
            'Wie werden Schaltanlagen- und Kältearbeiten im laufenden Gebäudebetrieb durchgeführt?',
          answer:
            'Unsere leitenden Ingenieure arbeiten nach strengen LOTO- und Freigabeprozessen außerhalb der Geschäftszeiten und setzen bei Bedarf redundante N+1-Notkühlung oder Notstrombrücken ein.',
        },
        {
          id: 'faq-sla-speed',
          category: 'operations',
          badge: '45–60 Min. SLA',
          question:
            'Wie schnell sind Ihre 24/7-Einsatzteams in London, Deutschland und Dubai vor Ort?',
          answer:
            'Unsere Standorte in London-Bishopsgate, Frankfurt & München sowie Downtown Dubai garantieren vertraglich eine Notfall-Ankunftszeit von 45–60 Minuten rund um die Uhr.',
        },
        {
          id: 'faq-multi-region',
          category: 'operations',
          badge: 'Drei-Regionen-Rahmenvertrag',
          question:
            'Können internationale Bestandshalter UK, Deutschland und die VAE über einen Vertrag steuern?',
          answer:
            'Ja. Über einen einheitlichen Master Service Agreement erhalten Sie konsolidierte KPI-Reports bei vollständiger lokaler Normerfüllung und Abrechnung in GBP, EUR oder AED.',
        },
        {
          id: 'faq-inhouse-workforce',
          category: 'operations',
          badge: '180+ Festangestellte',
          question:
            'Setzt Kelvix eigenes Fachpersonal ein oder wird an Subunternehmer vermittelt?',
          answer:
            'Wir beschäftigen über 180 festangestellte, sicherheitsgeprüfte Fachingenieure und Monteure. Spezialisierte OEM-Arbeiten erfolgen stets unter direkter Bauleitung unserer regionalen Chefingenieure.',
        },
        {
          id: 'faq-milestone-math',
          category: 'methodology',
          badge: '99,4 % Verifizierter SLA',
          question:
            'Wie werden die 99,4 % SLA-Einhaltung und die Projekt-Meilensteine genau berechnet?',
          answer:
            'Alle Kennzahlen basieren auf einem rollierenden 12-Monats-CMMS-Audit mit GPS-Ankunftsstempeln, abgenommenen ERP-Projekten seit 2016 (1.400+) und im CAFM registrierten Bruttoflächen (1,8 Mio.+ m²).',
        },
        {
          id: 'faq-ppm-workflow',
          category: 'methodology',
          badge: 'VDMA 24186 & SFG20',
          question:
            'Welche vorausschauenden Diagnosen umfasst Ihre präventive Wartungsmethodik?',
          answer:
            'Wir kombinieren Wartungspläne nach VDMA 24186 und SFG20 mit Infrarot-Thermografie an Verteilern, Schwingungsmessung an Lagern, GLT-Telemetrie und Kältewasser-Analytik zur Ausfallvermeidung.',
        },
        {
          id: 'faq-warranty-qa',
          category: 'methodology',
          badge: '12–24 Mon. Gewährleistung',
          question:
            'Welche Qualitätsabnahme und Gewährleistung gelten für ausgeführte Arbeiten?',
          answer:
            'Jede Maßnahme durchläuft eine zweistufige Prüfung durch einen Regional Lead Engineer vor Kundenabnahme und beinhaltet 12 bis 24 Monate Gewährleistung.',
        },
      ],
    },
  },

  ar: {
    langLabel: 'عربي',
    nav: {
      regionalHubs: 'المراكز الإقليمية:',
      dispatch247: 'استجابة 24/7',
      clientDispatch: 'طلب فوري',
      homePage: 'الرئيسية',
      servicesSolutions: 'الخدمات والحلول',
      all13Services: 'جميع الخدمات الهندسية الـ 13',
      engineeringSolutions: 'الخدمات والحلول الهندسية',
      viewDirectory: 'عرض الدليل',
      corporateHub: 'المجموعة',
      photosVideo: 'الصور والفيديو',
      clientsTeam: 'العملاء والفريق',
      globalOfficesMap: 'المكاتب والخريطة',
      searchPlaceholder: 'ابحث عن خدمة أو مركز...',
      searchModalPlaceholder: 'ابحث عن التكييف، الكهرباء، السباكة، لندن، ألمانيا، دبي...',
      classicLight: 'النهاري',
      midnight: 'الليلي',
      midnightTheme: 'الوضع الليلي',
      bookService: 'احجز خدمة',
      liveNews: 'أخبار مباشرة',
      servicesHeading: 'الخدمات',
      hubsHeading: 'المراكز الإقليمية',
      mobileHome: 'الرئيسية',
      mobileServices: 'الخدمات',
      mobileMedia: 'الوسائط',
      mobileBook: 'احجز',
      mobileMenuHome: 'الصفحة الرئيسية',
      mobileMenuServices: 'جميع الخدمات (13)',
      mobileMenuMedia: 'الصور والفيديو',
      mobileMenuTeam: 'العملاء والفريق',
      mobileMenuBook: 'حجز خدمة',
      complianceLabel: 'الاعتمادات الإقليمية',
      regionCompliance: {
        london: {
          certs: ['NICEIC', 'CIBSE', 'SafeContractor', 'F-Gas'],
          summary: 'معايير الكهرباء والتبريد والسلامة المعتمدة في المملكة المتحدة',
        },
        germany: {
          certs: ['TÜV', 'VDE 0105', 'DIN EN', 'DGUV V3'],
          summary: 'معايير المنشآت الصناعية والفحص الحراري بألمانيا',
        },
        dubai: {
          certs: ['DEWA', 'SIRA', 'DCD', 'ISO 41001'],
          summary: 'اعتمادات ديوا والدفاع المدني والأمن الذكي بدبي',
        },
      },
    },
    news: {
      ldnTag: 'مركز لندن',
      ldnHeadline:
        'توسيع فرق الصيانة الميدانية للتبريد والتكييف والجهد العالي والمنخفض على مدار الساعة في مدينة لندن.',
      ldnCta: 'احجز في لندن',
      deTag: 'عمليات ألمانيا',
      deHeadline:
        'إتمام اختبارات التوازن الحراري والتدقيق الكهربائي الوقائي لمحافظ المنشآت الصناعية في ميونخ وفرانكفورت.',
      deCta: 'احجز في ألمانيا',
      dxbTag: 'مركز دبي',
      dxbHeadline:
        'تسليم مشروع التجهيز الكامل وأنظمة الدخول البيومترية والأمن الذكي في بوليفارد بلازا دبي قبل الموعد بـ 6 أيام.',
      dxbCta: 'احجز في دبي',
      slaTag: 'تحديث عالمي',
      slaHeadline:
        'كيلفكس سوليوشنز تتجاوز 1.8 مليون متر مربع تحت إدارة المرافق المتكاملة في المملكة المتحدة وألمانيا والإمارات.',
      slaCta: 'عرض الخدمات',
    },
    regions: {
      london: 'لندن',
      germany: 'ألمانيا',
      dubai: 'دبي',
      londonFull: 'لندن (المملكة المتحدة)',
      germanyFull: 'ألمانيا (DE)',
      dubaiFull: 'دبي (الإمارات)',
    },
    hero: {
      eyebrow: 'كيلفكس سوليوشنز · لندن · ألمانيا · دبي',
      headlinePrefix: 'حلول متكاملة لإدارة المرافق',
      headlineSuffix: 'والهندسة الفنية.',
      bookService: 'احجز خدمة',
      quickQuote: 'عرض سعر سريع',
      londonSub: 'مركز مدينة لندن وبيشوبس غيت',
      germanySub: 'الحي المالي فرانكفورت وميونخ',
      dubaiSub: 'وسط مدينة دبي وبوليفارد بلازا',
    },
    milestones: {
      eyebrow: 'النطاق التشغيلي',
      titlePrefix: 'إنجازات تسليم المشاريع',
      titleSuffix: 'قدرات الكوادر الهندسية',
      projectsDelivered: 'مشروعاً منجزاً',
      certifiedEngineers: 'مهندساً وفنياً معتمداً',
      managedFootprint: 'مساحة أصول مُدارة',
      slaCompliance: 'الالتزام بالاستجابة 24/7',
      methodologyLabel: 'منهجية الاحتساب',
      methodologies: {
        projectsDelivered: {
          title: 'سجل المشاريع المعتمدة في ERP',
          source: 'لندن · ألمانيا · دبي',
          detail:
            'يُحتسب من المشاريع الهندسية والتجهيزات الكاملة وأعمال التحديث المعتمدة والموقعة رسمياً من العملاء في نظام ERP الإقليمي منذ عام 2016.',
        },
        certifiedEngineers: {
          title: 'الكادر الهندسي المرخص فعلياً',
          source: 'ISO 9001 · VDE · DEWA',
          detail:
            'يشمل المهندسين والفنيين المتفرغين الحاصلين على اعتمادات سارية (DEWA والدفاع المدني بدبي، VDE 0100 بألمانيا، وNICEIC ببريطانيا).',
        },
        managedFootprint: {
          title: 'إجمالي المساحة الداخلية المُدارة',
          source: 'سجل المساحات CAFM',
          detail:
            'مجموع الأمتار المربعة المشمولة بعقود الصيانة الوقائية متعددة السنوات للأبراج التجارية ومتاجر التجزئة والمجمعات الصناعية.',
        },
        slaCompliance: {
          title: 'دقة الالتزام بمواعيد الاستجابة',
          source: 'تدقيق CMMS لآخر 12 شهراً',
          detail:
            'نسبة البلاغات الطارئة التي تم فيها وصول الفريق الميداني الموثق عبر GPS والبدء بالمعالجة ضمن نافذة الـ 45–60 دقيقة التعاقدية.',
        },
      },
    },
    pillars: {
      eyebrow: 'أقسام إدارة المرافق المتكاملة',
      heading: 'ثلاث ركائز استراتيجية لتشغيل الأصول بكفاءة',
      subtitle:
        'اختر قسماً تشغيلياً لاستعراض القدرات الفنية، والخدمات التخصصية الـ 13، وتغطية اتفاقيات مستوى الخدمة.',
      cards: [
        {
          badge: 'الأنظمة الكهروميكانيكية',
          title: 'أنظمة MEP والتكييف المركزي',
          description:
            'السباكة التجارية، لوحات الجهد العالي والمنخفض، صيانة المبردات المركزية، والأنظمة الميكانيكية الوقائية.',
          bullets: [
            'مبردات التكييف ووحدات مناولة الهواء VRF',
            'الفحص الحراري وأنظمة الجهد الكهربائي',
            'استجابة طوارئ خلال 45–60 دقيقة',
          ],
          cta: 'استكشف مواصفات MEP',
        },
        {
          badge: 'الإنشاءات والتجهيز والعناية',
          title: 'البناء والتشطيبات والعناية بالمرافق',
          description:
            'تنفيذ الأعمال الإنشائية، الدهانات المعمارية، النظافة المؤسسية، تنسيق الحدائق، ومكافحة الآفات وفق معايير ISO.',
          bullets: [
            'أعمال البناء والتجديد الداخلي للمكاتب',
            'الدهانات المعمارية والتعقيم المؤسسي',
            'تنسيق المواقع والمراقبة الوقائية للآفات',
          ],
          cta: 'عرض جميع الخدمات الـ 13',
        },
        {
          badge: 'البنية الذكية والأمن',
          title: 'الأمن وتقنية المعلومات والفرق الميدانية',
          description:
            'تمديد شبكات الألياف الضوئية، أنظمة الدخول البيومترية، كاميرات المراقبة، وعقود الصيانة متعددة المواقع.',
          bullets: [
            'التحكم البيومتري بالدخول وكاميرات HD',
            'شبكات الألياف البصرية و Wi-Fi 7',
            'فرق ميدانية مباشرة في لندن وألمانيا ودبي',
          ],
          cta: 'جدولة زيارة ميدانية',
        },
      ],
    },
    reviews: {
      eyebrowPrefix: 'تقييمات العملاء',
      ratingSuffix: '/5.0 التقييم',
      headingPrefix: 'موثوق من كبار ملاك الأصول في لندن',
      headingSuffix: 'ألمانيا ودبي',
      all: 'الكل',
      writeReview: 'أضف تقييماً',
      modalTitle: 'كتابة تقييم',
      namePlaceholder: 'الاسم الكامل *',
      companyPlaceholder: 'الشركة / المؤسسة',
      ratingLabel: 'التقييم',
      experiencePlaceholder: 'شاركنا تجربتك *',
      publishing: 'جارٍ النشر...',
      publishReview: 'نشر التقييم',
      standardsEyebrow: 'المعايير الإقليمية والهيئات الهندسية المعتمدة',
      standardsUkDesc: 'اعتماد الكهرباء والأنظمة الميكانيكية ببريطانيا',
      standardsDeDesc: 'تدقيق الصناعة والطاقة الحرارية بألمانيا',
      standardsUaeDesc: 'اعتمادات ديوا والدفاع المدني وأمن دبي',
      standardsIsoDesc: 'حوكمة الجودة وإدارة المرافق والسلامة',
    },
    spotlight: {
      eyebrow: 'قصص نجاح العملاء · لندن وألمانيا',
      titlePrefix: 'شهادات الشركاء المرئية',
      titleSuffix: 'نتائج ميدانية',
      subtitle:
        'مقاطع فيديو موثقة لشركاء العقارات والتجزئة والصناعة في لندن وألمانيا تستعرض كفاءة التشغيل والتسليم.',
      filterAll: 'جميع المقاطع',
      verifiedPartner: 'مقطع شريك موثق',
      captionsOn: 'الترجمة مفعلة',
      captionsOff: 'الترجمة متوقفة',
      playClip: 'تشغيل',
      pauseClip: 'إيقاف مؤقت',
      fullscreen: 'ملء الشاشة',
      bookSimilar: 'احجز تقييماً في',
      clipPlaylistLabel: 'قائمة المقاطع',
    },
    partners: {
      eyebrow: 'عملاؤنا وشركاؤنا الاستراتيجيون',
      headingPrefix: 'شراكات هندسية',
      headingSuffix: 'طويلة الأمد لإدارة الأصول.',
    },
    services: {
      directoryEyebrow: 'دليل الخدمات',
      directoryTitle: '13 خدمة هندسية وفنية متخصصة',
      catAll: 'الكل (13)',
      catEngineering: 'الخدمات والحلول الهندسية',
      catVideoReels: 'فيديوهات الشركاء والنتائج الميدانية',
      catFaqs: 'الأسئلة الشائعة والامتثال',
      catMep: 'الكهروميكانيك',
      catBuild: 'الإنشاءات',
      catSecurityIt: 'الأمن والتقنية',
      catGrounds: 'المرافق والحدائق',
      engineeringBanner: {
        eyebrow: 'قسم الهندسة المتخصصة',
        title: 'الخدمات والحلول الهندسية',
        description:
          'حلول متكاملة لمبردات التكييف، شبكات الجهد العالي والمنخفض، غرف المضخات والآلات الميكانيكية، السباكة التجارية، والألياف الضوئية والأنظمة الأمنية.',
        standardsChip: 'NICEIC · VDE 0105 · DEWA · ISO 50001',
        slaChip: 'استجابة هندسية طارئة خلال 45–60 دقيقة',
        bookCta: 'جدولة فريق هندسي',
      },
      selectUpTo3: 'اختر حتى 3 خدمات للمقارنة',
      compareSpecs: 'مقارنة المواصفات',
      compare: 'قارن',
      comparing: 'محددة',
      removeCompare: 'إزالة من المقارنة',
      standards: 'المعايير المعتمدة',
      warranty: 'فترة الضمان',
      bookPrefix: 'احجز',
      sla: 'الاستجابة',
      limitWarning:
        'يمكنك مقارنة 3 خدمات كحد أقصى في وقت واحد. أزل إحدى الخدمات المحددة أدناه لإضافة خدمة جديدة.',
      names: {
        plumbing: 'السباكة',
        electrical: 'الكهرباء',
        hvac: 'التكييف والتهوية',
        painting: 'الدهانات',
        construction: 'الإنشاءات',
        security: 'الأنظمة الأمنية',
        cleaning: 'النظافة التجارية',
        gardening: 'تنسيق الحدائق',
        'pest-control': 'مكافحة الآفات',
        mechanical: 'الأعمال الميكانيكية',
        'electrical-maintenance': 'صيانة الكهرباء',
        it: 'تقنية المعلومات والشبكات',
        maintenance: 'الصيانة الشاملة',
      },
      categories: {
        'MEP & Technical': 'الأنظمة الكهروميكانيكية',
        'Build & Finish': 'الإنشاءات والتشطيبات',
        'Security & IT': 'الأمن وتقنية المعلومات',
        'Facility & Grounds': 'النظافة والمرافق الخارجية',
      },
    },
    comparison: {
      eyebrow: 'مصفوفة المواصفات الفنية',
      heading: 'مقارنة خدمات الصيانة جنباً إلى جنب',
      subtitle:
        'اختر حتى 3 خدمات من الشبكة أعلاه أو من القوائم أدناه لمقارنة سرعة الاستجابة والشهادات ونطاق العمل.',
      selectedOf3: 'محددة',
      top3Mep: 'أبرز 3 خدمات MEP',
      clearAll: 'مسح الكل',
      techParameter: 'المعيار الفني',
      compareUpTo3: 'قارن حتى 3 خدمات',
      slotLabel: 'خانة الخدمة',
      addServicePlaceholder: '+ إضافة خدمة...',
      rows: {
        discipline: 'التخصص',
        responseSla: 'زمن الاستجابة (SLA)',
        dispatchTier: 'مستوى التشغيل',
        emergencySupport: 'دعم الطوارئ',
        certifications: 'المعايير والاعتمادات',
        inspectionFrequency: 'دورية الفحص الوقائي',
        warrantyPeriod: 'ضمان جودة العمل',
        coverageRegions: 'التغطية الإقليمية',
        typicalDeliverables: 'نطاق العمل الفني',
        scheduleService: 'حجز الخدمة',
      },
      emptyState:
        'اختر من 1 إلى 3 خدمات من البطاقات أو قوائم الاختيار أعلاه لعرض المواصفات الفنية جنباً إلى جنب.',
    },
    quickQuote: {
      eyebrow: 'حاسبة التكلفة الفورية',
      title: 'طلب عرض سعر مبدئي سريع',
      guideEstimate: 'التقدير المبدئي التقريبي',
      targetSla: 'زمن الاستجابة',
      serviceDiscipline: 'نوع الخدمة',
      regionalHub: 'المركز الإقليمي',
      facilityFootprint: 'مساحة المنشأة',
      tiers: {
        zone: { label: 'منطقة واحدة', sublabel: 'أقل من 500 م²' },
        floor: { label: 'عدة طوابق', sublabel: '500–2,500 م²' },
        campus: { label: 'مجمع كامل', sublabel: '+2,500 م²' },
      },
      namePlaceholder: 'الاسم الكامل *',
      emailPlaceholder: 'البريد الإلكتروني للعمل *',
      briefPlaceholder: 'وصف مختصر أو رمز الموقع (اختياري)',
      submitting: 'جارٍ الاحتساب والحفظ...',
      submit: 'طلب التقدير المبدئي',
      loggedTitle: 'تم تسجيل طلب عرض السعر',
      labelService: 'الخدمة',
      labelHub: 'المركز',
      labelScope: 'حجم المنشأة',
      labelEstimate: 'النطاق التقديري',
      followUpNote:
        'سيرسل فريق التسعير الإقليمي لدينا عرضاً تفصيلياً إلى بريدك الإلكتروني خلال ساعتين.',
      returnHome: 'العودة للرئيسية',
      scheduleDispatch: 'تحديد موعد فني الآن',
    },
    media: {
      eyebrowPrefix: 'معرض المشاريع',
      eyebrowSuffix: 'مقاطع ميدانية',
      title: 'الاستعراض التشغيلي',
      realPhotos: 'صور حقيقية',
      videos: 'فيديوهات (4)',
    },
    clientsTeam: {
      clientsHeading: 'العملاء العالميون.',
      teamHeading: 'القيادة الهندسية.',
      clientsSub: 'أكثر من 420 عقاراً تجارياً وسكنياً تحت الإدارة.',
      teamSub: 'أكثر من 180 مهندساً معتمداً عبر ثلاث مناطق.',
      clientsTab: 'العملاء',
      teamTab: 'الفريق',
      book: 'حجز',
    },
    booking: {
      heading: 'حجز فريق ميداني.',
      subtitle: 'اختر الخدمة والمركز الإقليمي ووقت الوصول المناسب.',
      serviceLabel: 'الخدمة',
      regionLabel: 'المنطقة',
      propertyLabel: 'نوع العقار',
      dateLabel: 'التاريخ',
      windowLabel: 'الفترة الزمنية',
      fullNamePlaceholder: 'الاسم الكامل *',
      phonePlaceholder: 'رقم الهاتف *',
      emailPlaceholder: 'البريد الإلكتروني *',
      addressPlaceholder: 'عنوان الموقع *',
      notesPlaceholder: 'ملاحظات إضافية حول العمل',
      confirming: 'جارٍ التأكيد...',
      confirmPrefix: 'تأكيد حجز',
      confirmSuffix: '',
      confirmedLabel: 'تم التأكيد',
      newBooking: 'حجز جديد',
    },
    footer: {
      eyebrow: 'شبكة العمليات العالمية',
      headingPrefix: 'المقرات الإقليمية',
      headingSuffix: 'خريطة الانتشار',
      bookPrefix: 'احجز في',
      liveActive: 'مباشر: نشط',
      coveragePrefix: 'نطاق التغطية:',
      openInMaps: 'فتح في الخرائط',
      scheduleDispatch: 'جدولة زيارة فنية',
      copyrightPrefix: 'كيلفكس سوليوشنز. الإدارة المتكاملة للمرافق',
      copyrightSuffix: 'والهندسة في المملكة المتحدة وألمانيا والإمارات.',
      navServices: '13 خدمة',
      navGallery: 'معرض المشاريع',
      navTeam: 'العملاء والفريق',
      navBook: 'حجز خدمة',
      backToTop: 'العودة للأعلى',
      regionalHubTag: 'مركز إقليمي',
      newsletterEyebrow: 'النشرة الهندسية الشهرية',
      newsletterTitlePrefix: 'إرشادات الصيانة',
      newsletterTitleEmphasis: 'الوقائية',
      newsletterTitleSuffix: 'وتحديثات القطاع',
      newsletterDescription:
        'ملخص شهري موجز حول كفاءة أنظمة التكييف والتدقيق الكهربائي والعناية الموسمية بالمرافق.',
      newsletterPlaceholder: 'name@company.ae',
      newsletterButton: 'اشترك',
      newsletterSubmitting: 'جارٍ الحفظ...',
      newsletterSuccess: 'تم تسجيل اشتراكك في النشرة الهندسية الشهرية بنجاح.',
      newsletterAlready: 'بريدك الإلكتروني مسجل بالفعل في قائمة النشرة الشهرية.',
      newsletterInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
      pinFocus: 'تركيز الموقع',
      allHubs: 'جميع المراكز',
    },
    widget: {
      aiChat: 'مساعد كيلفكس الذكي',
      aiAssistant: 'مساعد ذكي',
      deskSubtitle: 'مكتب الدعم · إرشاد فوري للحجز',
      openBooking: 'فتح نموذج الحجز',
      quickPromptPlaceholder: 'اسأل عن التكييف أو السباكة أو الأسعار...',
      scanQr: 'مسح رمز QR',
      hotlineSuffix: 'خط الطوارئ 24/7',
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      headingPrefix: 'امتثال MEP والعمليات الإقليمية',
      headingSuffix: 'ومنهجية العمل',
      subtitle:
        'إجابات هندسية واضحة حول الاعتمادات التنظيمية في لندن وألمانيا ودبي، وسرعة الاستجابة على مدار الساعة، وبروتوكولات الصيانة الوقائية.',
      allCategories: 'جميع المواضيع',
      categories: {
        compliance: 'امتثال الأنظمة (MEP)',
        operations: 'العمليات الإقليمية',
        methodology: 'منهجية الخدمة',
      },
      ctaPrompt: 'هل تحتاج إلى ملف امتثال خاص بموقعك أو تدقيق لاتفاقية مستوى الخدمة؟',
      ctaButton: 'احجز استشارة هندسية',
      items: [
        {
          id: 'faq-certs',
          category: 'compliance',
          badge: 'NICEIC · VDE · DEWA',
          question:
            'ما هي الاعتمادات الهندسية والتنظيمية التي يحملها مهندسو كيلفكس في كل منطقة؟',
          answer:
            'يعمل كل مهندس ميداني تحت تراخيص بلده المعتمدة: NICEIC و CIBSE و SafeContractor و F-Gas في لندن؛ و TÜV و VDE 0105 و DIN EN و DGUV V3 في ألمانيا؛ واعتمادات هيئة كهرباء ومياه دبي (DEWA) و SIRA والدفاع المدني بدبي (DCD)، ضمن حوكمة ISO 9001 و 41001 و 45001.',
        },
        {
          id: 'faq-audit-logs',
          category: 'compliance',
          badge: 'سجل تدقيق CAFM',
          question:
            'هل تقدمون شهادات فحص رقمية وسجلات امتثال موثقة بعد كل عملية تدقيق؟',
          answer:
            'نعم، تصدر بعد كل فحص وقائي أو مشروع تحديث حزمة تسليم رقمية مختومة بالتوقيت تتضمن تقارير الفحص الكهربائي، وسجلات الفحص الحراري، وتوازن غازات التبريد F-Gas، وموافقات DEWA/DCD متزامنة مع نظام CAFM.',
        },
        {
          id: 'faq-live-isolation',
          category: 'compliance',
          badge: 'عزل آمن بدون توقف',
          question:
            'كيف يتم تنفيذ أعمال لوحات الجهد العالي والمبردات دون تعطيل تشغيل المباني التجارية؟',
          answer:
            'ينفذ مهندسونا إجراءات العزل الآمن (LOTO) وتصاريح العمل خارج ساعات الذروة، مع توفير وحدات تبريد احتياطية N+1 أو توصيلات طاقة مؤقتة لضمان استمرارية عمل المرافق التجارية دون انقطاع.',
        },
        {
          id: 'faq-sla-speed',
          category: 'operations',
          badge: 'استجابة 45–60 دقيقة',
          question:
            'ما هي سرعة استجابة فرق الطوارئ الميدانية في لندن وألمانيا ودبي؟',
          answer:
            'تضمن مراكزنا الميدانية في مدينة لندن وفرانكفورت وميونخ ووسط مدينة دبي وصول المهندس المعتمد خلال 45 إلى 60 دقيقة للحالات الطارئة على مدار الساعة.',
        },
        {
          id: 'faq-multi-region',
          category: 'operations',
          badge: 'عقد موحد لـ 3 مناطق',
          question:
            'هل يمكن لملاك الأصول الدوليين إدارة عقاراتهم في بريطانيا وألمانيا والإمارات بعقد واحد؟',
          answer:
            'نعم، نوفر اتفاقية خدمة رئيسية موحدة (MSA) تجمع تقارير الأداء الإقليمية تحت لوحة واحدة مع الالتزام التام بالقوانين المحلية وإصدار الفواتير بالعملة المحلية (GBP / EUR / AED).',
        },
        {
          id: 'faq-inhouse-workforce',
          category: 'operations',
          badge: '+180 مهندساً متفرغاً',
          question:
            'هل يعمل الفنيون بشكل مباشر لدى كيلفكس أم عبر وسطاء خارجيين؟',
          answer:
            'تضم كيلفكس أكثر من 180 مهندساً وفنياً متفرغاً ومرخصاً ومفحوصاً أمنياً في المراكز الثلاثة، وأي أعمال متخصصة للمصنعين تتم تحت الإشراف المباشر لمهندسنا القيادي الإقليمي.',
        },
        {
          id: 'faq-milestone-math',
          category: 'methodology',
          badge: 'التزام SLA بنسبة 99.4%',
          question:
            'كيف يتم احتساب نسبة الالتزام 99.4% وإنجازات المشاريع المنشورة؟',
          answer:
            'تُدقق مؤشرات الأداء عبر نظام CMMS خلال آخر 12 شهراً باستخدام بصمة الوصول عبر GPS، وبمراجعة أوامر العمل الموقعة في نظام ERP منذ 2016 (+1,400 مشروع) وسجل المساحات في CAFM (+1.8 مليون م²).',
        },
        {
          id: 'faq-ppm-workflow',
          category: 'methodology',
          badge: 'معايير SFG20 & VDMA',
          question:
            'ما الفحوصات الاستباقية التي يشملها برنامج الصيانة الوقائية (PPM)؟',
          answer:
            'ندمج جداول SFG20 و VDMA 24186 مع التصوير الحراري بالأشعة تحت الحمراء للوحات الكهربائية، وتحليل الاهتزازات للمحركات، وتنبيهات أنظمة إدارة المباني BMS لمنع الأعطال قبل حدوثها.',
        },
        {
          id: 'faq-warranty-qa',
          category: 'methodology',
          badge: 'ضمان 12–24 شهراً',
          question:
            'ما هي ضمانات جودة التنفيذ واعتماد التسليم بعد انتهاء الأعمال؟',
          answer:
            'يخضع كل مشروع أو إصلاح فني لتدقيق مزدوج واعتماد من المهندس القيادي الإقليمي قبل التسليم، ويشمل ضماناً على جودة التنفيذ لمدة 12 إلى 24 شهراً حسب التخصص.',
        },
      ],
    },
  },
};
