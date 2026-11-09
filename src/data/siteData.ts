export interface WorkProcessStep {
  id: number;
  stepNumber: string;
  title: string;
  hindiDescription: string;
  englishDescription: string;
  iconName: string;
  deliverables: string[];
}

export interface MetricItem {
  id: string;
  count: number;
  suffix: string;
  label: string;
  hindiLabel: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'staircase' | 'railing' | 'laser-screen' | 'facade-doors' | 'elevator-cladding' | 'industrial' | 'nexus-hyderabad' | 'westend-pune' | 'nexus-mumbai' | 'nexus-pune' | string;
  categoryLabel: string;
  location: string;
  clientType: string;
  image: string;
  description: string;
  materials: string[];
  features: string[];
  completionYear: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  heroImage: string;
  description: string;
  features: string[];
  specifications: {
    materialGrades: string;
    finishOptions: string;
    standardLeadTime: string;
    applicationArea: string;
  };
  sampleProjectsCount: number;
}

export const COMPANY_INFO = {
  name: 'Pioneer Fab Tech',
  legalName: 'Sagthabhai Darghabhai Chaudhari',
  tradeName: 'PIONEER FAB TECH',
  gstin: '27CADPB7453H1ZS',
  udyam: 'UDYAM-MH-17-0184039',
  ptec: '99755077995P',
  tagline: 'Innovation • Precision • Excellence',
  email: 'info@pioneerfabtech.com',
  phone: '+91 90295 55233',
  phoneRaw: '+919029555233',
  whatsappUrl: 'https://wa.me/919029555233',
  address: 'S.No.233 H.No.2 Shop No.03 Jay Ambe Chawl Lake Vasai virar, Palghar Maharashtra 401208',
  locationCity: 'Vasai Virar, Palghar, Maharashtra',
  pincode: '401208',
  establishedYear: '2012',
  experienceYears: 14,
  deliveredProjects: 850,
  happyClients: 620,
  ongoingProjects: 28,
  googleMapsUrl: 'https://maps.google.com/?q=Vasai+Virar+Palghar+Maharashtra+401208',
  copyright: '© 2026 Pioneer Fab Tech. All Rights Reserved.  | Designed & Developed by Sajid Web Solution',
  logoUrl: '/assets/images/pioneer_fab_tech_official_logo.png',
};

export const WORK_PROCESS: WorkProcessStep[] = [
  {
    id: 1,
    stepNumber: '01',
    title: 'Requirement Discussion',
    hindiDescription: 'Customer ki requirement samajhna.',
    englishDescription: 'Comprehensive client consultation, space understanding, design preferences, and structural load requirements.',
    iconName: 'MessageSquare',
    deliverables: ['Client brief audit', 'Site measurement schedule', 'Budget & material orientation'],
  },
  {
    id: 2,
    stepNumber: '02',
    title: 'Design & Planning',
    hindiDescription: 'Drawings, dimensions aur planning.',
    englishDescription: 'Precision 2D CAD layouts, 3D parametric modeling, structural calculation, and fabrication blue-prints.',
    iconName: 'Compass',
    deliverables: ['Detailed CAD drawings', '3D visual renders', 'Material Bill of Quantities (BOQ)'],
  },
  {
    id: 3,
    stepNumber: '03',
    title: 'Fabrication',
    hindiDescription: 'Manufacturing aur fabrication work.',
    englishDescription: 'High-precision CNC fiber laser cutting, hydraulic bending, specialized TIG/MIG welding, and fine polishing.',
    iconName: 'Hammer',
    deliverables: ['CNC laser profile cutting', 'Argon TIG/MIG welding', 'PVD / mirror / satin surface finishing'],
  },
  {
    id: 4,
    stepNumber: '04',
    title: 'Quality Inspection',
    hindiDescription: 'Workmanship aur measurements check.',
    englishDescription: 'Rigorous tolerance inspection, weld joint penetration checks, dimensional verification, and pre-fit staging.',
    iconName: 'CheckCircle2',
    deliverables: ['Tolerance audit (±0.5mm)', 'Weld integrity testing', 'Protective film packaging'],
  },
  {
    id: 5,
    stepNumber: '05',
    title: 'Installation & Handover',
    hindiDescription: 'Site fitting aur project completion.',
    englishDescription: 'Professional on-site laser leveling, mechanical anchoring, glass fitting, cleaning, and final project sign-off.',
    iconName: 'Truck',
    deliverables: ['On-site laser leveled installation', 'Hardware torque tightening', 'Client handover & warranty certification'],
  },
];

