interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, desiredWeeklyFrequency }),
  });

  if (!response.ok) {
    throw new Error("Error while creating the goal");
  }
}
