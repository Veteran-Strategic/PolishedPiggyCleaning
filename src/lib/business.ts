export const PHONE_DISPLAY = "(513) 223-3210";
export const PHONE_HREF = "tel:+15132233210";
export const HOURS_DISPLAY = "Mon–Sat, 9:00 AM–6:00 PM";
export const HOURS_SHORT = "Mon–Sat 9–6";
export const HEADLIGHT_PRICE = 125;
export const HEADLIGHT_PRICE_LABEL = "$125";
export const HEADLIGHT_DURATION = "under 30 minutes";

export const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/thepolishedpiggy",
    handle: "@thepolishedpiggy",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61593426174066",
    handle: "The Polished Piggy",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@thepolishedpiggy",
    handle: "@thepolishedpiggy",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@polishedpiggydetailing",
    handle: "@polishedpiggydetailing",
  },
] as const;

export const SERVICE_IDS = [
  "interior",
  "exterior",
  "detailing",
  "headlights",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SIZE_IDS = ["sedan", "suv", "truck"] as const;
export type SizeId = (typeof SIZE_IDS)[number];

export const ADDON_IDS = ["clay", "correction", "headlights"] as const;
export type AddonId = (typeof ADDON_IDS)[number];

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
  interior: {
    id: "interior",
    name: "Interior",
    eyebrow: "Inside",
    price: 155,
    priceLabel: "from $155",
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
    name: "Exterior",
    eyebrow: "Outside",
    price: 100,
    priceLabel: "from $100",
    duration: "about 1–2 hours",
    blurb: "Foam, hand wash, wheels, tires, glass, and a spray sealant.",
    includes: [
      "Pre-rinse and hand wash",
      "Wheels, wheel wells, and tire dressing",
      "Exterior glass",
      "Spray sealant on the paint",
    ],
  },
  detailing: {
    id: "detailing",
    name: "Full detail",
    eyebrow: "Both",
    price: 225,
    priceLabel: "from $225",
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
  headlights: {
    id: "headlights",
    name: "Headlights",
    eyebrow: "Restore",
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

export const SIZES: Record<
  SizeId,
  { id: SizeId; name: string; hint: string }
> = {
  sedan: {
    id: "sedan",
    name: "Sedan / coupe",
    hint: "Daily cars. No third row.",
  },
  suv: {
    id: "suv",
    name: "Small / midsize SUV",
    hint: "CR-V, RAV4, Equinox, most crossovers.",
  },
  truck: {
    id: "truck",
    name: "Truck / full-size SUV / van",
    hint: "F-150, Tahoe, minivan, three-row.",
  },
};

export const SERVICE_PRICES: Record<
  Exclude<ServiceId, "headlights">,
  Record<SizeId, number>
> = {
  interior: { sedan: 155, suv: 185, truck: 225 },
  exterior: { sedan: 100, suv: 125, truck: 155 },
  detailing: { sedan: 225, suv: 275, truck: 335 },
};

export const ADDONS: Record<
  AddonId,
  {
    id: AddonId;
    name: string;
    blurb: string;
    prices: Record<SizeId, number>;
    services: ServiceId[];
  }
> = {
  clay: {
    id: "clay",
    name: "Clay bar",
    blurb: "Pulls embedded grit off the paint before protection.",
    prices: { sedan: 50, suv: 65, truck: 80 },
    services: ["exterior", "detailing"],
  },
  correction: {
    id: "correction",
    name: "Paint correction",
    blurb: "Light cut for swirls. Heavier work is quoted on site.",
    prices: { sedan: 250, suv: 300, truck: 350 },
    services: ["exterior", "detailing"],
  },
  headlights: {
    id: "headlights",
    name: "Headlight restoration",
    blurb: `Add the ${HEADLIGHT_PRICE_LABEL} restore while we are already there.`,
    prices: { sedan: HEADLIGHT_PRICE, suv: HEADLIGHT_PRICE, truck: HEADLIGHT_PRICE },
    services: ["interior", "exterior", "detailing"],
  },
};

export type QuoteSearch = {
  service?: ServiceId;
  size?: SizeId;
  addons?: string;
};

export function isServiceId(value: unknown): value is ServiceId {
  return (
    typeof value === "string" &&
    (SERVICE_IDS as readonly string[]).includes(value)
  );
}

export function isSizeId(value: unknown): value is SizeId {
  return typeof value === "string" && (SIZE_IDS as readonly string[]).includes(value);
}

export function isAddonId(value: unknown): value is AddonId {
  return (
    typeof value === "string" &&
    (ADDON_IDS as readonly string[]).includes(value)
  );
}

export function packageFor(service?: string | null): ServicePackage | null {
  if (!service || !isServiceId(service)) return null;
  return PACKAGES[service];
}

export function parseQuoteSearch(search: Record<string, unknown>): QuoteSearch {
  const next: QuoteSearch = {};
  if (isServiceId(search.service)) next.service = search.service;
  if (isSizeId(search.size)) next.size = search.size;
  if (typeof search.addons === "string" && search.addons.length) {
    next.addons = parseAddons(search.addons).join(",") || undefined;
  }
  return next;
}

export function parseAddons(raw?: string | null): AddonId[] {
  if (!raw) return [];
  const seen = new Set<AddonId>();
  for (const part of raw.split(",")) {
    const id = part.trim();
    if (isAddonId(id)) seen.add(id);
  }
  return ADDON_IDS.filter((id) => seen.has(id));
}

export function addonsParam(ids: AddonId[]): string | undefined {
  return ids.length ? ids.join(",") : undefined;
}

export function availableAddons(service?: ServiceId): AddonId[] {
  if (!service || service === "headlights") return [];
  return ADDON_IDS.filter((id) => ADDONS[id].services.includes(service));
}

export function needsSize(service?: ServiceId): boolean {
  return Boolean(service && service !== "headlights");
}

export function money(n: number): string {
  return `$${n}`;
}

export function servicePrice(service: ServiceId, size: SizeId = "sedan"): number {
  if (service === "headlights") return HEADLIGHT_PRICE;
  return SERVICE_PRICES[service][size];
}

export function quoteTotal(
  service?: ServiceId,
  size?: SizeId,
  addonIds: AddonId[] = [],
): number | null {
  if (!service) return null;
  if (needsSize(service) && !size) return null;
  const sizeKey = size ?? "sedan";
  let total = servicePrice(service, sizeKey);
  for (const id of availableAddons(service)) {
    if (!addonIds.includes(id)) continue;
    total += ADDONS[id].prices[sizeKey];
  }
  return total;
}

export function quoteReady(service?: ServiceId, size?: SizeId): boolean {
  if (!service) return false;
  if (needsSize(service) && !size) return false;
  return true;
}

export function quoteSummary(
  service?: ServiceId,
  size?: SizeId,
  addonIds: AddonId[] = [],
): string {
  if (!service) return "Mobile visit";
  const pkg = PACKAGES[service];
  const bits = [pkg.name];
  if (size && needsSize(service)) bits.push(SIZES[size].name);
  const allowed = availableAddons(service);
  for (const id of addonIds) {
    if (allowed.includes(id)) bits.push(ADDONS[id].name);
  }
  const total = quoteTotal(service, size, addonIds);
  if (total != null) bits.push(money(total));
  return bits.join(" · ");
}