export const METRICS: MetricItem[] = [
  {
    id: 'delivered',
    count: 850,
    suffix: '+',
    label: 'Projects Delivered',
    hindiLabel: 'Safal Projects Complete',
    description: 'From bespoke luxury spiral stairs to heavy industrial plant mezzanines.',
  },
  {
    id: 'clients',
    count: 620,
    suffix: '+',
    label: 'Happy Clients',
    hindiLabel: 'Santusht Grahak',
    description: 'Trusted by architects, interior designers, commercial brands, and homeowners.',
  },
  {
    id: 'ongoing',
    count: 28,
    suffix: '+',
    label: 'Projects On-Going',
    hindiLabel: 'Chalu Sites & Work',
    description: 'Active installation & fabrication sites in Mumbai, Thane, Pune & Palghar.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'spiral-stairs',
    title: 'Architectural Spiral & Helical Staircases',
    subtitle: 'Centre-mast & stringer curved structural steel & timber stairs',
    slug: 'spiral-staircases',
    category: 'Staircase Engineering',
    heroImage: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.05_PM_0a02320f.jpeg',
    description: 'Engineered spiral, floating cantilever, and double-flight steel staircases with laser-cut stringers, integrated wooden treads, and curved safety glass or SS balustrades for commercial showrooms and luxury residences.',
    features: [
      'Custom curved steel stringers with zero vibration',
      'Solid hardwood or toughened glass tread combinations',
      'Seamless curved handrail transitions',
      'Engineered load calculations up to 500 kg/m²',
    ],
    specifications: {
      materialGrades: 'IS 2062 Structural Steel, SS 304, Hardwood oak/teak',
      finishOptions: 'Matte black PU coat, Metallic gunmetal, Brushed satin SS',
      standardLeadTime: '15 - 25 Working Days',
      applicationArea: 'Duplex apartments, Corporate atriums, Luxury villas & retail',
    },
    sampleProjectsCount: 145,
  },
  {
    id: 'laser-partitions',
    title: 'CNC Laser Cut Jali & Decorative Partitions',
    subtitle: 'Custom geometric patterns, room dividers & PVD titanium screens',
    slug: 'cnc-laser-cut-screens',
    category: 'Interior & Architectural Metal',
    heroImage: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.05_PM__2__0873d20e.jpeg',
    description: 'Ultra-precise fiber laser cut stainless steel and brass decorative screens. Available in high-gloss gold PVD coating, rose gold, antique bronze, and textured powder coating with custom geometric, floral, or Islamic jali patterns.',
    features: [
      'Precision fiber laser cutting with ±0.1mm micro-kerf',
      'PVD titanium coating with 10-year fade-resistant guarantee',
      'Integrated sliding & folding track hardware solutions',
      'Custom parametric designs from AutoCAD or Vector files',
    ],
    specifications: {
      materialGrades: 'SS 304 / SS 316 / Brass / Aluminum sheet (1.5mm - 6mm)',
      finishOptions: 'PVD Gold Mirror, Rose Gold Hairline, Black Titanium, Antique Brass',
      standardLeadTime: '7 - 14 Working Days',
      applicationArea: 'Living room partitions, Mandir jali, Hotel lobbies, Restaurant dividers',
    },
    sampleProjectsCount: 220,
  },
  {
    id: 'commercial-facades',
    title: 'Commercial Glass Facades, Doors & Shop Fronts',
    subtitle: 'Framed & frameless high-grade architectural storefronts',
    slug: 'facades-and-shopfronts',
    category: 'Commercial Glazing & Metal',
    heroImage: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.04_PM__1__313234b2.jpeg',
    description: 'Heavy-gauge stainless steel and mild steel framed entrance facades, French arched double doors, automatic sliding entries, and high-impact structural glass storefronts designed for maximum display clarity and security.',
    features: [
      'Heavy-duty floor springs and patch fittings (DORMA / Ozone standard)',
      '12mm to 19mm toughened safety glass and DGU insulated glass',
      'Custom classical arch or modern rectangular profiles',
      'Weatherproof EPDM rubber seals and acoustic insulation',
    ],
    specifications: {
      materialGrades: 'Heavy MS hollow sections, SS 304 clad, Tempered glass',
      finishOptions: 'Automotive PU paint, Anodized dark bronze, Brushed SS',
      standardLeadTime: '12 - 20 Working Days',
      applicationArea: 'Retail outlets, High-street boutiques, Showrooms, Cafe entrances',
    },
    sampleProjectsCount: 180,
  },
  {
    id: 'elevator-cladding',
    title: 'Elevator Portal Cladding & Lift Door Portals',
    subtitle: 'High-rise stainless steel architrave, cabin linings & transom panels',
    slug: 'elevator-portal-cladding',
    category: 'Elevator Cladding',
    heroImage: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.03_PM__2__e0b466fd.jpeg',
    description: 'Bespoke elevator landing door frame cladding, full-height transom architrave jambs, and interior lift cabin stainless steel paneling in gold mirror, hairline satin, and etched designer textures.',
    features: [
      'Laser-aligned on-site installation with zero seam gaps',
      'Custom cutouts for hall button call stations and floor displays',
      'Fire-rated stainless steel fabrication compliance',
      'Fingerprint-resistant nanocoating protection',
    ],
    specifications: {
      materialGrades: 'SS 304 / SS 316 (1.2mm - 1.5mm architectural sheet)',
      finishOptions: 'Titanium Gold Hairline, No.4 Satin, Mirror Polish, Bronze Hairline',
      standardLeadTime: '7 - 12 Working Days',
      applicationArea: 'Commercial towers, Luxury hotels, Residential high-rises, Malls',
    },
    sampleProjectsCount: 160,
  },
  {
    id: 'glass-railings',
    title: 'SS & Glass Balcony Railings & Handrails',
    subtitle: 'Frameless glass balustrades, SS 304/316 spigot & pipe handrails',
    slug: 'railings-and-balustrades',
    category: 'Railing Systems',
    heroImage: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.03.59_PM__1__bb8af710.jpeg',
    description: 'Modern glass balustrades with continuous aluminum base shoe channels, stainless steel spigots, and heavy-duty 50mm pipe handrails designed to meet national building safety load codes.',
    features: [
      'Seamless glass balustrades without vertical post obstructions',
      'Marine-grade SS 316 fittings for coastal weather resistance',
      'Concealed anchor bolts with mirror-polished base plates',
      'Load-tested for high-traffic public commercial safety',
    ],
    specifications: {
      materialGrades: 'SS 304, SS 316, 12mm / 15mm PVB laminated toughened glass',
      finishOptions: '600-grit Mirror, Brushed satin, PVD Rose Gold, Matte Black',
      standardLeadTime: '10 - 15 Working Days',
      applicationArea: 'Balconies, Staircases, Terrace parapets, Shopping malls, Villas',
    },
    sampleProjectsCount: 290,
  },
  {
    id: 'industrial-fabrication',
    title: 'Heavy Industrial Fabrication & Safety Mezzanines',
    subtitle: 'Industrial access stairs, machine platforms, safety cages & barriers',
    slug: 'industrial-heavy-fabrication',
    category: 'Industrial Engineering',
    heroImage: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.03_PM_2f9ff5e2.jpeg',
    description: 'Heavy structural steel fabrication including plant maintenance platforms, industrial stairs with serrated anti-slip grating, warehouse mezzanines, and perimeter safety barrier wire-mesh enclosures.',
    features: [
      'Heavy-duty I-beams, channel sections and square tubular columns',
      'Industrial anti-slip serrated grating treads with toe-plates',
      'Complete safety cage ladders and OSHA-compliant handrails',
      'Hot-dip galvanized or epoxy anti-corrosive primer coating',
    ],
    specifications: {
      materialGrades: 'IS 2062 Grade E250 / E350 Structural Steel, SS 304',
      finishOptions: 'Hot-Dip Galvanized, Industrial Epoxy Zinc Phosphate Primer',
      standardLeadTime: '15 - 30 Working Days',
      applicationArea: 'Manufacturing plants, Warehouses, Go-kart arenas, Utility factories',
    },
    sampleProjectsCount: 110,
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-mall-01',
    title: 'Nexus Mall Hyderabad - Architectural Helical Spiral Staircase & Atrium',
    category: 'nexus-hyderabad',
    categoryLabel: 'Nexus Mall Hyderabad',
    location: 'Kukatpally, Hyderabad',
    clientType: 'Commercial Shopping Mall',
    image: '/assets/images/nexus_mall_hyderabad_1793776855387.jpg',
    description: 'Custom curved architectural stainless steel and glass spiral staircase spanning the multi-level retail atrium, featuring mirror-finish SS 304 stringers and continuous curved safety balustrades under a panoramic skylight.',
    materials: ['SS 304 Mirror Polish', 'Toughened Curved Laminated Glass', 'IS 2062 Structural Subframe'],
    features: ['Precision helical curvature', 'Integrated LED step profile lighting', 'Heavy commercial mall load certified'],
    completionYear: '2026',
  },
  {
    id: 'proj-mall-02',
    title: 'Nexus Mall Hyderabad - SS 316 Curved Glass Balustrades & Under-Rail LED',
    category: 'nexus-hyderabad',
    categoryLabel: 'Nexus Mall Hyderabad',
    location: 'Kukatpally, Hyderabad',
    clientType: 'Commercial Atrium Balustrades',
    image: '/assets/images/nexus_hyd_balustrade_1793776925839.jpg',
    description: 'Continuous curved stainless steel 316 handrail system with integrated warm LED illumination channels and frameless toughened glass safety balustrades overlooking the multi-storey mall floor.',
    materials: ['SS 316 Marine Grade', '15mm PVB Toughened Safety Glass', 'Warm White LED Strips'],
    features: ['Continuous zero-seam joint transitions', 'Concealed wiring conduit', 'High footfall crowd barrier certified'],
    completionYear: '2026',
  },
  {
    id: 'proj-mall-03',
    title: 'Westend Mall Pune - Grand Atrium Gold Laser-Cut Jali Screens & Balustrades',
    category: 'westend-pune',
    categoryLabel: 'Westend Mall Pune',
    location: 'Aundh, Pune',
    clientType: 'Commercial Retail Atrium',
    image: '/assets/images/westend_mall_pune_1793776873429.jpg',
    description: 'Full-height decorative geometric laser-cut stainless steel jali architraves in mirror titanium gold PVD, integrated with multi-level structural glass balustrades and brushed stainless steel handrails.',
    materials: ['SS 304 3mm Laser Cut', 'Titanium Gold PVD Coating', 'Structural Glass Cladding'],
    features: ['Intricate micro-kerf laser profiling', 'Fade-resistant titanium vacuum coating', 'Seamless multi-level atrium columns'],
    completionYear: '2025',
  },
  {
    id: 'proj-mall-04',
    title: 'Westend Mall Pune - Luxury Boutique Storefront with Laser-Cut Architrave',
    category: 'westend-pune',
    categoryLabel: 'Westend Mall Pune',
    location: 'Aundh, Pune',
    clientType: 'Commercial Boutique Facade',
    image: '/assets/images/westend_pune_facade_1793776941787.jpg',
    description: 'Precision fabricated floor-to-ceiling glass storefront entrance with backlit laser-cut stainless steel geometric architrave, brushed SS doors, and heavy-duty concealed pivot hardware.',
    materials: ['Architectural Stainless Steel', '12mm Low-Iron Clear Glass', 'Integrated Backlit LED Profiles'],
    features: ['Custom laser-cut lattice entrance surround', 'Heavy floor-spring pivot hardware', 'Crystal clear acoustic glazing'],
    completionYear: '2026',
  },
  {
    id: 'proj-mall-05',
    title: 'Nexus Mall Mumbai - Multi-Deck Glass Elevators & Titanium Gold Cladding',
    category: 'nexus-mumbai',
    categoryLabel: 'Nexus Mumbai',
    location: 'Seawoods / Navi Mumbai',
    clientType: 'Premier Shopping Complex',
    image: '/assets/images/nexus_mall_mumbai_1793776888521.jpg',
    description: 'Architectural titanium gold stainless steel cladding across high-speed panoramic passenger elevator shafts and multi-tiered atrium balustrade walkways.',
    materials: ['Titanium Champagne Gold PVD SS', 'Structural Glazing Channels', 'Heavy Bracket Substructures'],
    features: ['Full-height vertical column cladding', 'Mirror and hairline satin dual finish', 'Zero oil-canning structural rigidity'],
    completionYear: '2026',
  },
  {
    id: 'proj-mall-06',
    title: 'Nexus Mall Mumbai - Champagne Gold Titanium PVD Elevator Portal Architrave',
    category: 'nexus-mumbai',
    categoryLabel: 'Nexus Mumbai',
    location: 'Seawoods / Navi Mumbai',
    clientType: 'Commercial Passenger Elevators',
    image: '/assets/images/nexus_mumbai_portal_1793776959410.jpg',
    description: 'Bespoke passenger elevator portal cladding in champagne gold PVD stainless steel with precision laser-cut floor indicator call station recesses and marble surround.',
    materials: ['SS 304 1.5mm PVD Gold Sheet', 'Acoustic Damping Backer', 'Concealed Fastening System'],
    features: ['Precision micro-mitred 45-degree corner joints', 'Anti-fingerprint nanotech surface seal', 'OEM elevator manufacturer compliant'],
    completionYear: '2026',
  },
  {
    id: 'proj-mall-07',
    title: 'Nexus Mall Pune - Double-Flight Structural Steel Staircase with Timber Steps',
    category: 'nexus-pune',
    categoryLabel: 'Nexus Mall Pune',
    location: 'Pune, Maharashtra',
    clientType: 'Commercial Shopping Mall',
    image: '/assets/images/nexus_mall_pune_1793776906431.jpg',
    description: 'Symmetrical twin-flight architectural steel staircase framing the central atrium fountain, engineered with IS 2062 heavy structural steel and curved glass safety balustrades.',
    materials: ['IS 2062 Grade Structural Steel', 'Solid Hardwood Timber Steps', 'SS 304 Curved Glass Balustrades'],
    features: ['Seismic load certified structural engineering', 'High-traffic anti-slip step profiles', 'Panoramic skylight architectural focal point'],
    completionYear: '2025',
  },
  {
    id: 'proj-mall-08',
    title: 'Nexus Mall Pune - Curved Glass Entrance Atrium & SS Balustrade Systems',
    category: 'nexus-pune',
    categoryLabel: 'Nexus Mall Pune',
    location: 'Pune, Maharashtra',
    clientType: 'Commercial Entrance Atrium',
    image: '/assets/images/nexus_pune_facade_1793776973954.jpg',
    description: 'Sweeping multi-level curved glass balustrade system overlooking the main glass facade entrance with continuous stainless steel handrails and architectural steel column cladding.',
    materials: ['Continuous Curved Glass Balustrades', 'SS 304 Polished Pipe Rail', 'Architectural Column Covers'],
    features: ['Expansive wide-angle curved geometry', 'Weather-sealed entrance portal transition', 'Integrated maintenance access gates'],
    completionYear: '2026',
  },
];

