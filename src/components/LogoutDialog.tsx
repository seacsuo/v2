import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

import { toast } from "sonner";

interface LogoutDialogProps {
  iconOnly?: boolean;
}

const LogoutDialog = ({ iconOnly }: LogoutDialogProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logout successful! See you next time.");
    } catch (error) {
      toast.error("Logout failed. Please try again. " + error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size={iconOnly ? "icon" : "default"}>
            {iconOnly ? (
              <LogOut size={20} />
            ) : (
              <>
                {user?.email?.split("@")[0]}
                <LogOut />
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px]">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              You are currently logged in as <strong>{user?.email}</strong>. Are
              you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSignOut}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default LogoutDialog;
