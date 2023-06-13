export const POST_TABS = [
  ["Purpose", "Amaç"],
  ["Type", "Tür"],
  ["Categories", "KATEGORİLER"],
  ["Details", "Details"],
  ["Construction", "Construction"],
  ["Location", "Konum"],
  ["Images", "Images"],
  ["Features", "Features"],
  ["Services", "Services"],
  ["Preview", "Preview"],
];
export const AUCTION_TABS = [
  ["Purpose", "Amaç"],
  ["Information", "Information"],
  ["Images_subunit", "Images_subunit"],
  ["Preview_auction", "Preview_auction"],
];

export const PROPERTY_PURPOSE = [
  ["sell", "sat"],
  ["rent", "kirala"],
  ["buy", "satın Al"],
];
export const LISTING_TYPE = [
  ["Property", "Emlak"],
  ["subunit trading", "subunit trading"],
  ["auction file", "auction file"],
  ["bulk files", "bulk files"],
];
export const POST_MENU_VARIANTS = {
  open: (height = 1000) => ({
    clipPath: `circle(${height + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
export const PROPERTY_TYPES = [
  ["Residence", "Yerleşim"],
  ["Plot", "Arsa"],
  ["Commercial", "Ticari"],
];
export const PROPERTY_CATEGORIES = [
  ["House", "EV"],
  ["Guest House", "KONUK EVİ"],
  ["Flat", "DAİRE"],
  ["Hotel Suites", "SUIT OTEL"],
  ["Hostel", "PANSİYON"],
  ["Room", "ODA"],
  ["Shop", "DÜKKAN"],
  ["Office", "OFİS"],
  ["Warehouse", "DEPO"],
  ["Factory", "FABRİKA"],
  ["Building", "İNŞAAT"],
  ["Foodcourt", "YEMEK ALANI"],
  ["Plaza", "PLAZA"],
  ["Land", "ARAZİ"],
  ["Commercial", "TİCARİ"],
  ["Residential", "YERLEŞİM"],
  ["Agricultural Land", "TARIM ARAZİSİ"],
  ["Industrial Land", "SANAYİ ARAZİSİ"],
  ["Plot File", "Plot File"],
  ["Farmhouse", "ÇİFTLİK EVİ"],
];
export const PROPERTY_FEATURES = [
  ["TV Lounge", "TV Lounge"],
  ["Store Room", "Store Room"],
  ["Laundry Room", "Laundry Room"],
  ["Kitchen", "Kitchen"],
  ["Balcony", "Balcony"],
  ["Garden", "Garden"],
];
export const PROPERTY_SERVICES = [
  ["Electricity", "Electricity"],
  ["Gas", "Gas"],
  ["Water", "Water"],
  ["Maintenance", "Maintenance"],
  ["Security", "Security"],
  ["Sewerage", "Sewerage"],
];
export const PROPERTY_ATTRIBUTES = {
  TYPE: ["type", "Tür"],
  CATEGORY: ["category", "category"],
  FEATURES: ["features", "features"],
  SERVICES: ["services", "services"],
};
