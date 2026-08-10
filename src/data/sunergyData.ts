import { BusinessDetails, Review } from '../types';

export const SUNERGY_BUSINESS: BusinessDetails = {
  name: "Sunergy Solar Energy Systems",
  rating: 4.3,
  totalReviews: 138,
  category: "Solar energy system service",
  address: "540 NW University Blvd Ste 108, Port St. Lucie, FL 34986, United States",
  addressExtra: "Floor 1 · WestPark",
  plusCode: "8HCX+H3 Port St. Lucie, Florida, USA",
  phone: "+1 727-375-9375",
  hours: {
    "Monday": "9:00 AM – 6:00 PM",
    "Tuesday": "9:00 AM – 6:00 PM",
    "Wednesday": "9:00 AM – 6:00 PM",
    "Thursday": "9:00 AM – 6:00 PM",
    "Friday": "9:00 AM – 6:00 PM",
    "Saturday": "9:00 AM – 4:00 PM",
    "Sunday": "Closed"
  },
  isOpenNow: true, // Will be computed dynamically in UI or defaulted
  services: [
    {
      id: "residential",
      title: "Residential Rooftop Solar Systems",
      description: "Custom engineered solar panel systems built specifically for Port St. Lucie homes to lower or eliminate monthly FPL electricity bills.",
      iconName: "Sun",
      badge: "Most Popular",
      features: [
        "Tier-1 High Efficiency Monocrystalline Panels",
        "Custom Roof Load & Angle Calculation",
        "25-Year Manufacturer & Workmanship Warranty",
        "Seamless FPL Net Metering Setup"
      ]
    },
    {
      id: "hurricane-rated",
      title: "Hurricane-Rated Solar Engineering",
      description: "Panels and racking systems rigorously tested and rated to withstand up to 160+ MPH category 5 hurricane force winds.",
      iconName: "ShieldCheck",
      badge: "Florida Tough",
      features: [
        "Heavy-Duty Stainless Steel Racking",
        "Double-Sealed Waterproof Roof Penetrations",
        "Engineered to FL Building Code Standards",
        "Rapid Post-Storm Systems Inspection"
      ]
    },
    {
      id: "battery-storage",
      title: "Battery Storage & Whole-Home Backup",
      description: "Never lose power during Florida summer storms or grid outages with integrated Tesla Powerwall or Enphase battery storage.",
      iconName: "Zap",
      badge: "Outage Protection",
      features: [
        "Instant Outage Detection & Switchover",
        "Store Excess Daytime Solar Energy",
        "Power AC Units, Refrigerators & Essentials",
        "Mobile App Live Energy Management"
      ]
    },
    {
      id: "financing",
      title: "$0 Down Financing & Budget Options",
      description: "Affordable solar loans with flexible rates designed so your monthly solar payment is lower than your current power bill.",
      iconName: "DollarSign",
      badge: "Flexible Terms",
      features: [
        "$0 Out-of-Pocket Initial Investment",
        "30% Federal Clean Energy Tax Credit Eligible",
        "Low Fixed Interest Rate Options",
        "Immediate Cash Flow Savings"
      ]
    },
    {
      id: "commercial",
      title: "Commercial Solar & Business Energy",
      description: "Turn key solar solutions for Port St. Lucie commercial properties, retail stores, warehouses, and offices.",
      iconName: "Building2",
      badge: "Commercial",
      features: [
        "Accelerated Depreciation (MACRS 80%)",
        "Significant Overhead Cost Reduction",
        "Green Business Marketing Advantage",
        "Custom Roof & Ground Mount Designs"
      ]
    },
    {
      id: "after-service",
      title: "System Monitoring & After-Service Care",
      description: "Our relationship doesn't end at installation. Enjoy 24/7 remote monitoring and responsive maintenance from our local team.",
      iconName: "Headphones",
      badge: "5-Star Support",
      features: [
        "Real-Time Mobile Energy Production Tracking",
        "Proactive Performance Alerts",
        "Local Port St. Lucie Technicians",
        "Panel Cleaning & Maintenance Packages"
      ]
    }
  ]
};

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    author: "Ashee Davis",
    rating: 5,
    date: "4 years ago (Edited)",
    text: "My family lives at 34952 and it's great to have the best solar energy company located near me. Sunergy provides quality services to us, locals, and raises awareness about green practices at the same time. 100% would HIGHLY recommend them to everyone in town 🙌",
    ownerResponse: {
      date: "4 years ago",
      text: "Thank you so much for the 5-star review and detailed feedback about your experience with Sunergy Solar."
    },
    tags: ["friendly consultant", "solar explanation"],
    likes: 4,
    location: "Port St. Lucie, FL 34952"
  },
  {
    id: "rev-2",
    author: "Jason Miller",
    rating: 5,
    date: "3 years ago",
    text: "I've been putting off solar for other large projects around the house, but after my experience with the Sunergy introduction team, I'm happily moving forward today. No more batteries needed, the panels are rated against hurricane winds, installation was smooth and professional!",
    tags: ["professional installers", "hurricane rated"],
    likes: 1,
    location: "Port St. Lucie, FL"
  },
  {
    id: "rev-3",
    author: "Cole Graham",
    rating: 5,
    date: "4 years ago",
    text: "I decided to switch to solar and hired Sunergy as my solar energy company. Sunergy became a good partner for me to achieve my goal of getting solar panels. They offered me great financing options that I found very budget-friendly. The whole process went faster than expected.",
    ownerResponse: {
      date: "4 years ago",
      text: "Thanks Cole! We are so glad we could help!"
    },
    tags: ["installation time", "friendly consultant"],
    likes: 1,
    location: "St. Lucie West, FL"
  },
  {
    id: "rev-4",
    author: "Maria Rodriguez",
    rating: 5,
    date: "1 year ago",
    text: "Sunergy made our transition to solar completely stress-free! The consultants took time to explain how FPL net metering works in Port St. Lucie and walked us through the 30% tax credit. Our electric bill dropped from $280/mo to just the minimum grid connection fee!",
    ownerResponse: {
      date: "1 year ago",
      text: "Welcome to the solar family Maria! It was a pleasure working on your home in Tradition."
    },
    tags: ["solar explanation", "friendly consultant"],
    likes: 6,
    location: "Tradition, Port St. Lucie"
  },
  {
    id: "rev-5",
    author: "David K.",
    rating: 5,
    date: "8 months ago",
    text: "Top-notch installation team! They arrived right on time, respected our property, and completed the entire roof installation in one day. The post-service followup was fantastic as well. 5-stars for good quality installation service and after service!",
    tags: ["professional installers", "installation time"],
    likes: 3,
    location: "Port St. Lucie, FL"
  },
  {
    id: "rev-6",
    author: "Brenda Vance",
    rating: 5,
    date: "2 years ago",
    text: "Their work men responded quickly and efficiently when we had questions after a heavy summer storm. Everything was rock solid. So relieved to have hurricane-rated solar panels installed by a real local business.",
    tags: ["professional installers", "solar explanation"],
    likes: 5,
    location: "Jensen Beach, FL"
  }
];