export const INDUSTRIES = [
  {
    id: 'commercial',
    title: 'Commercial & Retail Showrooms',
    description: 'High-impact entrance storefronts, structural staircases, glass partitions, and decorative display metalwork for luxury retail and flagship stores.',
    metrics: '180+ Completed Stores',
  },
  {
    id: 'residential',
    title: 'Luxury Residential Villas & Apartments',
    description: 'Bespoke spiral staircases, SS/glass balcony railings, gold PVD laser cut partitions, entrance gates, and designer stainless steel interiors.',
    metrics: '320+ Private Residences',
  },
  {
    id: 'hospitality',
    title: 'Hotels, Banquets & Fine Dining',
    description: 'Grand lobby elevator cladding, ornate metal screens, architectural wine cellar racks, and exterior architectural facade canopies.',
    metrics: '65+ Hospitality Venues',
  },
  {
    id: 'corporate',
    title: 'Corporate Headquarters & IT Parks',
    description: 'Double-flight atrium staircases, frameless conference room partitions, heavy-duty stainless balustrades, and modern facade cladding.',
    metrics: '140+ Office Spaces',
  },
  {
    id: 'industrial',
    title: 'Industrial Warehouses & Plant Facilities',
    description: 'Structural steel mezzanines, plant maintenance stair towers, anti-slip platform gratings, machine guards, and heavy safety barriers.',
    metrics: '110+ Factories & Sheds',
  },
  {
    id: 'institutional',
    title: 'Healthcare & Entertainment Complexes',
    description: 'Cleanroom stainless steel fixtures, hospital grade antibacterial SS railings, arena safety barriers, and accessible ramp handrails.',
    metrics: '35+ Institutional Sites',
  },
];

