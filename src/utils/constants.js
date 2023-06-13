import investmentShowcase1 from "../assets/home/investment/investmentShowcase1.png";
import investmentShowcase2 from "../assets/home/investment/investmentShowcase2.png";
import investmentShowcase3 from "../assets/home/investment/investmentShowcase3.png";
import investmentShowcase4 from "../assets/home/investment/investmentShowcase4.png";
import partnerLogo1 from "../assets/home/partners/partnerLogo1.png";
import partnerLogo2 from "../assets/home/partners/partnerLogo2.png";
import partnerLogo3 from "../assets/home/partners/partnerLogo3.png";
import partnerLogo4 from "../assets/home/partners/partnerLogo4.png";
import partnerLogo5 from "../assets/home/partners/partnerLogo5.png";
import partnerLogo6 from "../assets/home/partners/partnerLogo6.png";
import { ReactComponent as Facebook } from "../assets/icons/social/facebook.svg";
import { ReactComponent as Instagram } from "../assets/icons/social/instagram.svg";
import { ReactComponent as Twitter } from "../assets/icons/social/twitter.svg";
import { ReactComponent as LinkedIn } from "../assets/icons/social/linkedIn.svg";
import agent1 from "../assets/defaultAssets/defaultAgent1.png";
import agent2 from "../assets/defaultAssets/defaultAgent2.png";
import agent3 from "../assets/defaultAssets/defaultAgent3.png";
import post_1 from "../assets/home/footer/post_1.png";
import post_2 from "../assets/home/footer/post_2.png";
import floorPlan from "../assets/defaultAssets/floorPlan.png";
import Sunglass from "../assets/zSpehere/emojis/Sunglass.png";
import Angel from "../assets/zSpehere/emojis/Angel.png";
import Astonishment from "../assets/zSpehere/emojis/Astonishment.png";
import Boredom from "../assets/zSpehere/emojis/Boredom.png";
import Disappointed from "../assets/zSpehere/emojis/Disappointed.png";
import InLove from "../assets/zSpehere/emojis/InLove.png";
import Money from "../assets/zSpehere/emojis/Money.png";
import ToTears from "../assets/zSpehere/emojis/ToTears.png";
import Trouble from "../assets/zSpehere/emojis/Trouble.png";
import messageIcon from "../assets/settings/message.png";
import settingsIcon from "../assets/settings/setting.png";
import listingsIcon from "../assets/settings/listingsIcon.png";
import agentIcon from "../assets/settings/becomeAgent.png";
import savelistIcon from "../assets/settings/savelistIcon.png";
import residentialHover from "../assets/defaultAssets/residentialHover.png";
import commercialHover from "../assets/defaultAssets/commercialHover.png";
import plotHover from "../assets/defaultAssets/plotHover.png";
import watermark from "../assets/headerLogo.png";
import PersonIcon from "@mui/icons-material/Person";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export const MAX_IMAGE_SIZE = 4.5;
export const MAX_IMAGE_COUNT = 5;
export const MAX_IMAGE_FILE_NAME = 100;
export const CONTENT_WIDTH = 1000;
export const HEADER_CONTENT_WIDTH = 1440;
export const NEW_CONTENT_WIDTH = 1000;
export const API_URL = process.env.REACT_APP_SERVER_API;
export const SOCKET_API_URL = process.env.REACT_APP_SOCKET_SERVER_API;
export const AUCTIONS_SOCKET_API_URL = "wss://socket.zeerac.com/auction";
export const AUTH_KEY = "authentication";
export const NOT_VERIFIED_ERROR = "your account is not verified";
export const AGENTS_FILTER_QUERY = "?search=&city=&area=";
export const LANGUAGE_INDEX = "@langIndex";
export const FILTER_DRAWER_WIDTH = 340;
export const PROJECTS_DRAWER_WIDTH = "60vw";
export const PROJECTS_DRAWER_WIDTH_SM = "90vw";
export const ABOUT_US_DETAILS_1 = `asd `;
export const DEFAULT_SHADOW = "0px 0px 2px 0px rgba(0,0,0,0.75)";
export const INTRO_VIDEO_LINK =
  "https://zeerac-storage.sfo3.digitaloceanspaces.com/Zeerac%20Ad_Final%20Final%20Video.mp4";
