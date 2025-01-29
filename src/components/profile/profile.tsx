import { AccountProvider } from "thirdweb/react";
import { AccountBlobbie } from "thirdweb/react";
import client from "@/utils/web3";
import { ExternalLink, Share2 } from "lucide-react";
import { AccountAddress } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import SheetDemo from "../drawer/drawer";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import api from "@/utils/supabase";
import { toast } from "sonner";
import { ProfileSkeleton } from "../skeletons/profile_skeleton/profile";


const GUEST_DETAILS = {
    name: "test.eth",
    bio: "testing eth",
    social: "chai.eth"
}


interface User {
    address: string | null;
    name: string | null;
    bio: string | null;
    social: string | null;
}
interface props {
    routeAddress: string;
    activeAddress?: string;
}


export default function Profile({ routeAddress, activeAddress }: props) {

    console.log(routeAddress, activeAddress)

    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isShareCopied, setIsShareCopied] = useState<boolean>(false);
  

    const [user, setUser] = useState<User | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false)

    function copy() {
        navigator.clipboard.writeText(routeAddress!)
            .then(() => {
                setIsCopied(true);
            })
            .catch(() => {
                alert("error");
            });
    }

    function shareCopy() {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setIsShareCopied(true);
            })
            .catch(() => {
                alert("error");
            });
    }

    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsCopied(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [isCopied]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsShareCopied(false);
        },1000);
        return () => clearTimeout(timeout);
    },[isShareCopied])


    useEffect(() => {
        const fetchUser = async () => {
            setIsFetching(true);
            const result = await api.isUser(routeAddress!);

            if (result.error) {
                toast.error(result.error);
                return;
            }
            setIsFetching(false);
            setUser(result.success?.[0]);
            return;

        };


        fetchUser();
    }, [routeAddress, activeAddress])

    return (
        <>
            {
                isFetching ? <ProfileSkeleton /> : (<AccountProvider address={routeAddress} client={client}>
                    <div className="selection:bg-[rgb(250,204,21)] selection:text-black flex flex-col lg:flex-row justify-between lg:items-start items-center p-4 lg:p-8 gap-6 lg:gap-10">


                        <div className="flex flex-col justify-center items-center lg:items-start">
                            <AccountBlobbie className="w-20 h-20 rounded-full" />
                            {
                                routeAddress === activeAddress ?
                                    <div className="flex space-x-4 ml-5 mt-4 gap-4 lg:gap-0">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <SheetDemo
                                                        address={user?.address || routeAddress}
                                                        name={user?.name || GUEST_DETAILS.name}
                                                        bio={user?.bio || GUEST_DETAILS.bio}
                                                        social={user?.social || GUEST_DETAILS.social}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Edit Profile
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div> : null
                            }
                        </div>


                        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">

                            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-2">
                                <h1 className="text-xl font-bold text-gray-800">{user ? user.name : GUEST_DETAILS.name}</h1>
                                <div className="flex  mt-2 lg:mt-0">

                                    <AccountAddress formatFn={shortenAddress} className="text-sm text-gray-500 relative top-2" />

                                    <Button variant="ghost" onClick={copy} disabled={isCopied} className="flex items-center gap-2">
                                        {isCopied ? <Check color="#0cbb2f" className="w-4 h-4" /> : <Copy color="#facc15" className="w-4 h-4" />}
                                    </Button>

                                    {/* <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Badge
                                                    onClick={() => alert("hello")}
                                                    variant="outline"
                                                    className={isLoggedIn ? "text-gray-600 cursor-pointer" : "text-red-500 cursor-pointer"}
                                                >
                                                    {isLoggedIn ? (
                                                        <div className="flex items-center gap-2">
                                                            <Dot color="#0cbb2f" className="w-6 h-6 animate-ping" />
                                                            <p>Active</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <Dot color="#bb0c0c" className="w-6 h-6" />
                                                            <p>Not active</p>
                                                        </div>
                                                    )}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Manage Account</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider> */}
                                </div>
                            </div>


                            <p className="text-gray-500 mt-2">
                                {user ? user.bio : GUEST_DETAILS.bio}
                            </p>


                            <div className="space-y-2 w-full  text-center lg:text-left">
                                <div className="flex justify-center lg:justify-start items-center gap-3">
                                    <a
                                        href={user?.social || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[rgb(250,204,21)] hover:underline"
                                    >
                                        {user ? user.social : GUEST_DETAILS.social}
                                    </a>
                                    <ExternalLink color="#facc15" className="w-4 h-4 " />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant="ghost" onClick={shareCopy} disabled={isCopied}>
                                                { isShareCopied ? <Check color="#0cbb2f" className="w-4 h-4" /> : <Share2 color="#facc15" /> }
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Share Profile</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </AccountProvider>)
            }
        </>
    );
}