export const INFRASTRUCTURE_SPECS = [
  {
    machine: 'CNC High-Speed Fiber Laser Cutting System',
    capacity: 'Up to 20mm Mild Steel, 12mm Stainless Steel, 6mm Brass & Aluminum',
    bedSize: '1500mm x 3000mm bed with ±0.05mm positioning precision',
    benefit: 'Clean burr-free edges, micro-precision intricate Jali cuts with zero thermal distortion.',
  },
  {
    machine: 'Hydraulic Multi-Axis CNC Press Brake Bending',
    capacity: '160 Tons bending force, up to 3200mm single stroke sheet length',
    bedSize: 'Precision angle encoder with automatic deflection compensation',
    benefit: 'Flawless 90-degree and custom radius folding for elevator cladding and stair stringers.',
  },
  {
    machine: 'High-Purity Argon TIG & MIG Welding Stations',
    capacity: 'Continuous inverter pulsed TIG / MIG welding bays',
    bedSize: 'Dedicated SS 304/316 cleanroom welding area to prevent carbon contamination',
    benefit: 'Porosity-free full penetration welds with pristine structural integrity.',
  },
  {
    machine: 'Heavy Section Hydraulic 3-Roller Pipe & Profile Bender',
    capacity: 'Bends up to 150mm steel tubes, channels, beams & angle sections',
    bedSize: 'CNC radius control for true 3D helical spirals and arched door frames',
    benefit: 'Zero flat-spotting or ovality when curving spiral staircase stringers and round arches.',
  },
  {
    machine: 'Automated Grinding, Graining & Mirror Polishing Line',
    capacity: 'From No.4 Satin Hairline to 600-grit optical mirror reflection',
    bedSize: 'High-torque orbital sanders, deburring drums, and felt buffing wheels',
    benefit: 'Uniform directional grain and scratch-free mirror finishes ready for PVD titanium coating.',
  },
  {
    machine: 'Dedicated In-House Assembly & Pre-Fit Staging Bays',
    capacity: 'Over 6,500 sq.ft. covered workshop floor in Vasai-Virar industrial belt',
    bedSize: 'Overhead 5-ton EOT crane for maneuvering heavy structural components',
    benefit: 'Every staircase and facade is 100% pre-assembled and checked before dispatch to site.',
  },
];

export interface OfficialCertificateItem {
  id: string;
  title: string;
  shortTitle: string;
  certNumber: string;
  issuingAuthority: string;
  ministryDepartment: string;
  issueDate: string;
  effectiveDate: string;
  legalEntity: string;
  businessName: string;
  category: string;
  badge: string;
  pdfUrl: string;
  previewImage: string;
  description: string;
  highlights: { label: string; value: string }[];
  standard: string;
  details: string;
}

