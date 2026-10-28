/**
 * All website copy, taken from the Green Energy Resources company profile (01/12/2025).
 * Edit here – components only render this data.
 */

export const COMPANY = {
  name: 'Green Energy Resources',
  short: 'GER',
  legalName: 'Green Energy Resources Pte Ltd',
  parent: 'GPP Resources Berhad',
  parentListing: 'LEAP Market, Bursa Malaysia',
  founded: 2008,
  tagline: 'Biogas, gas engines and combined heat & power for Southeast Asia.',
  intro:
    'Green Energy Resources (GER) is a wholly owned subsidiary of GPP Resources Berhad, listed on the LEAP Market of Bursa Malaysia. Established in 2008, our management team brings more than 25 years of experience serving palm oil mills, food waste and animal husbandry operations.',
  intro2:
    'We engineer with German products and technologies, assembled under licence in Malaysia. GER is recognised by the Sustainable Energy Development Authority (SEDA) Malaysia as a local manufacturer and assembler of gas engines for Feed-in Tariff projects, and is listed by the Malaysian Palm Oil Board (MPOB) as a biogas technology provider.',
}

export const STATS = [
  { value: 25, suffix: '+', label: 'Years of management experience' },
  { value: 20, suffix: '+', label: 'POME biogas projects delivered' },
  { value: 6, suffix: '', label: 'Countries with GER projects' },
  { value: 8409, suffix: '', label: 'Running hours in a year (350 of 365 days)' },
]

export const CREDENTIALS = [
  {
    title: '1 of 7 approved engine assemblers',
    body: 'Approved under the SEDA Feed-in Tariff scheme with a 5 sen incentive on MAN gen-sets. Siemens gen-sets pending approval.',
  },
  { title: 'SEDA recognised', body: 'Local manufacturer / assembler of gas engines for F.I.T. projects.' },
  { title: 'MPOB listed', body: 'Listed by the Malaysian Palm Oil Board as a biogas technology provider.' },
]

export const PORTFOLIO_SUMMARY = [
  '20+ POME biogas projects',
  '1 MSW collaboration project',
  '2 animal waste-to-energy projects',
  '6+ power generating units for oil & gas majors',
]

export const TECHNOLOGIES = [
  {
    icon: 'leaf',
    title: 'Biological scrubber',
    body: 'Proprietary biological gas treatment removes hydrogen sulphide from raw biogas before it reaches the engine.',
  },
  {
    icon: 'drop',
    title: 'Stainless-steel biogas dryer',
    body: 'Proprietary dryer with coalescing elements strips moisture so engines run on clean, dry gas.',
  },
  {
    icon: 'bolt',
    title: 'German gas engines, assembled in Malaysia',
    body: 'MAN and Siemens gas engines assembled at our Johor Bahru factory, with local spare parts on hand.',
  },
  {
    icon: 'chip',
    title: 'In-house control software',
    body: 'Links directly to client SCADA for better control and monitoring, plus on-demand troubleshooting.',
  },
]

export const CHP = {
  title: 'Combined heat and power',
  body: 'Fossil-fuelled power plants in Malaysia average around 32–42% efficiency, so roughly two-thirds of the energy is lost as heat. CHP captures that heat for hot water, space heating, cooling and industrial processes.',
  bars: [
    { label: 'Conventional power plant', from: 32, to: 42, tone: 'muted' as const },
    { label: 'CHP system (typical)', from: 60, to: 80, tone: 'primary' as const },
    { label: 'CHP system (best case)', from: 85, to: 90, tone: 'accent' as const },
  ],
  exchanger:
    'Our pin-tube heat exchanger gives about seven times the heat-transfer area of a plain tube of the same length. Turbulent flow around the pins keeps breaking the boundary layer, so heat transfer stays high and the surface is largely self-cleaning.',
  module: ['Genset', 'Exhaust gas heat exchanger', 'Heating circuit heat exchanger', 'Oxidation catalyst', 'Dry coolers (HT / LT)', 'Control cabinet', 'Ventilation system'],
}

