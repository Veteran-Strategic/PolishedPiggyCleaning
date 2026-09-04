export const PHONE_DISPLAY = "(513) 223-3210";
export const PHONE_HREF = "tel:+15132233210";
export const HOURS_DISPLAY = "Mon–Sat, 9:00 AM–6:00 PM";
export const HOURS_SHORT = "Mon–Sat 9–6";
export const HEADLIGHT_PRICE = 125;
export const HEADLIGHT_PRICE_LABEL = "$125";
export const HEADLIGHT_DURATION = "under 30 minutes";

export const SERVICE_IDS = [
  "detailing",
  "interior",
  "exterior",
  "headlights",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export type ServicePackage = {
  id: ServiceId;
  name: string;
  eyebrow: string;
  price: number;
  priceLabel: string;
  duration: string;
  blurb: string;
  includes: string[];
};

export const PACKAGES: Record<ServiceId, ServicePackage> = {
  detailing: {
    id: "detailing",
    name: "Full detail",
    eyebrow: "Most booked",
    price: 229,
    priceLabel: "from $229",
    duration: "about 2.5–4 hours",
    blurb:
      "Interior and exterior in one visit. The daily driver looks cared for again.",
    includes: [
      "Hand wash, wheels, tires, and glass",
      "Vacuum, wipe-down, and interior glass",
      "Mats, jambs, and a light protectant",
      "We come to your driveway",
    ],
  },
  interior: {
    id: "interior",
    name: "Interior detail",
    eyebrow: "Inside",
    price: 149,
    priceLabel: "from $149",
    duration: "about 1.5–2.5 hours",
    blurb: "Cabin reset. Vacuum, surfaces, glass, and the spots people actually touch.",
    includes: [
      "Full vacuum of seats, carpets, and cargo",
      "Wipe-down of dash, doors, and console",
      "Interior glass and floor mats",
      "Leather or vinyl treated when it is there",
    ],
  },
  exterior: {
    id: "exterior",
    name: "Exterior wash",
    eyebrow: "Outside",
    price: 99,
    priceLabel: "from $99",
    duration: "about 1–2 hours",
    blurb: "Foam, hand wash, wheels, tires, glass, and a spray sealant.",
    includes: [
      "Pre-rinse and hand wash",
      "Wheels, wheel wells, and tire dressing",
      "Exterior glass",
      "Spray sealant on the paint",
    ],
  },
  headlights: {
    id: "headlights",
    name: "Headlight restoration",
    eyebrow: "The ad offer",
    price: HEADLIGHT_PRICE,
    priceLabel: HEADLIGHT_PRICE_LABEL,
    duration: HEADLIGHT_DURATION,
    blurb: "Cloudy to clear. Matched and sealed in your driveway.",
    includes: [
      HEADLIGHT_PRICE_LABEL,
      `Most visits take ${HEADLIGHT_DURATION}`,
      "Restore and seal the lenses",
      "Insured. We come to you.",
    ],
  },
};

export function isServiceId(value: unknown): value is ServiceId {
  return (
    typeof value === "string" &&
    (SERVICE_IDS as readonly string[]).includes(value)
  );
}

export function packageFor(service?: string | null): ServicePackage | null {
  if (!service || !isServiceId(service)) return null;
  return PACKAGES[service];
}
