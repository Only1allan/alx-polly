import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

export function AlertDialog({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

export function AlertDialogTrigger({ children, asChild = false }: { children: React.ReactNode; asChild?: boolean }) {
  return <Dialog.Trigger asChild={asChild}>{children}</Dialog.Trigger>;
}

export function AlertDialogContent({ children }: { children: React.ReactNode }) {
  return <Dialog.Content className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl max-w-md mx-auto">{children}</Dialog.Content>;
}

export function AlertDialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold mb-2">{children}</h2>;
}

export function AlertDialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-700 dark:text-gray-300 mb-4">{children}</p>;
}

export function AlertDialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end gap-2 mt-4">{children}</div>;
}

export function AlertDialogCancel({ children }: { children: React.ReactNode }) {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
}

export function AlertDialogAction({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <Dialog.Close asChild>
      <button type="button" className="bg-red-600 text-white px-4 py-2 rounded" onClick={onClick}>
        {children}
      </button>
    </Dialog.Close>
  );
}
