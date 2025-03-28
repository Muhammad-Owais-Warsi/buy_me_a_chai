import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle"
import { Loader2, UserPen } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/utils/supabase";
import { toast } from "sonner";

interface props {
    address: string;
    title: string;
    description: string;
    buttonText: string;

}



export default function SheetDemo2({ address, title, description, buttonText }: props) {


    const [newTitle, setNewTitle] = useState<string>();
    const [newDescription, setNewDescription] = useState<string>();
    const [newButtonText, setNewButtonText] = useState<string>();


    useEffect(() => {
        setNewTitle(title);
        setNewDescription(description);
        setNewButtonText(buttonText);
    }, [title, buttonText, description]);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const update = async () => {
        if (title !== newTitle || description !== newDescription || buttonText !== newButtonText) {
            setIsLoading(true)
            const result = await api.updateCard(address, newTitle, newDescription, newButtonText);

            if (result.error) {
                toast.error(result.error);
                setIsLoading(false);
                setIsOpen(false);
                return;
            }
            setIsLoading(false)
            setIsOpen(false)
            toast.success(result.success);
            window.location.reload();
            return;
        }
        setIsOpen(false);
        return;

    }



    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Toggle onClick={() => setIsOpen((prev) => !prev)}><UserPen color="#facc15" /></Toggle>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-[rgb(250,204,21)]">
                        Edit card
                    </SheetTitle>
                    <SheetDescription>
                        Make changes to your card here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6 left-24">
                    <div className="grid grid-cols-4 items-center gap-4 justify-start">
                        <Label
                            htmlFor="title"
                            className="text-right text-[rgb(250,204,21)] col-span-1"
                        >
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={newTitle}
                            placeholder="example: chai.eth"
                            className="col-span-3"
                            autoComplete="off"
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 justify-start">
                        <Label
                            htmlFor="description"
                            className="text-right text-[rgb(250,204,21)] col-span-1"
                        >
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={newDescription}
                            placeholder="Tell us about yourself."
                            className="col-span-3 resize-none"
                            autoComplete="off"
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 justify-start">
                        <Label
                            htmlFor="button"
                            className="text-right text-[rgb(250,204,21)] col-span-1"
                        >
                            Button
                        </Label>
                        <Input
                            id="button"
                            value={newButtonText}
                            placeholder="Pay"
                            className="col-span-3"
                            autoComplete="off"
                            onChange={(e) => setNewButtonText(e.target.value)}
                        />
                    </div>
                </div>
                <SheetFooter>

                    <Button type="submit" className="text-gray-700" onClick={update} disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : null}
                        {!isLoading ? "Save changes" : "Saving"}
                    </Button>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
