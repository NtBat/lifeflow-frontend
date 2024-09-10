import logo from "./assets/logo.svg";
import letsStart from "./assets/lets-start-illustration.svg";
import { Plus, X } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./components/ui/radio-group";

export function App() {
  return (
    <Dialog>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt="Logo LifeFlow" />
        <img src={letsStart} alt="Start application with rocket and a woman" />

        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          You haven't set any goals yet, how about setting one right now?
        </p>

        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Create Goal
          </Button>
        </DialogTrigger>
      </div>

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

          <form className="flex flex-col justify-between flex-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">What is the activity?</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder=" Exercising, meditating, etc…"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="title">How many times per week?</Label>
                <RadioGroup>
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
                </RadioGroup>
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
    </Dialog>
  );
}
