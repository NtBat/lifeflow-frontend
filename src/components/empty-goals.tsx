import { Plus } from "lucide-react";
import logo from "../assets/logo.svg";
import letsStart from "../assets/lets-start-illustration.svg";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

export function EmptyGoals() {
  return (
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
  );
}
