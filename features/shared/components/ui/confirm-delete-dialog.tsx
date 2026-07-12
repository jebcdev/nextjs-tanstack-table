"use client";

import { useState } from "react";
import type { IGeneralResponse } from "@/features/shared/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import { Button } from "./button";

interface ConfirmDeleteDialogProps {
    title: string;
    description: string;
    trigger: React.ReactNode;
    onConfirm: () => Promise<IGeneralResponse<void>>;
}

export function ConfirmDeleteDialog({
    title,
    description,
    trigger,
    onConfirm,
}: ConfirmDeleteDialogProps) {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleConfirm = async () => {
        setIsPending(true);
        try {
            const result = await onConfirm();
            if (result.success) {
                setOpen(false);
            }
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={isPending}
                    >
                        {isPending ? "Eliminando..." : "Eliminar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
