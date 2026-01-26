import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Invitations from "../../Invitations/Invitations";

export function ModalInvitation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-card border border-muted rounded-3xl p-6 flex flex-col items-center text-center shadow-sm"
        >
          Inviter un Athlète
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Invitations />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