export const OFFICIAL_CERTIFICATES: OfficialCertificateItem[] = [
  {
    id: 'gst-certificate',
    title: 'Government of India - GST Registration Certificate (Form GST REG-06)',
    shortTitle: 'GST Registration Certificate',
    certNumber: '27CADPB7453H1ZS',
    issuingAuthority: 'State Tax Officer, MIRA_BHAYANDER_707, Maharashtra / GSTN India',
    ministryDepartment: 'Department of Revenue, Ministry of Finance, Government of India',
    issueDate: '22/04/2025',
    effectiveDate: '01/04/2025',
    legalEntity: 'SAGTHABHAI DARGHABHAI CHAUDHARI',
    businessName: 'PIONEER FAB TECH',
    category: 'Central & State Tax Registration',
    badge: 'Form GST REG-06 Verified',
    pdfUrl: '/assets/aistudio/GST_Certificate_e62e8b0e.pdf',
    previewImage: '/assets/images/gst_cert_preview_1793876909399.jpg',
    description: 'Statutory registration under the Central Goods and Services Tax Act, 2017 & Maharashtra Goods and Services Tax Act, 2017. Validates commercial tax status and official taxpayer credentials.',
    standard: 'GSTIN: 27CADPB7453H1ZS',
    details: 'Government of India Form GST REG-06 registered at Vasai Virar, Palghar, Maharashtra - 401208.',
    highlights: [
      { label: 'GSTIN / UIN', value: '27CADPB7453H1ZS' },
      { label: 'Constitution of Business', value: 'Proprietorship' },
      { label: 'Legal Name of Business', value: 'SAGTHABHAI DARGHABHAI CHAUDHARI' },
      { label: 'Trade Name', value: 'PIONEER FAB TECH' },
      { label: 'Jurisdiction Office', value: 'MIRA_BHAYANDER_707, Palghar' },
      { label: 'Principal Place of Business', value: 'S.No.233 H.No.2 Shop No.03, Jay Ambe Chawl Lake, Vasai virar, Palghar, Maharashtra - 401208' },
    ],
  },
  {
    id: 'udyam-certificate',
    title: 'Ministry of MSME, Government of India - Udyam Registration Certificate',
    shortTitle: 'MSME Udyam Registration',
    certNumber: 'UDYAM-MH-17-0184039',
    issuingAuthority: 'Ministry of Micro, Small and Medium Enterprises, Government of India',
    ministryDepartment: 'MSME Development & Facilitation Office (MSME-DFO), Mumbai / DIC Palghar',
    issueDate: '09/04/2025',
    effectiveDate: '09/04/2025',
    legalEntity: 'SAGTHABHAI DARGHABHAI CHAUDHARI',
    businessName: 'M/S PIONEER FAB TECH',
    category: 'Government Recognized Enterprise',
    badge: 'Micro Enterprise (2025-26)',
    pdfUrl: '/assets/aistudio/Print___Udyam_Registration_Certificate_Updated_42ee8545.pdf',
    previewImage: '/assets/images/udyam_cert_preview_1793876923612.jpg',
    description: 'National MSME enterprise accreditation issued under the Micro, Small and Medium Enterprises Development Act, 2006. Classified under NIC 46620 for architectural & structural metals wholesale and engineering.',
    standard: 'Udyam No: UDYAM-MH-17-0184039',
    details: 'Ministry of MSME, Govt. of India verified Micro Enterprise based in Palghar district.',
    highlights: [
      { label: 'Udyam Registration Number', value: 'UDYAM-MH-17-0184039' },
      { label: 'Type of Enterprise', value: 'Micro Enterprise' },
      { label: 'Major Activity', value: 'Trading / Structural & Architectural Metals' },
      { label: 'National Industry Code (NIC)', value: '46620 (Wholesale of metals and metal ores)' },
      { label: 'District Industries Centre', value: 'DIC PALGHAR' },
      { label: 'MSME-DFO Office', value: 'MSME-DFO MUMBAI' },
    ],
  },
  {
    id: 'ptec-certificate',
    title: 'Maharashtra State Tax Department - Profession Tax Certificate of Enrolment (Form II-A)',
    shortTitle: 'Maharashtra PTEC Certificate',
    certNumber: '99755077995P',
    issuingAuthority: 'Maharashtra State Tax Department, Government of Maharashtra',
    ministryDepartment: 'Finance Department, Government of Maharashtra',
    issueDate: '08/04/2025',
    effectiveDate: '01/04/2025',
    legalEntity: 'SAGTHABHAI DARGHABHAI CHAUDHARI',
    businessName: 'PIONEER FAB TECH',
    category: 'State Statutory Compliance',
    badge: 'Form II-A Enrolment Verified',
    pdfUrl: '/assets/aistudio/PTEC_Certificate_e18b408a.pdf',
    previewImage: '/assets/images/ptec_cert_preview_1793876936574.jpg',
    description: 'Statutory certificate of enrolment issued under Section 5 of the Maharashtra State Tax on Professions, Trades, Callings and Employments Act, 1975, certifying compliance and operational authority in Vasai East Industrial Estate.',
    standard: 'PTEC No: 99755077995P',
    details: 'Maharashtra State Tax Department Form II-A registered in Vasai East Industrial Estate, Palghar.',
    highlights: [
      { label: 'Enrolment Certificate Number', value: '99755077995P' },
      { label: 'Statutory Act & Form', value: 'Form II-A (Section 5, Act 1975)' },
      { label: 'Enrolled Person', value: 'SAGTHABHAI DARGHABHAI CHAUDHARI' },
      { label: 'Name of Business', value: 'PIONEER FAB TECH' },
      { label: 'Effective Date', value: '01-Apr-2025' },
      { label: 'Registered Location', value: 'Vasai East IE, Vasai, Palghar, Maharashtra - 401208' },
    ],
  },
];

export interface MaterialSupplyItem {
  id: string;
  itemNumber: string;
  name: string;
  subtitle: string;
  category: 'stainless-steel' | 'copper' | 'aluminium' | 'titanium' | 'structural';
  categoryLabel: string;
  image: string;
  description: string;
  grades: string[];
  dimensions: string;
  standards: string[];
  finishes: string[];
  applications: string[];
  inStock: boolean;
  specsSummary: string;
}

