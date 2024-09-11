import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";

type PendingGoalsResponse = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
};

interface PendingGoalsProps {
  handleCompleteGoal: (goalId: string) => void;
  data: PendingGoalsResponse[];
}

export function PendingGoals({ data, handleCompleteGoal }: PendingGoalsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
          onClick={() => handleCompleteGoal(goal.id)}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  );
}
