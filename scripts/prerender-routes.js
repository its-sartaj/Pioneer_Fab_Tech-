import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const BASE_DOMAIN = 'https://www.pioneerfabtech.com';

const ROUTE_META = {
  about: {
    title: 'About Us | Pioneer Fab Tech - 14+ Years Industrial & Architectural Fabrication Excellence',
    description:
      'About Pioneer Fab Tech: ISO 9001 metal fabrication workshop in Vasai-Virar with 14+ years experience, 850+ projects delivered, and 620+ satisfied clients.',
    keywords:
      'about Pioneer Fab Tech, metal fabrication company Vasai, architectural metal fabricators Mumbai, industrial engineering Maharashtra, metal fabrication workshop Vasai East',
    canonical: `${BASE_DOMAIN}/about`,
  },
  services: {
    title: 'Our Services | Spiral Staircases, CNC Laser Cutting & SS Railings - Pioneer Fab Tech',
    description:
      'Explore precision fabrication: architectural spiral staircases, CNC laser cutting, SS 304/316 & glass railings, elevator cladding, and steel PEB sheds.',
    keywords:
      'metal fabrication services Mumbai, laser cutting service Vasai, spiral staircase maker Mumbai, SS glass railing installation, lift cladding contractors, industrial PEB shed fabrication',
    canonical: `${BASE_DOMAIN}/services`,
  },
  projects: {
    title: 'Projects Portfolio | Hyatt Hotels, Malls & Luxury Villas - Pioneer Fab Tech',
    description:
      'Browse 850+ completed projects by Pioneer Fab Tech: Hyatt Regency Delhi, Hyatt Place Pune, Grand Hyatt Gurgaon, malls, and luxury architectural work.',
    keywords:
      'Pioneer Fab Tech projects, Hyatt hotel fabrication Delhi Pune, luxury spiral staircase projects, commercial metal facade projects, hotel lift cladding contractor',
    canonical: `${BASE_DOMAIN}/projects`,
  },
  gallery: {
    title: 'Work Gallery | Real Fabrication Project Photos - Pioneer Fab Tech',
    description:
      'Explore our real fabrication gallery: architectural spiral staircases, CNC laser cut jaali, luxury gates, elevator cladding, and SS glass railings.',
    keywords:
      'metal fabrication photo gallery, spiral staircase designs, laser cut jaali photos, stainless steel railing gallery, lift cladding pictures Mumbai',
    canonical: `${BASE_DOMAIN}/gallery`,
  },
  materials: {
    title: 'Material Supply | Prime Certified SS, MS, Aluminum & Brass - Pioneer Fab Tech',
    description:
      'Certified metal supply in Mumbai & Vasai: SS 304/316 coils, sheets, pipes, round & flat bars, structural beams, copper, aluminium, and titanium products.',
    keywords:
      'stainless steel supplier Vasai Mumbai, SS 304 316 coil supplier, mild steel plate supplier Maharashtra, aluminum section distributor, industrial metal supply Mumbai',
    canonical: `${BASE_DOMAIN}/materials`,
  },
  infrastructure: {
    title: 'Factory Infrastructure & Machinery | CNC Laser & Bending - Pioneer Fab Tech',
    description:
      'Tour Pioneer Fab Tech Vasai workshop: CNC fiber laser cutting machines, hydraulic press brakes, argon TIG/MIG welding bays, and 5-ton overhead handling.',
    keywords:
      'metal fabrication factory Vasai, fiber laser cutting machine, CNC press brake bending Mumbai, argon welding workshop, industrial fabrication plant Maharashtra',
    canonical: `${BASE_DOMAIN}/infrastructure`,
  },
  certificates: {
    title: 'Certifications & Quality Compliance | ISO Standard - Pioneer Fab Tech',
    description:
      'Pioneer Fab Tech official compliance: Udyam MSME registration, GSTIN, PTEC credentials, Mill Test Certificates (MTC), and ISO 9001 fabrication quality.',
    keywords:
      'Pioneer Fab Tech certificates, ISO certified metal fabricator Mumbai, welding quality standards, metal mill test certificate, industrial compliance',
    canonical: `${BASE_DOMAIN}/certificates`,
  },
  contact: {
    title: 'Contact Us & Free Quote | Vasai-Virar, Palghar, Mumbai - Pioneer Fab Tech',
    description:
      'Contact Pioneer Fab Tech at Jay Ambe Chawl Lake, Vasai-Virar, Maharashtra for quotes, drawings, and site visits. Call or WhatsApp +91 90295 55233 today.',
    keywords:
      'contact Pioneer Fab Tech, metal fabricator phone number Mumbai, Vasai metal fabrication contact, free fabrication quote Mumbai Palghar',
    canonical: `${BASE_DOMAIN}/contact`,
  },
  enquiry: {
    title: 'Request a Free Quote | Architectural & Industrial Fabrication - Pioneer Fab Tech',
    description:
      'Submit your CAD drawings, dimensions, or fabrication BOQ to Pioneer Fab Tech for a fast project estimate and free site consultation across Mumbai & Thane.',
    keywords:
      'metal fabrication estimate, request fabrication quote Mumbai, architectural metal quote, laser cutting rate Vasai, spiral staircase price quote',
    canonical: `${BASE_DOMAIN}/enquiry`,
  },
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceMetaAttr(html, attrName, attrValue, newContent) {
  const escapedContent = escapeHtml(newContent);
  const re = new RegExp(
    `(<meta\\s+${attrName}=["']${attrValue}["']\\s+content=["'])[^"']*(["']\\s*/?>)`,
    'i'
  );
  return html.replace(re, `$1${escapedContent}$2`);
}

function main() {
  const baseHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error(`[prerender-routes] Missing built HTML at ${baseHtmlPath}`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  for (const [route, meta] of Object.entries(ROUTE_META)) {
    let html = baseHtml;

    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
    html = replaceMetaAttr(html, 'name', 'description', meta.description);
    html = replaceMetaAttr(html, 'name', 'keywords', meta.keywords);
    html = replaceMetaAttr(html, 'property', 'og:title', meta.title);
    html = replaceMetaAttr(html, 'property', 'og:description', meta.description);
    html = replaceMetaAttr(html, 'property', 'og:url', meta.canonical);
    html = replaceMetaAttr(html, 'name', 'twitter:title', meta.title);
    html = replaceMetaAttr(html, 'name', 'twitter:description', meta.description);
    html = html.replace(
      /(<link\s+rel=["']canonical["']\s+href=["'])[^"']*(["']\s*\/?>)/i,
      `$1${escapeHtml(meta.canonical)}$2`
    );

    const routeDir = path.join(distDir, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
  }

  // SPA fallback for deep item URLs (e.g. /projects/proj-mall-01) & GitHub Pages .nojekyll
  fs.writeFileSync(path.join(distDir, '404.html'), baseHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');

  console.log(
    `[prerender-routes] Generated static HTML for ${Object.keys(ROUTE_META).length} routes + 404.html/.nojekyll in dist/`
  );
}

main();