export const MOBILE_VIDEO_LINK = `https://api.zeerac.com/static/Zeerac%20Ad_Mobile.mp4`;
export const ABOUT_US_DETAILS_2 = `
Donec maximus placerat tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse faucibus sed dolor eget posuere. Proin tincidunt fermentum arcu. Nam ac elementum nibh. Donec facilisis interdum orci sit amet ullamcorper. 
`;

export const USER_TYPES = {
  ADMIN: 0,
  USER: 1,
  AGENT: 2,
  CEO: 3,
  MODERATOR: 4,
};
export const VERIFICATION_STATUS = {
  VERIFIED: "verified",
  IN_PROGRESS: "in_progress",
  DECLINED: "declined",
  NOT_APPLIED: "not_applied",
};
export const SETTING_URLS = {
  PROFILE: "profile",
  CHAT: "messages",
  MY_LISTINGS: "my_listings",
  BECOME_AN_AGENT: "become_an_agent",
  REGISTER_AGENCY: "register_agency",
  SAVED_LISTINGS: "saved_listings",
};
export const APP_BAR_ITEMS = [
  {
    url: "/listings",
    label: ["Listings", "Listeler", "القوائم"],
  },
  {
    url: "/auctions?auction_type=single&sort_by=latest",
    label: ["Trading", "Trading", "Trading"],
  },

  {
    url: "/agents",
    label: ["Agents", "Ajanlar", "عملاء"],
  },
  {
    url: "/agencies",
    label: ["Agencies", "Ajans", "وكالة"],
  },
  {
    url: "/zSphere/Feed",
    label: ["Z-Sphere", "Z-Sphere", "Z-Sphere"],
  },
  {
    url: "/courses",
    label: ["Courses", "Courses", "Courses"],
  },
];
export const APP_BAR_EXTENDED_ITEMS = [
  {
    url: "/about-Us",
    label: ["About Us", "About Us", "About Us"],
  },
  {
    url: "/partners",
    label: ["Projects", "Projeler", "المشاريع"],
  },
  {
    url: "/comparison",
    label: ["Comparison", "Comparison", "Comparison"],
  },
  {
    url: `/settings/${SETTING_URLS.PROFILE}`,
    label: ["Settings", "Settings", "Settings"],
  },
  {
    url: "/investment",
    label: ["Budget", "Budget", "Budget"],
  },
];
export const SEARCH_OPTIONS = [
  {
    url: "/about-Us",
    label: ["About Us", "About Us", "About Us"],
  },
  {
    url: "/listings",
    label: ["Listings", "Listeler", "القوائم"],
  },
  {
    url: "/partners",
    label: ["Projects", "Projeler", "المشاريع"],
  },
  {
    url: "/agents",
    label: ["Agents", "Ajanlar", "عملاء"],
  },
  {
    url: "/comparison",
    label: ["Comparison", "Comparison", "Comparison"],
  },
  {
    url: "/settings",
    label: ["Settings", "Settings", "Settings"],
  },
];
export const TYPE_FILTERS = [
  "Commercial",
  "Plot",
  "House",
  "Rent",
  "Flat",
  "Plaza",
];
export const ABOUT_US_FILTERS = {
  FEATURES: "FEATURES",
  APPROACH: "APPROACH",
  TRACK: "TRACK",
};
export const REGIONS = {
  PAKISTAN: "pakistan",
  TURKEY: "turkey",
};
export const PROPERTY_SLIDER_SETTINGS = {
  slidesToShow: 3,
  slidesToScroll: 1,
  lazyLoad: false,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  arrows: false,
  style: { height: "100%", width: "100%" },
  dots: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const AGENTS_TABLE_COLUMNS = [
  ["Name", "Name"],
  ["Location", "Location"],
  ["Agency Association", "Agency Association"],
  ["Listings", "Listeler"],
];
export const EXPERIENCE_ENUM = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
];
export const AGENCIES_TABLE_COLUMNS = [
  ["Organization Name", "Organization Name"],
  ["Location", "Location"],
  ["Employees", "Employees"],
  ["Listings", "Listeler"],
];
export const LISTING_UNIT_FILTERS = [
  { label: ["Marla", "Marla"], value: "Marla" },
  { label: ["Square Feet", "Square Feet"], value: "Square Feet" },
  { label: ["Kanal", "Kanal"], value: "Kanal" },
];
export const AUCTION_UNIT_FILTERS = [
  { label: ["Marla", "Marla"], value: "marla" },
  { label: ["Square Feet", "Square Feet"], value: "sqft" },
  { label: ["Kanal", "Kanal"], value: "kanal" },
];
export const CURRENCY_ENUM = [
  { label: ["PKR", "PKR"], value: "PKR" },
  { label: ["USD", "USD"], value: "USD" },
  { label: ["TRY", "TRY"], value: "TRY" },
];
export const COUNTRY_POLYGON_IDS = {
  PAKISTAN: 23424922,
  TURKEY: 23424969,
};
export const COUNTRY_POLYGON_SELECT = [
  { value: 23424922, label: ["Pakistan", "Pakistan"] },
  { value: 23424969, label: ["Türkiye", "Türkiye"] },
];
export const SIZE_CONVERSION = [
  { value: "Marla", label: "Marla" },
  { value: "Kanal", label: "Kanal" },
  { value: "Square Feet", label: "Square Feet" },
];
export const AGENT_PAGINATION = {
  SEARCHED: "searched",
  ALL: "add",
};
export const GLOBE_TITLE = [
  { label: ["THE GLOBAL", "Küresel"], margin: 50 },
  { label: ["REAL ESTATE", "Gayrimenkul"], margin: 0 },
  { label: ["ECOSYSTEM", "Ekosistem"], margin: 100 },
];
export const HOME_FEATURE_FILTERS = [
  ["Properties", "Mülkler"],
  ["Agents", "Temsilciler"],
  ["Agencies", "Acentalar"],
];
export const REGIONAL_LISTINGS_FILTERS_LEFT = [
  ["Rent", "Kirala"],
  ["Buy", "Satın Al"],
  ["Sell", "Sat"],
];
export const PROJECT_FILTERS = [
  ["Residence", "Yerleşim"],
  ["Commercial", "Ticari"],
  ["Plot", "Arsa"],
];
export const REGIONAL_LISTINGS_FILTERS_MIDDLE = [
  ["New", "Yeni"],
  ["Top Trending", "En Trend Olan"],
  ["View All", "Hepsini Görüntüle"],
];
export const REGIONAL_LISTINGS_FILTERS_RIGHT = [
  ["Price", "Fiyat"],
  ["Space", "Mekan"],
  ["Rooms", "ODA"],
  ["Amenities", "Amenities"],
];
export const REGIONAL_LISTINGS_SLIDER_SETTINGS = {
  className: "center",
  centerPadding: "60px",
  lazyLoad: false,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  arrows: false,
  useCSS: true,
  style: {
    height: "100%",
    width: "100%",
  },
  dots: false,
};
export const COMPARISON_SLIDER_SETTINGS = {
  className: "center",
  centerPadding: "60px",
  lazyLoad: false,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  arrows: false,
  useCSS: true,
  style: {
    height: "100%",
    width: "100%",
  },
  dots: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};
