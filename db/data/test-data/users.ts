export interface User {
  user_id: string,
  name: string;
  username: string,
  email: string;
  role: string;
  user_created_at: string;
  user_last_updated_at: string;
  bio: string;
  avatar_url: string;
}

export const users: User[] = [
  {
    "user_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "name": "Alice Thompson",
    "username": "alice_thompson123",
    "email": "alice.thompson@example.com",
    "role": "attendee",
    "user_created_at": "2025-05-01T09:00:00.000Z",
    "user_last_updated_at": "2025-05-10T10:00:00.000Z",
    "bio": "Tech enthusiast. Always looking for new innovative solutions.",
    "avatar_url": "https://example.com/avatars/alice.jpg"
  },
  {
    "user_id": "9a7f3f42-39e9-4c8a-b3a1-f814e9c04c4d",
    "name": "Ben Ahmed",
    "username": "ahmedben96",
    "email": "ben.ahmed@example.com",
    "role": "host",
    "user_created_at": "2025-04-18T14:30:00.000Z",
    "user_last_updated_at": "2025-05-02T13:00:00.000Z",
    "bio": "Event organizer and tech community advocate.",
    "avatar_url": "https://example.com/avatars/ben.jpg"
  },
  {
    "user_id": "1c4d5e6f-7a8b-49c0-9dfe-23456f7a9b01",
    "name": "Daniel O'Brien",
    "username": "danny-o-b",
    "email": "daniel.obrien@example.com",
    "role": "attendee",
    "user_created_at": "2025-05-04T10:00:00.000Z",
    "user_last_updated_at": "2025-05-11T12:00:00.000Z",
    "bio": "Digital marketer and entrepreneur with an interest in AI.",
    "avatar_url": "https://example.com/avatars/daniel.jpg"
  },
  {
    "user_id": "d3b07384-d9d8-40a2-b8e4-c4b0a5f3b8b6",
    "name": "Ella Kapoor",
    "username": "ella-kapow",
    "email": "ella.kapoor@example.com",
    "role": "host",
    "user_created_at": "2025-04-28T11:45:00.000Z",
    "user_last_updated_at": "2025-05-06T15:00:00.000Z",
    "bio": "Founder of StartUp Innovators. Organizing events for aspiring entrepreneurs.",
    "avatar_url": "https://example.com/avatars/ella.jpg"
  },
  {
    "user_id": "8e8f0b79-f8c9-4ca1-8e1a-15c3a8c5d57a",
    "name": "Marcus Liu",
    "username": "marcus_liu88",
    "email": "marcus.liu@example.com",
    "role": "attendee",
    "user_created_at": "2025-04-15T14:30:00.000Z",
    "user_last_updated_at": "2025-05-18T16:20:00.000Z",
    "bio": "Developer advocate and public speaker passionate about open-source technology.",
    "avatar_url": "https://example.com/avatars/marcus.jpg"
  }
]