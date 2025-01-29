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
    name: string;
    bio: string;
    social: string;
}



export default function SheetDemo({address, name, bio, social}: props) {


    
    const [newName, setNewName] = useState<string>();
    const [newBio, setNewBio] = useState<string>();
    const [newSocial, setNewSocial] = useState<string>();

    useEffect(() => {
        setNewName(name);
        setNewBio(bio);
        setNewSocial(social);
    }, [name, bio, social]);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const update = async () => {
        if(name !== newName || bio !== newBio || social !== newSocial) {
            setIsLoading(true)
            const result = await api.update(address,newName,newBio,newSocial);

            if(result.error) {
                toast.error(result.error);
                setIsLoading(false);
                setIsOpen(false);
                return ;
            }
            setIsLoading(false)
            setIsOpen(false)
            toast.success(result.success);
            window.location.reload();
            return ;
        }
        setIsOpen(false);
        return ;
        
    }



    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Toggle onClick={() => setIsOpen((prev) => !prev)}><UserPen color="#facc15" /></Toggle>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-[rgb(250,204,21)]">
                        Edit profile
                    </SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6 left-24">
                    <div className="grid grid-cols-4 items-center gap-4 justify-start">
                        <Label
                            htmlFor="name"
                            className="text-right text-[rgb(250,204,21)] col-span-1"
                        >
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={newName}
                            placeholder="example: chai.eth"
                            className="col-span-3"
                            autoComplete="off"
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 justify-start">
                        <Label
                            htmlFor="bio"
                            className="text-right text-[rgb(250,204,21)] col-span-1"
                        >
                            Bio
                        </Label>
                        <Textarea
                            id="bio"
                            value={newBio}
                            placeholder="Tell us about yourself."
                            className="col-span-3 resize-none"
                            autoComplete="off"
                            onChange={(e) => setNewBio(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 justify-start">
                        <Label
                            htmlFor="social"
                            className="text-right text-[rgb(250,204,21)] col-span-1"
                        >
                            Social
                        </Label>
                        <Input
                            id="social"
                            value={newSocial}
                            placeholder="https://chai.eth"
                            className="col-span-3"
                            autoComplete="off"
                            onChange={(e) => setNewSocial(e.target.value)}
                        />
                    </div>
                </div>
                <SheetFooter>

                    <Button type="submit" className="text-gray-700" onClick={update} disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin"/> : null}
                        {!isLoading ? "Save changes" : "Saving"}
                    </Button>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