export const MATERIAL_SUPPLY_ITEMS: MaterialSupplyItem[] = [
  {
    id: 'ss-sheet',
    itemNumber: '01',
    name: 'SS SHEET',
    subtitle: 'Prime Stainless Steel Sheets & Plates',
    category: 'stainless-steel',
    categoryLabel: 'Stainless Steel',
    image: '/assets/images/ss_sheet_stack_1794209390147.jpg',
    description: 'High-precision cold rolled & hot rolled stainless steel sheets and heavy plates in ASTM A240 standards. Available with laser-grade protective film, precision shearing, and custom cut-to-size tolerances.',
    grades: ['SS 304', 'SS 304L', 'SS 316', 'SS 316L', 'SS 310S', 'SS 321', 'SS 430', 'SS 202'],
    dimensions: 'Thickness: 0.5 mm to 50.0 mm | Standard Width: 1000mm, 1250mm, 1500mm, 2000mm | Length up to 6000mm',
    standards: ['ASTM A240', 'ASME SA240', 'EN 10088-2', 'IS 6911'],
    finishes: ['2B (Cold Rolled)', 'No.4 Satin Hairline', 'BA (Bright Annealed)', '8K Mirror Optical', 'PVD Titanium Coated (Gold/Rose/Black)', 'Chequered / Tear Pattern'],
    applications: ['Architectural cladding & facade panels', 'Pharmaceutical & chemical tanks', 'Commercial kitchen equipment', 'Elevator cabin interiors', 'Dairy & food processing equipment'],
    inStock: true,
    specsSummary: '0.5mm - 50mm • 304 / 316L / 310 • Mirror & 2B Finish',
  },
  {
    id: 'ss-coil',
    itemNumber: '02',
    name: 'SS COIL',
    subtitle: 'Cold & Hot Rolled Stainless Steel Coils & Slit Strips',
    category: 'stainless-steel',
    categoryLabel: 'Stainless Steel',
    image: '/assets/images/ss_coil_rolls_1794209391067.jpg',
    description: 'Continuous coil stock and custom width precision slit strips with tightly controlled thickness tolerances and burr-free edges, ideal for continuous roll forming, stamping, and manufacturing.',
    grades: ['SS 304', 'SS 304L', 'SS 316', 'SS 316L', 'SS 201', 'SS 410', 'SS 430'],
    dimensions: 'Thickness: 0.3 mm to 6.0 mm | Coil Width: 20mm up to 1524mm (Custom Slit Widths Available)',
    standards: ['ASTM A240', 'ASTM A480M', 'EN 10028-7', 'JIS G4305'],
    finishes: ['2B Mill Finish', 'Bright Annealed (BA)', 'No.4 Hairline Finish', 'PVC / Laser Film Lamination'],
    applications: ['Precision stamping & deep drawing', 'Automotive exhaust systems & flexible hoses', 'Roll formed architectural profiles & channels', 'Heat exchanger fins & bellows'],
    inStock: true,
    specsSummary: '0.3mm - 6.0mm • Slit Widths Available • CR & HR Coils',
  },
  {
    id: 'copper-bars-sheet',
    itemNumber: '03',
    name: 'COPPER BARS & SHEET',
    subtitle: 'Electrolytic Tough Pitch (ETP) Pure Copper Busbars & Sheets',
    category: 'copper',
    categoryLabel: 'Copper Products',
    image: '/assets/images/copper_bars_sheet_1794209392520.jpg',
    description: 'High-conductivity 99.9% pure electrolytic copper busbars, earthing flats, and precision copper sheets offering optimal electrical and thermal conductivity for electrical transmission and industrial use.',
    grades: ['Cu-ETP (C11000 / IS 613)', 'Cu-DHP (C12200)', 'Oxygen-Free Cu-OF (C10200) 99.95% Purity'],
    dimensions: 'Busbars: 10 x 3 mm up to 200 x 20 mm | Sheets: 0.5 mm to 25.0 mm | Length: 3 to 6 Meters',
    standards: ['IS 613', 'ASTM B187 (Busbars)', 'ASTM B152 (Sheets)', 'BS 2874', 'DIN 1787'],
    finishes: ['Bright Mill Finish', 'Electro-Tinned (Tin Plated)', 'Silver Plated', 'Polished Natural Copper'],
    applications: ['Electrical switchgear panels & busducts', 'Power transformers & substations', 'Earthing & lightning arrestor grids', 'Architectural copper roof cladding & accents'],
    inStock: true,
    specsSummary: '99.9% Pure ETP Copper • Busbars & Sheets • IS 613 & ASTM B187',
  },
  {
    id: 'ss-flange',
    itemNumber: '04',
    name: 'SS FLANGE',
    subtitle: 'Forged & Machined Stainless Steel Industrial Flanges',
    category: 'stainless-steel',
    categoryLabel: 'Stainless Steel',
    image: '/assets/images/ss_flange_assortment_1794209392457.jpg',
    description: 'High-pressure forged and CNC-machined stainless steel pipe flanges meeting ANSI, ASME, and DIN standards for industrial pipeline connectivity in chemical, petrochemical, and power plants.',
    grades: ['ASTM A182 F304 / F304L', 'ASTM A182 F316 / F316L', 'F321', 'F347', 'Duplex 2205 (F51)', 'Super Duplex 2507'],
    dimensions: 'Sizes: 1/2" NB to 24" NB (DN15 to DN600) | Pressure: Class 150#, 300#, 600#, 900#, 1500#, 2500# / PN6 to PN64',
    standards: ['ANSI/ASME B16.5', 'ASME B16.47 (Series A & B)', 'DIN 2576', 'DIN 2527', 'BS 4504', 'MSS-SP-44'],
    finishes: ['Smooth Serrated Finish (125-250 AARH)', 'Stock Finish', 'Cold Machined Raised Face (RF) & Flat Face (FF)'],
    applications: ['Oil & gas processing pipelines', 'Chemical & fertilizer plant piping', 'High-pressure steam & boiler lines', 'Shipbuilding & marine offshore pipelines'],
    inStock: true,
    specsSummary: 'Class 150# to 2500# • WNRF / SORF / Blind • F304 & F316L',
  },
  {
    id: 'aluminium-sheet-road',
    itemNumber: '05',
    name: 'ALUMINIUM SHEET & ROAD',
    subtitle: 'Aluminium Sheets, Chequered Plates & Extruded Solid Rods',
    category: 'aluminium',
    categoryLabel: 'Aluminium Products',
    image: '/assets/images/aluminium_sheet_rod_1794209409308.jpg',
    description: 'Premium alloy aluminium sheets, 5-bar chequered flooring plates, and solid extruded cylindrical rods engineered for lightweight structural strength, thermal dissipation, and corrosion resistance.',
    grades: ['AA 6061-T6', 'AA 6082-T6', 'AA 5052-H32', 'AA 2024', 'AA 7075-T6', 'Commercial 1050 / 1100'],
    dimensions: 'Sheets: 0.8 mm to 60.0 mm | Solid Rods: 6.0 mm to 300 mm Diameter | Standard Length: 3000mm - 6000mm',
    standards: ['ASTM B209 (Sheets)', 'ASTM B221 (Rods)', 'EN 573-3', 'IS 737 / IS 733'],
    finishes: ['Mill Finish', 'Anodized Clear / Black / Champagne', '5-Bar Diamond Chequered', 'Machine Polished'],
    applications: ['Precision aerospace & defense components', 'Architectural facades & curtain wall panels', 'Transport tankers & anti-slip vehicle flooring', 'CNC machined tooling jigs & fixtures'],
    inStock: true,
    specsSummary: '6061-T6 / 5052 / 6082 • Sheets & Solid Rods • Anodized / Mill',
  },
  {
    id: 'titanium-product',
    itemNumber: '06',
    name: 'TITANIUM PRODUCT',
    subtitle: 'High-Performance Aerospace & Industrial Titanium Sheets, Plates & Bars',
    category: 'titanium',
    categoryLabel: 'Titanium Alloys',
    image: '/assets/images/titanium_products_1794209411212.jpg',
    description: 'Superior strength-to-weight ratio titanium products offering immunity to saltwater corrosion and extreme chemical attack. Supplied with certified ultrasonic testing and mill test certificates.',
    grades: ['Titanium Grade 1 (CP)', 'Titanium Grade 2 (CP Commercial Pure)', 'Titanium Grade 5 (Ti-6Al-4V)', 'Grade 7 (Ti-0.15Pd)', 'Grade 12'],
    dimensions: 'Sheets: 0.5 mm to 25.0 mm | Round Bars: 5.0 mm to 200 mm Diameter | Cut billets and forged discs',
    standards: ['ASTM B265 (Sheets & Plates)', 'ASTM B348 (Bars & Billets)', 'AMS 4911', 'AMS 4928'],
    finishes: ['Acid Pickled / Descaled', 'Bright Ground & Polished', 'Smooth Machined'],
    applications: ['Chemical chlorination & acid reactor vessels', 'Subsea offshore oil & gas extraction equipment', 'Aerospace structural airframes & turbine components', 'Medical surgical implants & prosthetic fixtures'],
    inStock: true,
    specsSummary: 'Grade 2 & Grade 5 (Ti-6Al-4V) • High-Corrosion Resistance • ASTM B265/B348',
  },
  {
    id: 'ss-round-bar',
    itemNumber: '07',
    name: 'STAINLESS STEEL ROUNDS BAR',
    subtitle: 'Bright Drawn, Centerless Ground & Turned Stainless Steel Round Bars',
    category: 'stainless-steel',
    categoryLabel: 'Stainless Steel',
    image: '/assets/images/ss_round_bars_1794209412255.jpg',
    description: 'Precision straight stainless steel round bars manufactured to stringent h9, h11, and k12 dimensional tolerances for precision CNC turning, pump shafting, and industrial fastener manufacturing.',
    grades: ['SS 304', 'SS 304L', 'SS 316', 'SS 316L', 'SS 310S', 'SS 410', 'SS 416', 'SS 420', 'SS 431', '17-4PH (AISI 630)'],
    dimensions: 'Diameter: 3.0 mm to 350.0 mm | Tolerance: ISO h8, h9, h11 | Length: 3 to 6 Meters with chamfered ends',
    standards: ['ASTM A276', 'ASTM A479', 'EN 10088-3', 'IS 6603', 'DIN 1013'],
    finishes: ['Bright Cold Drawn', 'Centerless Ground & Polished', 'Smooth Turned & Peeled', 'Hot Rolled Annealed & Pickled (HRAP)'],
    applications: ['CNC turned mechanical precision parts', 'High-pressure pump shafts & valve stems', 'Heavy-duty industrial bolts, nuts & threaded rods', 'Marine propeller shafts & hardware'],
    inStock: true,
    specsSummary: '3mm - 350mm Dia • h9 / h11 Tolerance • 304 / 316L / 17-4PH',
  },
  {
    id: 'ss-pipes-tubes',
    itemNumber: '08',
    name: 'STAINLESS STEEL PIPES & TUBES',
    subtitle: 'Seamless & High-Frequency Welded SS Pipes, Square & Rectangular Tubes',
    category: 'stainless-steel',
    categoryLabel: 'Stainless Steel',
    image: '/assets/images/ss_pipes_tubes_1794209432429.jpg',
    description: 'Comprehensive inventory of seamless process pipes, welded fluid conduits, and ornamental architectural square and rectangular hollow sections for fluid conveying and structural frameworks.',
    grades: ['ASTM A312 TP304 / 304L', 'ASTM A312 TP316 / 316L', 'TP321', 'ASTM A269 (Instrumentation)', 'ASTM A554 (Ornamental / Architectural)'],
    dimensions: 'Pipes: 1/8" NB to 24" NB (Schedule 5S, 10S, 40S, 80S, 160S, XXS) | Tubes: 10x10mm up to 200x200mm box section',
    standards: ['ASME B36.19M', 'ASME B36.10M', 'ASTM A312', 'ASTM A269', 'DIN 17456 / 17458'],
    finishes: ['Annealed & Pickled', '320-Grit Satin Hairline', '600-Grit Optical Mirror', 'Dairy Sanitary Electropolished ID/OD'],
    applications: ['High-pressure fluid & gas transportation lines', 'Heat exchangers & condenser coils', 'Architectural stair railing posts & handrails', 'Pharmaceutical cleanroom hygienic piping'],
    inStock: true,
    specsSummary: '1/8" - 24" NB • Sch 10 to 160 • Seamless & Welded • A312 & A554',
  },
  {
    id: 'ss-pipe-fittings',
    itemNumber: '09',
    name: 'SS PIPE FITTINGS',
    subtitle: 'Butt-Weld, Forged Socket-Weld & Screwed Stainless Steel Pipe Fittings',
    category: 'stainless-steel',
    categoryLabel: 'Stainless Steel',
    image: '/assets/images/precision_pipe_fittings_1793956287823.jpg',
    description: 'Heavy-duty butt-weld elbows, equal & reducing tees, concentric & eccentric reducers, pipe stub ends, and 3000#/6000# high-pressure screwed and socket-weld fittings.',
    grades: ['ASTM A403 WP304 / WP304L', 'ASTM A403 WP316 / WP316L', 'WP321', 'WP347', 'Duplex 2205 (S31803)'],
    dimensions: 'Butt-Weld: 1/2" NB to 24" NB (Sch 10S to Sch XXS) | Forged Screwed/Socket-Weld: 1/4" to 4" (3000# & 6000#)',
    standards: ['ASME/ANSI B16.9 (Butt Weld)', 'ASME B16.11 (Forged Socket Weld & Screwed)', 'MSS-SP-43', 'DIN 2605 / 2615'],
    finishes: ['Shot Blasted & Pickled', 'Machined Beveled Ends (37.5° for welding)', 'Mirror Polished Sanitary Fitting'],
    applications: ['Directional flow change (Elbows 45°/90°/180°)', 'Branch connections (Equal & Reducing Tees)', 'Piping diameter transitions (Reducers)', 'Industrial chemical processing lines'],
    inStock: true,
    specsSummary: 'Butt-Weld & Forged 3000# • Elbows, Tees, Reducers • WP304/WP316L',
  },
  {
    id: 'ss-flat-bar',
    itemNumber: '10',
    name: 'STAINLESS STEEL FLATE BAR',
    subtitle: 'Hot Rolled Annealed & Pickled (HRAP) & Cold Drawn SS Flat Bars',
    category: 'stainless-steel',
    categoryLabel: 'Stainless Steel',
    image: '/assets/images/ss_flat_bars_1794209411215.jpg',
    description: 'True hot-rolled and cold-drawn stainless steel flat bars with square edges, uniform thickness, and clean mill surfaces. Specially processed to eliminate bowing and edge camber.',
    grades: ['SS 304', 'SS 304L', 'SS 316', 'SS 316L', 'SS 202', 'SS 310S'],
    dimensions: 'Width: 10 mm to 150 mm | Thickness: 3.0 mm to 25.0 mm | Length: 3 to 6 Meters (Custom Cut Available)',
    standards: ['ASTM A276', 'ASTM A479', 'DIN 1017', 'IS 6603'],
    finishes: ['Hot Rolled Annealed & Pickled (HRAP)', 'Cold Drawn Bright Finish', 'Slit & Edge Conditioned / Deburred'],
    applications: ['Structural base plates & connection brackets', 'Architectural balustrade stanchions & trim strips', 'Industrial floor grating crossbars', 'Equipment frame bracing & fabrication supports'],
    inStock: true,
    specsSummary: '10x3mm up to 150x25mm • HRAP & Cold Drawn • 304 & 316L',
  },
  {
    id: 'ss-structure',
    itemNumber: '11',
    name: 'STAINLESS STEEL STRUCTURE',
    subtitle: 'Structural Stainless Steel Angles, Channels, Beams & Fabricated Sections',
    category: 'structural',
    categoryLabel: 'Structural Steel',
    image: '/assets/images/ss_structure_beams_1794209453745.jpg',
    description: 'Heavy structural stainless steel sections including Equal Angles (ISA), Unequal Angles, Channels (ISMC), H-Beams, I-Beams, and custom box columns for corrosive environment structures.',
    grades: ['SS 304 / 304L', 'SS 316 / 316L', 'Duplex 2205 (S32205)', 'IS 2062 Structural Steel Equivalents'],
    dimensions: 'Angles: 20x20x3mm up to 150x150x16mm | Channels: 75x40mm up to 300x90mm | Beams up to 300mm depth',
    standards: ['ASTM A276', 'ASTM A1069', 'EN 10088-3', 'DIN 1028 (Angles)', 'DIN 1026 (Channels)'],
    finishes: ['Hot Rolled Annealed & Pickled', 'Laser-Fused Precision Structural Section', 'Welded Profile Finish'],
    applications: ['Coastal & marine architectural framing', 'Chemical plant pipe racks & equipment skids', 'Cleanroom mezzanine platforms & walkways', 'Heavy facade curtain wall sub-structures'],
    inStock: true,
    specsSummary: 'Angles, Channels, H-Beams • Laser-Fused & HRAP • 304 & 316L',
  },
];

