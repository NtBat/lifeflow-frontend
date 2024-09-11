import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import { LifeflowIcon } from "./lifeflow-icon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import { PendingGoals } from "./pending-goals";
import { getPendingGoals } from "../http/pending-goals";
import { createGoalCompletion } from "../http/create-goal-completion";

export function Summary() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  });

  const { data: dataPendingGoals, isLoading: isLoadingPendingGoals } = useQuery(
    {
      queryKey: ["pending-goals"],
      queryFn: getPendingGoals,
    }
  );

  if (!data) {
    return null;
  }

  const firstDayOfWeek = dayjs().startOf("week").format("MMM D");
  const lastDayOfWeek = dayjs().endOf("week").format("MMM D");
  const dateRange = `${firstDayOfWeek} - ${lastDayOfWeek}`;

  const completedPercentage = Math.round((data.completed * 100) / data.total);

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LifeflowIcon />
          <span className="text-lg font-semibold">{dateRange}</span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Create Goal
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            You have completed{" "}
            <span className="text-zinc-100">{data?.completed}</span> out{" "}
            <span className="text-zinc-100">{data?.total}</span> goals this
            week.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      {isLoadingPendingGoals ? (
        <span>Loading</span>
      ) : (
        <PendingGoals
          data={dataPendingGoals || []}
          handleCompleteGoal={handleCompleteGoal}
        />
      )}

      {data.goalsPerDay ? (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Your week</h2>

          {Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format("dddd");
            const formattedDate = dayjs(date).format("MMM D");

            return (
              <div className="flex flex-col gap-4" key={date}>
                <h3 className="font-medium">
                  {weekDay}{" "}
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map((goal) => {
                    const time = dayjs(goal.completedAt).format("hh:mm a");

                    return (
                      <li className="flex items-center gap-2" key={goal.id}>
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          You completed "
                          <span className="text-zinc-100">{goal.title}</span>"
                          at <span className="text-zinc-100">{time}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <p>You haven't completed any goals this week yet.</p>
      )}
    </div>
  );
}
