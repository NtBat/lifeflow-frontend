import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createGoal } from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

import {
  Label,
  Input,
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui";

import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createGoalFormSchema = z.object({
  title: z.string().min(1, "Specify the activity you want to perform"),
  desiredWeeklyFrequency: z.coerce
    .number()
    .min(1, "Specify how many times per week you want to perform the activity")
    .max(7, "You can only select 1 or 7 times per week"),
});

type CreateGoalForm = z.infer<typeof createGoalFormSchema>;

export function CreateGoal() {
  const queryClient = useQueryClient();

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalFormSchema),
    });

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    });

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

    reset();

    toast.success("Goal successfully created!", {
      position: "bottom-right",
      theme: "dark",
    });
  }

  return (
    <>
      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Create Goal</DialogTitle>
              <DialogClose>
                <X className="size-5 text-zinc-600" />
              </DialogClose>
            </div>
            <DialogDescription>
              Add activities that make you{" "}
              <span className="underline">feel good</span> and that you want to
              keep practicing every week.
            </DialogDescription>
          </div>

          <form
            className="flex flex-col justify-between flex-1"
            onSubmit={handleSubmit(handleCreateGoal)}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">What is the activity?</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder=" Exercising, meditating, etc…"
                  {...register("title")}
                />

                {formState.errors.title && (
                  <span className="text-red-500 text-sm">
                    {formState.errors.title.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="title">How many times per week?</Label>
                <Controller
                  control={control}
                  name="desiredWeeklyFrequency"
                  defaultValue={1}
                  render={({ field }) => {
                    return (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
                        <RadioGroupItem value="1">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            1 time per week
                          </span>
                          <span className="text-lg leading-none">🥱</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="2">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            2 times per week
                          </span>
                          <span className="text-lg leading-none">🙂</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="3">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            3 times per week
                          </span>
                          <span className="text-lg leading-none">😎</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="4">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            4 times per week
                          </span>
                          <span className="text-lg leading-none">😜</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="5">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            5 times per week
                          </span>
                          <span className="text-lg leading-none">🤨</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="6">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            6 times per week
                          </span>
                          <span className="text-lg leading-none">🤯</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="7">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            Every day of the week
                          </span>
                          <span className="text-lg leading-none">🔥</span>
                        </RadioGroupItem>
                      </RadioGroup>
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="button" className="flex-1" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button className="flex-1">Save</Button>
            </div>
          </form>
        </div>
      </DialogContent>
      <ToastContainer />
    </>
  );
}
