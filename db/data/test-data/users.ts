export interface User {
  name: string;
  username: string,
  email: string;
  password_hash: string;
  role: string;
  user_created_at: string;
  user_last_updated_at: string;
  bio: string;
  avatar_url: string;
}

export const users: User[] = [
  {
    "name": "Alice Thompson",
    "username": "alice_thompson123",
    "email": "alice.thompson@example.com",
    "password_hash": "$2b$10$J4lkqkGcN9MbH1E4ytQsE.8QZB/UO1w8hPbmC34RhOeSkqJK9sFhi",
    "role": "attendee",
    "user_created_at": "2025-05-01T09:00:00.000Z",
    "user_last_updated_at": "2025-05-10T10:00:00.000Z",
    "bio": "Tech enthusiast. Always looking for new innovative solutions.",
    "avatar_url": "https://example.com/avatars/alice.jpg"
  },
  {
    "name": "Ben Ahmed",
    "username": "ahmedben96",
    "email": "ben.ahmed@example.com",
    "password_hash": "$2b$10$TljM3l5Gp6w43zyBvEqPOu7xI13aV6ctv03aMtsjADYB6mFk7BpGm",
    "role": "host",
    "user_created_at": "2025-04-18T14:30:00.000Z",
    "user_last_updated_at": "2025-05-02T13:00:00.000Z",
    "bio": "Event organizer and tech community advocate.",
    "avatar_url": "https://example.com/avatars/ben.jpg"
  },
  {
    "name": "Daniel O'Brien",
    "username": "danny-o-b",
    "email": "daniel.obrien@example.com",
    "password_hash": "$2b$10$gI9cdJ6sbtsvMIlFxKk9cuZ0Eq4A2hzYGRZlqv2Jbd6W4ZPOKzvJq",
    "role": "attendee",
    "user_created_at": "2025-05-04T10:00:00.000Z",
    "user_last_updated_at": "2025-05-11T12:00:00.000Z",
    "bio": "Digital marketer and entrepreneur with an interest in AI.",
    "avatar_url": "https://example.com/avatars/daniel.jpg"
  },
  {
    "name": "Ella Kapoor",
    "username": "ella-kapow",
    "email": "ella.kapoor@example.com",
    "password_hash": "$2b$10$zq/N5HYvQzrk8yRzDWT1wO4U9/7pZ6L0nMtuXdePLXH5z8o1Ork2S",
    "role": "host",
    "user_created_at": "2025-04-28T11:45:00.000Z",
    "user_last_updated_at": "2025-05-06T15:00:00.000Z",
    "bio": "Founder of StartUp Innovators. Organizing events for aspiring entrepreneurs.",
    "avatar_url": "https://example.com/avatars/ella.jpg"
  },
  {
    "name": "Marcus Liu",
    "username": "marcus_liu88",
    "email": "marcus.liu@example.com",
    "password_hash": "$2b$10$B7JkT8yKh7P2b0ZPZ1UyTO7nZnM9T9zwAyYlHEy6yOvD/WzbgYOXW",
    "role": "attendee",
    "user_created_at": "2025-04-15T14:30:00.000Z",
    "user_last_updated_at": "2025-05-18T16:20:00.000Z",
    "bio": "Developer advocate and public speaker passionate about open-source technology.",
    "avatar_url": "https://example.com/avatars/marcus.jpg"
  }
]