export const BIOGAS_FACTS = [
  { value: '1.5 m³', label: 'Biogas per day from one 500 kg cow, about one litre of heating oil' },
  { value: '6,000–12,000 m³', label: 'Biogas per hectare per year from energy crops' },
]

export const PARTNERS = [
  {
    role: 'Gas engine partner',
    name: 'MAN',
    body: 'One of Europe’s leading commercial vehicle and mechanical engineering groups. Founded in 1758, MAN built its first engine in 1915 and produced over 80,000 engines in 2017 alone.',
  },
  {
    role: 'Gas production partner',
    name: 'LIPP',
    body: 'German technology provider for GER’s tank-digestion biogas plants. LIPP built Germany’s first biogas power plant in 1970 and has since delivered hundreds worldwide.',
  },
  {
    role: 'Gas engine partner',
    name: 'Siemens',
    body: 'Siemens gas engines assembled in Johor Bahru, with SEDA F.I.T. approval pending.',
  },
]

export const ADVANTAGES = [
  {
    icon: 'pin',
    title: 'Local assembly, local parts',
    body: 'Engines assembled in Malaysia with spare-parts warehouses in Singapore, Johor Bahru and Sandakan.',
  },
  {
    icon: 'shield',
    title: 'Fixed OPEX at RM0.04 / kWh',
    body: 'Strong support from an experienced team, with operating costs fixed for predictable returns.',
  },
  {
    icon: 'chip',
    title: 'Connected to your SCADA',
    body: 'In-house control software for direct SCADA linkage, remote monitoring and on-demand troubleshooting.',
  },
]

export const ACHIEVEMENTS = [
  { value: '8,409 h', label: 'Running hours in a year (350 of 365 days), Jinan' },
  { value: '10 years', label: 'Continuous operation, Mill 1 & 2 Tawau' },
  { value: '6 years', label: 'Service & maintenance, Jinan' },
]

export type ProjectCategory = 'epcc' | 'ongoing' | 'sm' | 'boot' | 'oilgas'

export const PROJECT_CATEGORIES: { key: ProjectCategory; label: string; blurb: string }[] = [
  { key: 'epcc', label: 'EPCC completed', blurb: 'Engineering, procurement, construction & commissioning.' },
  { key: 'ongoing', label: 'Ongoing', blurb: 'Projects currently under construction.' },
  { key: 'sm', label: 'S&M concession', blurb: 'Plants we service and maintain under concession.' },
  { key: 'boot', label: 'BOOT concession', blurb: 'Build, own, operate and transfer.' },
  { key: 'oilgas', label: 'Oil & gas', blurb: 'Gas engine packages for the energy sector.' },
]

export interface Project {
  name: string
  type: string
  note?: string
}

const bpp = (mill: string): Project => ({ name: mill, type: 'Biogas power plant' })
const scrubber = (mill: string): Project => ({ name: mill, type: 'Bio-scrubber gas treatment' })

