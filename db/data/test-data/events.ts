export interface SingleEvent {
  title: string;
  slug: string;
  event_overview: string;
  description: string;
  start_time: string;
  end_time: string;
  timezone: string;
  venue_id: number;
  is_online: boolean;
  host_id: string;
  event_type: string;
  capacity: number;
  attendees_count: number;
  is_free: boolean;
  price: number;
  event_image_url: string;
  is_published: boolean;
  created_at: string;
  last_updated_at: string;
}

export const events: SingleEvent[] = [
  {
    "title": "UK Tech Expo 2025",
    "slug": "uk-tech-expo-2025",
    "event_overview": "A 3-day expo showcasing emerging technologies and innovation from across the UK.",
    "description": "Join thousands of innovators, developers, entrepreneurs, and tech enthusiasts at the UK Tech Expo 2025 — the country's leading event for showcasing breakthrough technologies, digital transformation, and the future of industry. Over three days, explore more than 150 exhibitors, attend keynote sessions by global tech leaders, and participate in hands-on workshops designed to empower the next generation of digital talent. Whether you're interested in AI, sustainability, fintech, or cybersecurity, this event offers insights, networking, and inspiration for everyone in the tech ecosystem.",
    "start_time": "2025-05-14T09:00:00Z",
    "end_time": "2025-05-16T17:00:00Z",
    "timezone": "Europe/London",
    "venue_id": 1,
    "is_online": false,
    "host_id": "9a7f3f42-39e9-4c8a-b3a1-f814e9c04c4d",
    "event_type": "expo",
    "capacity": 800,
    "attendees_count": 545,
    "is_free": false,
    "price": 180.00,
    "event_image_url": "https://example.co.uk/images/uktechexpo2025.jpg",
    "is_published": true,
    "created_at": "2025-05-10T10:00:00.000Z",
    "last_updated_at": "2025-05-12T14:00:00.000Z"
  },
  {
    "title": "Green Future Forum",
    "slug": "green-future-forum-2025",
    "event_overview": "A sustainability-focused conference exploring climate tech, clean energy, and circular economy solutions.",
    "description": "The Green Future Forum 2025 brings together environmental leaders, policymakers, and innovators to discuss actionable strategies for a sustainable future. Sessions include case studies on renewable energy, circular economy practices, and policy frameworks, with interactive workshops on green financing and climate risk.",
    "start_time": "2025-09-12T09:30:00Z",
    "end_time": "2025-09-13T16:30:00Z",
    "timezone": "Europe/London",
    "venue_id": 2,
    "is_online": false,
    "host_id": "9a7f3f42-39e9-4c8a-b3a1-f814e9c04c4d",
    "event_type": "conference",
    "capacity": 500,
    "attendees_count": 460,
    "is_free": true,
    "price": 0.00,
    "event_image_url": "https://example.co.uk/images/greenfutureforum.jpg",
    "is_published": true,
    "created_at": "2025-05-05T08:15:00.000Z",
    "last_updated_at": "2025-05-10T11:30:00.000Z"
  },
  {
    "title": "Digital Health Summit",
    "slug": "digital-health-summit-2025",
    "event_overview": "A summit focused on healthcare innovation, telemedicine, and healthtech startups.",
    "description": "Explore the future of digital healthcare at the Digital Health Summit 2025. Engage with thought leaders on topics such as wearable tech, AI diagnostics, patient data management, and personalized medicine. Featuring startup pitches, investor panels, and case studies from NHS pilots.",
    "start_time": "2025-11-05T10:00:00Z",
    "end_time": "2025-11-06T17:00:00Z",
    "timezone": "Europe/London",
    "venue_id": 3,
    "is_online": true,
    "host_id": "d3b07384-d9d8-40a2-b8e4-c4b0a5f3b8b6",
    "event_type": "summit",
    "capacity": 1000,
    "attendees_count": 775,
    "is_free": false,
    "price": 150.00,
    "event_image_url": "https://example.co.uk/images/digitalhealth2025.jpg",
    "is_published": false,
    "created_at": "2025-05-01T09:00:00.000Z",
    "last_updated_at": "2025-05-13T13:00:00.000Z"
  },
  {
    "title": "UK Game Developers Conference",
    "slug": "uk-game-dev-con-2025",
    "event_overview": "A 2-day conference for developers, designers, and publishers in the gaming industry.",
    "description": "From indie devs to AAA studios, the UK Game Developers Conference 2025 features workshops on game engines, storytelling, monetization, and XR. Network with publishers, attend portfolio reviews, and meet the minds behind the UK's biggest game releases.",
    "start_time": "2025-08-20T10:00:00Z",
    "end_time": "2025-08-21T18:00:00Z",
    "timezone": "Europe/London",
    "venue_id": 1,
    "is_online": false,
    "host_id": "d3b07384-d9d8-40a2-b8e4-c4b0a5f3b8b6",
    "event_type": "conference",
    "capacity": 600,
    "attendees_count": 520,
    "is_free": false,
    "price": 95.00,
    "event_image_url": "https://example.co.uk/images/ukgamedevcon.jpg",
    "is_published": true,
    "created_at": "2025-05-03T12:30:00.000Z",
    "last_updated_at": "2025-05-11T09:15:00.000Z"
  },
  {
    "title": "Women in Tech Leadership Forum",
    "slug": "women-in-tech-leadership-2025",
    "event_overview": "Empowering women in technology through leadership talks, mentorship, and networking.",
    "description": "Join tech leaders, rising stars, and allies at this one-day event focused on advancing women in technology. Hear keynote stories, join panel discussions, and connect with mentors from top UK companies. A day of inspiration, learning, and career elevation.",
    "start_time": "2025-07-18T09:00:00Z",
    "end_time": "2025-07-18T17:00:00Z",
    "timezone": "Europe/London",
    "venue_id": 2,
    "is_online": true,
    "host_id": "d3b07384-d9d8-40a2-b8e4-c4b0a5f3b8b6",
    "event_type": "forum",
    "capacity": 400,
    "attendees_count": 370,
    "is_free": true,
    "price": 0.00,
    "event_image_url": "https://example.co.uk/images/womenintech2025.jpg",
    "is_published": true,
    "created_at": "2025-04-28T11:45:00.000Z",
    "last_updated_at": "2025-05-12T16:30:00.000Z"
  }
]