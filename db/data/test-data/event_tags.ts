export interface EventTag {
  event_id: number;
  tag_id: number;
}

export const eventTags: EventTag[] = [
  { "event_id": 1, "tag_id": 1 },
  { "event_id": 1, "tag_id": 2 },
  { "event_id": 1, "tag_id": 4 },
  { "event_id": 2, "tag_id": 1 },
  { "event_id": 2, "tag_id": 5 },
  { "event_id": 2, "tag_id": 3 },
  { "event_id": 3, "tag_id": 1 },
  { "event_id": 3, "tag_id": 2 },
  { "event_id": 4, "tag_id": 1 },
  { "event_id": 4, "tag_id": 2 },
  { "event_id": 4, "tag_id": 4 },
  { "event_id": 5, "tag_id": 1 },
  { "event_id": 5, "tag_id": 5 },
  { "event_id": 5, "tag_id": 6 }
]