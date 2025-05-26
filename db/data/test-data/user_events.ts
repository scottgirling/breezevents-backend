export interface UserEvent {
  user_id: number;
  event_id: number;
}

export const userEvents: UserEvent[] = [
	{
		"user_id": 1,
		"event_id": 1
	},
	{
		"user_id": 1,
		"event_id": 2
	},
	{
		"user_id": 1,
		"event_id": 5
	},
	{
		"user_id": 3,
		"event_id": 1
	},
	{
		"user_id": 3,
		"event_id": 2
	},
	{
		"user_id": 3,
		"event_id": 4
	}
]