export const SOCIAL_SHOWCASE_SLIDER_SETTINGS = {
  className: "center",
  centerPadding: "60px",
  slidesToShow: 2,
  slidesToScroll: 2,
  lazyLoad: false,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  arrows: false,
  useCSS: true,
  style: {
    height: "100%",
    width: "100%",
  },
  dots: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const IMAGE_SLIDER_SETTINGS = {
  className: "center",
  // centerPadding: "60px",
  slidesToShow: 5,
  slidesToScroll: 2,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  arrows: false,

  dots: false,
  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const PARTNER_SLIDER_SETTINGS = {
  className: "center",
  centerPadding: "60px",
  slidesToShow: 3,
  slidesToScroll: 3,
  lazyLoad: false,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  arrows: false,
  useCSS: true,
  style: {
    height: "100%",
    width: "100%",
  },
  dots: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const INVESTMENT_SHOWCASE_BUTTONS = [
  {
    title: ["Your Forever Home", "Your Forever Home"],
    tagline: [
      "We value caring and loving homes.",
      "We value caring and loving homes.",
    ],
    image: investmentShowcase1,
  },
  {
    title: ["Retirement Plan", "Retirement Plan"],
    tagline: [
      "Sit back and relax. Choose a retirement plan that ensures your land works for you.",
      "Sit back and relax. Choose a retirement plan that ensures your land works for you.",
    ],
    image: investmentShowcase2,
  },
  {
    title: ["Saving Plan", "Saving Plan"],
    tagline: [
      "This plan turns your money into lifelong assets. We value your hard work, you should too.",
      "This plan turns your money into lifelong assets. We value your hard work, you should too.",
    ],
    image: investmentShowcase3,
  },
  {
    title: ["Student Plan", "Student Plan"],
    tagline: [
      "Choose our multiple options to help you find a plan that works for your budget while you take care of your education.",
      "Choose our multiple options to help you find a plan that works for your budget while you take care of your education.",
    ],
    image: investmentShowcase4,
  },
];
export const PARTNER_LOGOS = [
  partnerLogo1,
  partnerLogo2,
  partnerLogo3,
  partnerLogo4,
  partnerLogo5,
  partnerLogo6,
  partnerLogo1,
  partnerLogo2,
  partnerLogo3,
  partnerLogo4,
  partnerLogo5,
  partnerLogo6,
];
export const FOOTER_PRODUCTS = ["Listings", "Projects", "Agents", "Agencies"];
export const FOOTER_POSTS = [
  {
    title: "Lawyer uses AI to help lawyers draft documents faster",
    image: post_1,
  },
  {
    title: "Going against the grain, AngelPad kills its demo day",
    image: post_2,
  },
];
export const INITIAL_PROPERTY_ACTIONS = {
  liked: false,
  shared: false,
  called: false,
  messaged: false,
};
export const SOCIAL_URLS = [
  {
    URL: "https://www.facebook.com/zeeracofficial/",
    icon: <Facebook />,
  },
  {
    URL: "https://www.twitter.com/zeeracofficial",
    icon: <Twitter />,
  },
  {
    URL: "https://www.instagram.com/zeeracofficial/",
    icon: <Instagram />,
  },
  {
    URL: "https://www.linkedin.com/company/zeeracofficial",
    icon: <LinkedIn />,
  },
];
export const DEFAULT_PLANS = [floorPlan, floorPlan];
export const SOCIAL_CONTENT_SELECTION = [
  "Feed",
  "News",
  "Blogs",
  "Podcast",
  "Groups",
  "CEO Club",
];
export const DEFAULT_FRIENDS = [
  {
    name: "Austin",
    photo: agent1,
  },
  {
    name: "Edbert",
    photo: agent2,
  },
  {
    name: "Reviano",
    photo: agent3,
  },
  {
    name: "Edbert",
    photo: agent2,
  },
  {
    name: "Austin",
    photo: agent1,
  },
  {
    name: "Edbert",
    photo: agent2,
  },
  {
    name: "Reviano",
    photo: agent3,
  },
];
export const DEFAULT_SOCIAL_USERS = [
  {
    name: "Austin Edbert",
    photo: agent1,
    handle: "@austin",
    following: true,
  },
  {
    name: "Edbert Reviano",
    handle: "@edbert",
    photo: agent2,
    following: false,
  },
  {
    name: "Reviano Edbert",
    handle: "@Reviano",
    following: true,
    photo: agent3,
  },
];
export const POST_SORTING_BUTTONS = ["All", "Following", "Latest", "Popular"];
export const SIGNUP_BUTTON_SX = {
  textTransform: "none",
  fontSize: 12,
  color: "#FFFFFF",
  fontFamily: "medium",
  backgroundColor: "#134696",
  borderRadius: "10px",
  minWidth: "75%",
  marginTop: "20px",
  mb: 1,
  padding: 1,
  height: 38,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
export const ROLE_ENUM = [
  ["User", "User"],
  ["Agent", "TEMSİLCİ"],
  ["Agency", "ACENTA"],
];
export const COUNTRY_ENUM = ["Pakistan", "Turkey", "UAE", "Other"];
export const CONSTRUCTION_DETAILS = [
  [
    {
      label: ["Heating", "Heating"],
      options: [
        ["no", "no"],
        ["yes", "yes"],
      ],
      key: "heating",
    },
    {
      label: ["Cooling", "Cooling"],
      key: "cooling",
      options: [
        ["no", "no"],
        ["yes", "yes"],
      ],
    },
    {
      label: ["Furnished", "Furnished"],
      key: "furnished",
      options: [
        ["no", "no"],
        ["yes", "yes"],
      ],
    },
    {
      label: ["Flooring", "Flooring"],
      key: "flooring",
      options: [
        ["Marble", "Marble"],
        ["Tiles", "Tiles"],
        ["Chips", "Chips"],
        ["Wooden", "Wooden"],
      ],
    },
    {
      label: ["Appliances", "Appliances"],
      key: "appliances",
      options: [
        ["no", "no"],
        ["yes", "yes"],
      ],
    },
  ],
  [
    {
      label: ["Pool", "Pool"],
      options: [
        ["no", "no"],
        ["yes", "yes"],
      ],
      key: "pool",
    },
    {
      label: ["Lawn", "Lawn"],
      key: "lawn",
      options: [
        ["no", "no"],
        ["yes", "yes"],
      ],
    },
    {
      label: ["Garage", "Garage"],
      key: "garage",
      options: [
        ["no", "no"],
        ["yes", "yes"],
      ],
    },
  ],

  [
    {
      label: ["Materials", "Materials"],
      options: [
        ["Brick", "Brick"],
        ["Cement", "Cement"],
      ],
      key: "materials",
    },
  ],
  [
    {
      label: ["Property Condition", "Property Condition"],
      options: [
        ["Good", "Good"],
        ["Old", "Old"],
        ["Refurbished", "Refurbished"],
      ],
      key: "property_condition",
    },
    {
      label: ["New construction", "New construction"],
      key: "new_construction",
      options: [
        ["no", "no"],
        ["yes", "yes"],
      ],
    },
    {
      key: "year_built",
      label: ["Year built", "Year built"],
      options: [new Date().getFullYear()],
    },
  ],
];
export const DUMMY_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas molestie facilisis tortor quis laoreet. Nam posuere pretium velit, eu auctor sem dictum vitae. Nullam condimentum et augue id egestas. Integer turpis felis, imperdiet ut elit vel, elementum fermentum quam. Sed lorem augue, finibus eget tristique quis, porttitor eget erat. Fusce fringilla, mauris vitae ullamcorper blandit, massa sem varius magna, lacinia varius turpis nisl quis sem. Sed sed leo neque. Nam luctus nibh dui, vitae rhoncus tellus suscipit dictum. Phasellus mollis lorem at magna convallis, id fermentum justo egestas. Morbi sagittis tortor eget vehicula aliquam. Cras ut faucibus quam. Sed molestie tortor non purus fringilla, non pharetra tortor vestibulum";
export const DEFAULT_EXPERIENCE = [
  {
    duration: "2008 - 2012",
    company: "The Beelogix",
    location: "Lahore, Pakistan",
  },
  {
    duration: "2008 - 2012",
    company: "The Beelogix",
    location: "Lahore, Pakistan",
  },
  {
    duration: "2008 - 2012",
    company: "The Beelogix",
    location: "Lahore, Pakistan",
  },
];
export const AUCTION_FILTERS = [
  ["auction trading", "auction trading"],
  ["bulk trading", "bulk trading"],
  ["Subunit trading", "Subunit trading"],
];
export const AUCTION_SEPARATED_FILTERS = [
  ["New", "New"],
  ["Top Trending", "Top Trending"],
  ["Most Popular", "Most Popular"],
];
export const GLOBE_COUNTRIES = ["Pakistan", "Turkey", "Dubai"];
export const COMPARISON_TABS = [
  ["City", "City"],
  ["Space", "Space"],
  ["Price", "Price"],
  ["Area", "Area"],
  ["Neighborhood", "Neighborhood"],
  ["Type", "Type"],
  ["Bedrooms", "Bedrooms"],
  ["Bathrooms", "Bathrooms"],
  ["Condition", "Condition"],
  ["purpose", "Condition"],
  ["Built in", "Built in"],
];
export const EMOJI_REACTIONS = [
  {
    label: "InLove",
    image: InLove,
    textContent: "Love",
  },
  {
    label: "ToTears",
    image: ToTears,
    textContent: "HAHA",
  },
  {
    label: "Astonishment",
    image: Astonishment,
    textContent: "WOW",
  },
  {
    label: "Sunglass",
    image: Sunglass,
    textContent: "Cool",
  },
  {
    label: "Angel",
    image: Angel,
    textContent: "Blessed",
  },
  {
    label: "Money",
    image: Money,
    textContent: "Rich",
  },
  {
    label: "Trouble",
    image: Trouble,
    textContent: "Sad",
  },
  {
    label: "Boredom",
    image: Boredom,
    textContent: "Boring",
  },
  {
    label: "Disappointed",
    image: Disappointed,
    textContent: "Angry",
  },
];
export const NEWS_FILTER = [
  ["Popular", "Popular"],
  ["New", "New"],
  ["Old", "Old"],
  ["Likes", "Likes"],
];
export const TEMP_NEWS = [
  {
    image: investmentShowcase2,
    title: "Making Strides in Real Estate with Unbeatable Customer Experience",
    user: "Uzair Shah",
    date: "12 April at 09.28 PM",
    details:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ",
  },
  {
    image: investmentShowcase3,
    title: "Making Strides in Real Estate with Unbeatable Customer Experience",
    user: "Uzair Shah",
    date: "12 April at 09.28 PM",
    details:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ",
  },
  {
    image: investmentShowcase4,
    title: "Making Strides in Real Estate with Unbeatable Customer Experience",
    user: "Uzair Shah",
    date: "12 April at 09.28 PM",
    details:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ",
  },
];
export const TEMP_PODCASTS = [
  {
    image: investmentShowcase2,
    title: "Making Strides in Real Estate with Unbeatable Customer Experience",
    totalEpisodes: "10",
  },
  {
    image: investmentShowcase3,
    title: "Making Strides in Real Estate with Unbeatable Customer Experience",
    totalEpisodes: "13",
  },
  {
    image: investmentShowcase4,
    title: "Making Strides in Real Estate with Unbeatable Customer Experience",
    totalEpisodes: "6",
  },
];
export const SEARCH_FILTERS = {
  POPULAR: "POPULAR",
  RECENT: "RECENT",
};
export const ROOM_BUTTONS = ["Any", "1", "2", "3", "4", "5+"];
export const SEARCH_HEADINGS = [
  ["Popular Search", "Popular Search"],
  ["Recent", "Recent"],
];
export const SETTINGS_TABS = [
  {
    name: ["Settings", "Settings"],
    icon: settingsIcon,

    url: "profile",
  },
  {
    name: ["Message", "Message"],
    icon: messageIcon,
    url: "messages",
  },
  {
    name: ["Listings", "Listeler"],
    icon: listingsIcon,
    url: "my_listings",
  },
  {
    name: ["Become an Agent", "Become an Agent"],
    icon: agentIcon,
    url: "become_an_agent",
  },
  {
    name: ["Register Agency", "Register Agency"],
    icon: agentIcon,
    url: "register_agency",
  },
  {
    name: ["Saved Listings", "Saved Listings"],
    icon: savelistIcon,
    url: "saved_listings",
  },
];
export const LISTING_HOVER_DATA = [
  {
    image: residentialHover,
    label: ["Residential", "Yerleşim"],
  },
  {
    image: commercialHover,
    label: ["Commercial", "Ticari"],
  },
  {
    image: plotHover,
    label: ["Plot", "Arsa"],
  },
];
export const PURPOSE_ENUM = [
  { label: ["Buy", "Satın Al"], value: "Buy" },
  { label: ["Rent", "Kirala"], value: "Rent" },
  { label: ["Lease", "Lease"], value: "Lease" },
];
export const TYPE_ENUM = [
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
  { label: "Plot", value: "Plot" },
];
export const CATEGORY_ENUM = [
  { label: "BUY", value: "buy" },
  { label: "RENT", value: "rent" },
  { label: "LEASE", value: "lease" },
  {
    label: "My Files",
    subCategories: ["sub unit trading", "auction file", "bulk files"],
  },
  {
    label: "Customers",
  },
];
export const SAVE_LIST_ITEMS = [
  ["properties", "mülkler"],
  ["agents", "temsilciler"],
  ["agencies", "acentalar"],
];
export const PAKISTAN_CITIES = [
  "",
  "Ahmadpur East",
  "Ahmed Nager Chatha",
  "Ali Khan Abad",
  "Alipur",
  "Arifwala",
  "Attock",
  "Bhera",
  "Bhalwal",
  "Bahawalnagar",
  "Bahawalpur",
  "Bhakkar",
  "Burewala",
  "Chenab Nagar",
  "Chillianwala",
  "Choa Saidanshah",
  "Chakwal",
  "Chak Jhumra",
  "Chichawatni",
  "Chiniot",
  "Chishtian",
  "Chunian",
  "Dajkot",
  "Daska",
  "Davispur",
  "Darya Khan",
  "Dera Ghazi Khan",
  "Dhaular",
  "Dina",
  "Dinga",
  "Dhudial Chakwal",
  "Dipalpur",
  "Faisalabad",
  "Fateh Jang",
  "Ghakhar Mandi",
  "Gojra",
  "Gujranwala",
  "Gujrat",
  "Gujar Khan",
  "Harappa",
  "Hafizabad",
  "Haroonabad",
  "Hasilpur",
  "Haveli Lakha",
  "Islamabad",
  "Jalalpur Jattan",
  "Jampur",
  "Jaranwala",
  "Jhang",
  "Jhelum",
  "Jauharabad",
  "Kallar Syedan",
  "Kalabagh",
  "Karor Lal Esan",
  "Karachi",
  "Kasur",
  "Kamalia",
  "Kāmoke",
  "Khanewal",
  "Khanpur",
  "Khanqah Sharif",
  "Kharian",
  "Khushab",
  "Kot Adu",
  "Lahore",
  "Lalamusa",
  "Layyah",
  "Lawa Chakwal",
  "Liaquat Pur",
  "Lodhran",
  "Malakwal",
  "Mamoori",
  "Mailsi",
  "Mandi Bahauddin",
  "Mian Channu",
  "Mianwali",
  "Miani",
  "Multan",
  "Murree",
  "Muridke",
  "Mianwali Bangla",
  "Muzaffargarh",
  "Narowal",
  "Nankana Sahib",
  "Okara",
  "Pakpattan",
  "Pattoki",
  "Pindi Bhattian",
  "Pind Dadan Khan",
  "Pir Mahal",
  "Qaimpur",
  "Qila Didar Singh",
  "Raiwind",
  "Rajanpur",
  "Rahim Yar Khan",
  "Rawalpindi",
  "Renala Khurd",
  "Sadiqabad",
  "Sagri",
  "Sahiwal",
  "Sambrial",
  "Samundri",
  "Sangla Hill",
  "Sarai Alamgir",
  "Sargodha",
  "Shakargarh",
  "Sheikhupura",
  "Shujaabad",
  "Sialkot",
  "Sohawa",
  "Soianwala",
  "Siranwali",
  "Tandlianwala",
  "Talagang",
  "Taxila",
  "Toba Tek Singh",
  "Vehari",
  "Wah Cantonment",
  "Wazirabad",
  "Yazman",
  "Zafarwal",
];
export const NOTIFICATION_MENU_TABS = [
  ["Notifications", "Notifications"],
  // ["Requests", "Requests"],
  // ["Z-Sphere", "Z-Sphere"],
];
export const NOTIFICATION_MENU_SUB_TABS = [
  ["Unread", "Unread"],
  ["All", "All"],
];
export const NOTIFICATION_ACTIONS = {
  VIEWED: "view",
  SHARED: "share",
  FAVOURITED: "favourite",
  NUMBER_VIEWED: "number_reveal",
  MESSAGE: "message",
  CREATE: "create",
  NEW_BID: "new_bid",
  AUCTION_CLOSED: "auction_closed",
  BID_ACCEPTED: "bid_accepted",
};
export const NOTIFICATION_INSTANCES = {
  LISTING: "listing",
  PROJECT: "project",
  AGENT: "agent",
  AGENCY: "agency",
  AUCTION: "auction",
  MESSAGE: "message",
  GROUP: "group_invite",
  BID: "bid",
};
export const POST_VISIBILITY_OPTIONS = ["Public", "Following", "Private"];
export const HEADER_CURRENCY_ENUM = [
  { label: "₨", value: "PKR" },
  { label: "$", value: "USD" },
  { label: "₺", value: "TRY" },
];
export const DEFAULT_CURRENCY_RATES = {
  AED: 0.013092,
  PKR: 1,
  TRY: 0.067772,
  USD: 0.003565,
};
export const API_RESPONSES = {
  SUCCESS: "success",
  ERROR: "error",
  PENDING: "pending",
};
export const WATERMARK_IMAGE = watermark;
export const SERVICES_PRACTICE = [
  ["corporate", "corporate"],
  ["partnership", "partnership"],
  ["solo propertier", "solo propertier"],
];
export const SERVICES_WORK = [
  {
    name: ["Online", "Online"],
    value: false,
  },
  {
    name: ["In-Person", "In-Person"],
    value: false,
  },
];
export const SERVICES_PROPERTY = [
  ["home", "home"],
  ["office", "office"],
  ["corporate", "corporate"],
  ["apartment", "apartment"],
  ["shared office", "shared office"],
  ["bungalow", "bungalow"],
  ["shop", "shop"],
  ["mall plaza", "mall plaza"],
];
export const SERVICES_COUNTRY = [
  ["pakistan", "pakistan"],
  ["turkey", "türkiye"],
  ["uae", "uae"],
];
export const SERVICES_UNIT = [
  ["marla", "marla"],
  ["kanal", "kanal"],
  ["sqft", "sqft"],
];
export const SERVICES_LANGUAGE = [
  ["english", "english"],
  ["turkish", "turkish"],
  ["arabic", "arabic"],
];
export const GROUP_DETAIL_CONTENT = {
  POSTS: "posts",
  MEMBERS: "members",
  EVENTS: "events",
  SETTINGS: "settings",
};
export const GROUP_PAGINATION_TARGETS = {
  JOINED_GROUPS: "joined_groups",
  SUGGESTED_GROUPS: "suggested_groups",
  YOUR_GROUPS: "your_groups",
  MEMBERS: "members",
  MODERATORS: "moderators",
};
export const CEO_CLUB_PARAM_IDS = {
  MEMBERS: "members",
  EVENTS: "events",
  POSTS: "posts",
};
export const CEO_CLUB_EVENT_IDS = {
  UPCOMING: "upcoming",
  PAST: "past",
};
export const SOCKET_BID_ACTION = { update: "Bid Update", new: "New bid" };
export const BID_STATUS = {
  pending: "pending",
  accepted: "accepted",
  rejected: "rejected",
};
export const AUCTION_TYPE = {
  single: "single",
  bulk: "bulk",
  subUnit: "sub_unit",
};
export const PROFILE_SUB_TABS = {
  CONNECTED_ACCOUNTS: "connectedAccount",
  OVERVIEW: "overview",
  PASSWORD: "password",
  EXPERIENCE: "experience",
  VERIFIED: "get_verified",
  SUPPORT: "accountSupport",
  SIGN_IN_METHOD: "signInMethod",
  DEACTIVATE_ACCOUNT: "deactivateAccount",
  NOTIFICATIONS: "notifications",
  REFERRALS: "referrals",
  INVITES: "invites",
  LISTING_PREFERENCES: "listings",
  AGENT_PREFERENCES: "agents",
  AGENCY_PREFERENCES: "agencies",
  ALL_NOTIFICATIONS: "All",
  UNREAD_NOTIFICATIONS: "Unread",
};
export const SETTINGS_ACCORDION_ITEMS = [
  {
    title: "user_profile",
    icon: <PersonIcon />,
    subItems: [
      {
        label: PROFILE_SUB_TABS.OVERVIEW,
      },
      {
        label: PROFILE_SUB_TABS.PASSWORD,
        //FOR tetsing
        // hideFrom: [USER_TYPES.AGENT],
      },
      {
        label: PROFILE_SUB_TABS.EXPERIENCE,
        hideFrom: [
          USER_TYPES.ADMIN,
          USER_TYPES.CEO,
          USER_TYPES.MODERATOR,
          USER_TYPES.USER,
        ],
      },
      {
        label: PROFILE_SUB_TABS.VERIFIED,
        hideFrom: [
          USER_TYPES.ADMIN,
          USER_TYPES.CEO,
          USER_TYPES.MODERATOR,
          USER_TYPES.USER,
        ],
      },
    ],
  },
  {
    title: "preferences",
    icon: <RoomPreferencesIcon />,
    subItems: [
      {
        label: PROFILE_SUB_TABS.LISTING_PREFERENCES,
      },
      {
        label: PROFILE_SUB_TABS.AGENT_PREFERENCES,
      },
      {
        label: PROFILE_SUB_TABS.AGENCY_PREFERENCES,
      },
    ],
  },
  {
    title: "notifications",
    icon: <NotificationsNoneOutlinedIcon />,
    subItems: [
      {
        label: PROFILE_SUB_TABS.ALL_NOTIFICATIONS,
      },
      {
        label: PROFILE_SUB_TABS.UNREAD_NOTIFICATIONS,
      },
    ],
  },
];
export const LISTINGS_DRAWER_OPTIONS = [
  {
    label: ["Overview", "Overview"],
  },
  {
    label: ["Properties", "Properties"],
    subCategories: REGIONAL_LISTINGS_FILTERS_LEFT,
  },
  {
    label: ["My Files", "My Files"],
    subCategories: [
      ["sub unit trading", "sub unit trading"],
      ["auction file", "auction file"],
      ["bulk files", "bulk files"],
    ],
  },
  // {
  //   label: 'Customers',
  // },
];