export const NEARBY_COMPETITORS = [
  { name: "Sunergy Solar PSL", rating: "1.0", reviewsCount: 1, category: "Solar energy company" },
  { name: "Green Energy Solar", rating: "4.8", reviewsCount: 87, category: "Solar energy company" },
  { name: "RED Solar", rating: "4.3", reviewsCount: 69, category: "Solar energy company" },
  { name: "Solar Energy Systems", rating: "3.8", reviewsCount: 65, category: "Solar energy company" },
  { name: "SunRay Energy Solutions", rating: "5.0", reviewsCount: 7, category: "Solar energy company" }
];

export const FREQUENT_QUESTIONS = [
  {
    question: "Are Sunergy solar panels hurricane proof for Florida weather?",
    answer: "Yes! All solar panel systems engineered and installed by Sunergy are rated for high wind zones in Florida up to 160+ MPH (Category 5 hurricane winds). We use heavy-duty stainless steel racking and hurricane-grade roof anchors following Florida Building Code guidelines."
  },
  {
    question: "How much can I save on my FPL power bill in Port St. Lucie?",
    answer: "Most Port St. Lucie homeowners save between 60% to 90% on their electric bills. With net metering, excess solar power generated during bright sunny Florida days is sent back to the FPL grid for credits that cover your evening electricity usage."
  },
  {
    question: "What is the 30% Federal Clean Energy Tax Credit?",
    answer: "Under the Inflation Reduction Act, residential solar panel and battery installations qualify for a 30% federal tax credit on the total cost of the system (equipment + labor). Our consultants help provide all documentation needed for your CPA or tax filer."
  },
  {
    question: "Do I need upfront cash to get solar with Sunergy?",
    answer: "No upfront cash is required! Sunergy offers flexible $0 down solar financing options where your monthly fixed solar loan payment replaces your variable FPL power bill, giving you immediate savings and predictable monthly expenses."
  },
  {
    question: "Where is Sunergy located in Port St. Lucie?",
    answer: "Our office is located at 540 NW University Blvd Ste 108, Port St. Lucie, FL 34986 (Floor 1, WestPark, near WestPark plaza). You are welcome to visit or call us at +1 727-375-9375 to speak with a solar expert!"
  }
];
