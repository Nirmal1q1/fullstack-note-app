import { useDeleteNote } from "@/hooks/use-notes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteId: number | null;
}

export function DeleteNoteModal({ isOpen, onClose, noteId }: DeleteNoteModalProps) {
  const deleteNoteMutation = useDeleteNote();

  const handleDelete = async () => {
    if (!noteId) return;
    
    try {
      await deleteNoteMutation.mutateAsync(noteId);
      onClose();
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Note
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-600">
            Are you sure you want to delete this note? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteNoteMutation.isPending}
          >
            {deleteNoteMutation.isPending ? "Deleting..." : "Delete Note"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