export const PROJECTS: Record<ProjectCategory, Project[]> = {
  epcc: [
    bpp('Sungei Kahang Palm Oil Mill'),
    bpp('Kim Loong Palm Oil Mill'),
    bpp('Foong Lee Palm Oil Mill'),
    bpp('Desa Kim Loong Palm Oil Mill'),
    bpp('KL Kepong Mill 1 & 2, Tawau'),
    scrubber('Kekayan Palm Oil Mill'),
    scrubber('Achi Jaya Palm Oil Mill'),
    scrubber('KLK Belitung Palm Oil Mill'),
    bpp('Kim Loong Sabah Palm Oil Mill'),
    bpp('Pitas Palm Oil Mill'),
    scrubber('IOI Syarimo Palm Oil Mill'),
    bpp('Wilmar Saremas Palm Oil Mill'),
    bpp('Wilmar Rekahalus Palm Oil Mill'),
    bpp('Wilmar Ribubonus Palm Oil Mill'),
    bpp('Wilmar Sabahmas Palm Oil Mill'),
    bpp('Wilmar Terusan Palm Oil Mill'),
    bpp('Wilmar Sri Kamusan Palm Oil Mill'),
    { name: 'Wilmar Terusan Palm Oil Mill', type: 'Biogas power plant', note: 'Phase 2' },
    { name: 'Wilmar Saremas Palm Oil Mill', type: 'Biogas power plant', note: 'Phase 2' },
    bpp('Syarikat Perusahaan Kilang Sawit Sdn Bhd'),
    scrubber('IOI Pamol Palm Oil Mill'),
    scrubber('IOI Gomali Palm Oil Mill'),
    { name: 'Eco Waste Singapore', type: 'SCADA control system' },
    bpp('Sungai Sugut Palm Oil Mill'),
    bpp('KLK Liberia Palm Oil Mill'),
    scrubber('IOI Morisem Palm Oil Mill'),
    bpp('IWK Gombak'),
    bpp('Asia Poly Seri Senggora Palm Oil Mill'),
  ],
  ongoing: [bpp('Seri Bandar Palm Oil Mill'), bpp('Kerdau Palm Oil Mill')],
  sm: [
    bpp('Wilmar Saremas 1 Palm Oil Mill'),
    bpp('Wilmar Saremas 2 Palm Oil Mill'),
    bpp('Wilmar Rekahalus Palm Oil Mill'),
    bpp('Wilmar Ribubonus Palm Oil Mill'),
    bpp('Wilmar Sabahmas Palm Oil Mill'),
    bpp('Wilmar Terusan Palm Oil Mill'),
    bpp('Wilmar Sri Kamusan Palm Oil Mill'),
    bpp('Wilmar Sapi Palm Oil Mill'),
    bpp('Syarikat Perusahaan Kilang Sawit Sdn Bhd'),
    bpp('Sri Senggora Palm Oil Mill'),
  ],
  boot: [
    { name: 'IOI Ladang Sabah Palm Oil Mill', type: 'Biogas power plant', note: 'Since 2015' },
    { name: 'Animal manure process plant, Yunlin', type: 'Biogas power plant', note: 'Since 2018' },
    { name: 'Bell Eco Power Sdn Bhd', type: 'Biogas power plant', note: 'Since 2019' },
    { name: 'Acropower Pte Ltd', type: 'Syngas power plant', note: 'Since 2021' },
  ],
  oilgas: [
    { name: 'South Sumatra Gas Distribution Station', type: 'Waukesha engines', note: '3 × 1.0 MW · 3 × 550 kW · 3 × 300 kW' },
    { name: 'Technic Offshore Engineering', type: 'Waukesha engine, acoustic container', note: '1 × 330 kW' },
    { name: 'Emerging EPC Sdn Bhd for TTCL Thailand', type: 'Siemens gas engine, acoustic container', note: '1 × 1.0 MW' },
  ],
}

export const CLIENTS = ['Wilmar', 'IOI Group', 'KLK', 'Kim Loong', 'Bell Group', 'Acromec', 'Indah Water', 'Asia Poly']

export const COUNTRIES = ['Malaysia', 'Singapore', 'Indonesia', 'Taiwan', 'Thailand', 'Liberia']

export const CONTACT = {
  person: 'Melvin Wee',
  address: '19 Woodlands Industrial Park E1, #01-04, Singapore 757719',
  phones: [
    { label: 'Malaysia', value: '+60 7 288 2202', href: 'tel:+6072882202' },
    { label: 'Singapore', value: '+65 6896 6736', href: 'tel:+6568966736' },
  ],
  email: 'melvin@greenenergyresources.asia',
  website: 'greenenergyresources.asia',
}

export const NAV = [
  { id: 'process', label: 'Process' },
  { id: 'technology', label: 'Technology' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