export const QUALITY_CERTIFICATIONS = OFFICIAL_CERTIFICATES;

export const FAQS = [
  {
    q: 'What is the fabrication and delivery timeline for custom architectural work?',
    a: 'Typical lead time is 15 to 25 working days. This includes detailed 3D CAD modeling, material procurement, CNC laser cutting, rolling, workshop pre-assembly, finishing, and on-site laser-guided installation.',
  },
  {
    q: 'Do you supply certified raw materials with Mill Test Certificates (MTC)?',
    a: 'Yes, all our stainless steel sheets, coils, pipes, fittings, flanges, aluminium, copper, and titanium are supplied with genuine Mill Test Certificates (EN 10204 3.1) and complete chemical and mechanical test reports.',
  },
  {
    q: 'Where is Pioneer Fab Tech located, and do you service sites outside Vasai-Virar?',
    a: 'Our central fabrication workshop is located at S.No.233 H.No.2 Shop No.03 Jay Ambe Chawl Lake Vasai Virar, Palghar (Maharashtra 401208). We actively execute projects across Mumbai, Thane, Navi Mumbai, Pune, Nashik, and select interstate high-end architectural sites.',
  },
  {
    q: 'What materials and finishes do you provide for decorative partition screens?',
    a: 'We work primarily with SS 304, SS 316, Brass, and architectural aluminum. Finishes include Titanium Gold Mirror, Rose Gold Hairline, Black Titanium, Antique Bronze, and specialized outdoor powder coating.',
  },
  {
    q: 'Can I upload our architect’s CAD or PDF drawing for a quotation?',
    a: 'Yes! You can use our "Project Enquiry Form" on this website to upload your CAD, PDF, or reference sketch. You can also directly WhatsApp us your drawings at +91 90295 55233 for immediate evaluation.',
  },
  {
    q: 'Do you handle on-site installation and fitting?',
    a: 'Yes, 100%. We have our own certified team of site engineers, riggers, and welders who perform precise site measurements, mechanical anchoring, glass installation, and final clean handover.',
  },
];

