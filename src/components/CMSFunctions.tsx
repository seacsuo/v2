import { CalendarClock, Edit, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Event, Merch } from "@/types";

export type ModalType = "create" | "edit" | "delete";
export type ContentType = "event" | "merch";

interface CMSFunctionsProps {
  contentType: ContentType;
  eventToModify?: Event | null;
  merchToModify?: Merch | null;
}

const getDialog = (
  type: ModalType,
  contentType: ContentType,
  isOpen: boolean,
  onClose: () => void
) => {
  let title = "";
  let content = null;

  if (contentType === "event") {
    if (type === "create") {
      title = "Create Event";
      content = <div>Create event form content goes here</div>;
    } else if (type === "edit") {
      title = "Edit Event";
      content = <div>Edit event form content goes here</div>;
    } else if (type === "delete") {
      title = "Delete Event";
      content = <div>Are you sure you want to delete this event?</div>;
    }
  } else if (contentType === "merch") {
    if (type === "create") {
      title = "Create Merch";
      content = <div>Create merch form content goes here</div>;
    } else if (type === "edit") {
      title = "Edit Merch";
      content = <div>Edit merch form content goes here</div>;
    } else if (type === "delete") {
      title = "Delete Merch";
      content = <div>Are you sure you want to delete this merch?</div>;
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={onClose}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function CMSFunctions({ contentType }: CMSFunctionsProps) {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const open = (m: ModalType) => () => setActiveModal(m);

  const close = () => setActiveModal(null);

  const getIcon = () => {
    if (contentType === "event") return <CalendarClock size={18} />;
    if (contentType === "merch") return <ShoppingBag size={18} />;
  };

  const getCreateButtonText = () => {
    return `Create ${contentType === "event" ? "Event" : "Merch"}`;
  };

  const getEditButtonText = () => {
    return `Edit ${contentType === "event" ? "Event" : "Merch"}`;
  };

  const getDeleteButtonText = () => {
    return `Delete ${contentType === "event" ? "Event" : "Merch"}`;
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <Button variant="default" onClick={open("create")}>
          {getIcon()}
          {getCreateButtonText()}
        </Button>
        <Button variant="secondary" onClick={open("edit")}>
          <Edit size={18} />
          {getEditButtonText()}
        </Button>
        <Button variant="destructive" onClick={open("delete")}>
          <Trash2 size={18} />
          {getDeleteButtonText()}
        </Button>
      </div>

      {getDialog("create", contentType, activeModal === "create", close)}
      {getDialog("edit", contentType, activeModal === "edit", close)}
      {getDialog("delete", contentType, activeModal === "delete", close)}
    </>
  );
}
