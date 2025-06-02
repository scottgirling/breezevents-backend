export interface Venue {
  venue_name: string;
  venue_type: string;
  location: string;
  capacity: number;
  facilities: string[];
  contact_email: string;
  contact_phone: string;
  website_url: string;
  event_types: string[];
  accessibility_features: string[];
  parking_info: string;
  image_gallery: string[];
  nearby_transport: string;
  created_at: string;
  last_updated_at: string;
}

export const venues: Venue[] = [
  {
    "venue_name": "ExCeL London",
    "venue_type": "Convention Centre",
    "location": "Royal Victoria Dock, 1 Western Gateway, London E16 1XL, UK",
    "capacity": 5000,
    "facilities": ["Wi-Fi", "Parking", "Food Courts", "Conference Rooms", "Accessibility"],
    "contact_email": "info@excel.london",
    "contact_phone": "+44 20 7093 3000",
    "website_url": "https://www.excel.london",
    "event_types": ["Conferences", "Expos", "Trade Shows"],
    "accessibility_features": ["Wheelchair Access", "Hearing Impaired Services", "Elevators"],
    "parking_info": "On-site parking for 1000 cars, 500 bike racks available.",
    "image_gallery": ["https://example.com/images/excel1.jpg", "https://example.com/images/excel2.jpg"],
    "nearby_transport": "5-minute walk from Custom House DLR Station, direct buses from Central London",
    "created_at": "2025-05-01T09:00:00.000Z",
    "last_updated_at": "2025-05-10T10:00:00.000Z"
  },
  {
    "venue_name": "Manchester Central",
    "venue_type": "Exhibition and Conference Centre",
    "location": "Windmill St, Manchester M2 3GX, UK",
    "capacity": 10000,
    "facilities": ["Wi-Fi", "Parking", "Restaurants", "Breakout Rooms", "Accessibility"],
    "contact_email": "info@manchestercentral.co.uk",
    "contact_phone": "+44 161 834 2700",
    "website_url": "https://www.manchestercentral.co.uk",
    "event_types": ["Trade Fairs", "Concerts", "Business Events"],
    "accessibility_features": ["Wheelchair Access", "Visual Aids", "Elevators"],
    "parking_info": "Underground parking for 720 vehicles, accessible parking available.",
    "image_gallery": ["https://example.com/images/mc1.jpg", "https://example.com/images/mc2.jpg"],
    "nearby_transport": "2-minute walk from Deansgate-Castlefield Metrolink, close to Manchester Oxford Road station",
    "created_at": "2025-04-25T08:30:00.000Z",
    "last_updated_at": "2025-05-08T12:45:00.000Z"
  },
  {
    "venue_name": "SEC Centre",
    "venue_type": "Event Campus",
    "location": "Exhibition Way, Glasgow G3 8YW, UK",
    "capacity": 12000,
    "facilities": ["Wi-Fi", "On-site Catering", "Green Rooms", "Conference Halls", "Accessibility"],
    "contact_email": "info@sec.co.uk",
    "contact_phone": "+44 141 248 3000",
    "website_url": "https://www.sec.co.uk",
    "event_types": ["Music Shows", "Exhibitions", "Corporate Meetings"],
    "accessibility_features": ["Wheelchair Access", "Assistance Dogs Welcome", "Accessible Toilets"],
    "parking_info": "Multistorey parking for 1600 cars, electric vehicle charging available.",
    "image_gallery": ["https://example.com/images/sec1.jpg", "https://example.com/images/sec2.jpg"],
    "nearby_transport": "Next to Exhibition Centre railway station, buses from city centre stop nearby",
    "created_at": "2025-04-20T07:15:00.000Z",
    "last_updated_at": "2025-05-09T11:20:00.000Z"
  }
]