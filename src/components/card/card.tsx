import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, CoffeeIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useActiveAccount } from "thirdweb/react";
import { toast } from "sonner";
import contract from "@/utils/contract";
import { prepareContractCall } from "thirdweb";
import { toWei } from "thirdweb";
import api from "@/utils/supabase";
import { useSendTransaction } from "thirdweb/react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import SheetDemo2 from "../drawer/drawer2";
import CardSkeleton from "../skeletons/card_skeleton/card";


const CARD_DETAILS = {
    title: "Buy Me A Chai",
    description: "Support me with a cup of chai to keep the code flowing!",
    buttonTextFirst: "Pay",
    buttonTextSecond: "Chai + Gas"
}

interface props {
    routeAddress: string;
    activeAddress?: string;
}

// interface CardDetails {
//     title: string;
//     description: string;
//     buttonText: string;
// }

export default function PayCard({ routeAddress, activeAddress }: props) {


    // card details
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [buttonText, setButtonText] = useState<string>();

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    const account = useActiveAccount();

    const { mutateAsync: sendTransaction } = useSendTransaction();

    const handlePaymnet = async () => {
        if (!account?.address) {
            toast.error("Please connect to wallet to initiate the payment.");
            return;
        };

        if (!amount) {
            toast.error("Amount should be greater than 0.")
            return;
        }
        try {
            setLoading(true);


            const tx = prepareContractCall({
                contract: contract,
                method: "function pay(address _to) payable",
                params: [routeAddress],
                value: BigInt(toWei(amount.toString()))
            });
            console.log(tx)

            // @ts-expect-error - Ignore TypeScript type warnings for the next line
            await sendTransaction(tx);

            const result = await api.transaction(
                activeAddress!,
                routeAddress,
                amount,
                message,
                isPrivate
            );

            setAmount('');
            setLoading(false);
            setIsPrivate(false);

            if (result.error) {
                // @ts-expect-error - Ignore TypeScript type warnings for the next line
                toast.error(result.error);
                return;
            }
            toast.success(result.success);
            return;

        } catch (error: unknown) {
            console.log("under catch")
            // @ts-expect-error - Ignore TypeScript type warnings for the next line
            toast.error(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            const response = await api.getCard(routeAddress);

            if (response.error) {
                toast.error(response.error);
                return;
            }
            setIsFetching(false);
            if (response.success && response.success.length > 0) {
                setTitle(response.success?.[0].title);
                setDescription(response.success?.[0].description);
                setButtonText(response.success?.[0].buttonText)
            }

        }

        fetchData();
    }, [routeAddress])

    return (
        <>
            {
                isFetching ? (
                    <CardSkeleton/>
                ) : (
                    <div className="selection:bg-[rgb(250,204,21)] selection:text-black flex justify-center items-center h-auto">
                        <Card className="max-w-sm w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden">
                            <CardHeader>
                                {
                                    routeAddress === activeAddress ?
                                        <div className="flex space-x-4 relative bottom-6 right-6 lg:gap-0">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <SheetDemo2
                                                            address={routeAddress}
                                                            title={title || CARD_DETAILS.title}
                                                            description={description || CARD_DETAILS.description}
                                                            buttonText={buttonText || CARD_DETAILS.buttonTextFirst + CARD_DETAILS.buttonTextSecond}

                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Edit Profile
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div> : null
                                }
                                <CardTitle className="text-center text-2xl font-semibold text-[rgb(250,204,21)]">
                                    {title || CARD_DETAILS.title}
                                </CardTitle>
                                <CardDescription className="text-center text-gray-600 mt-2">
                                    {description || CARD_DETAILS.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex justify-center items-center flex-col gap-6">
                                <div className="flex justify-center mb-4">
                                    <Coffee size={48} color="#facc15" />
                                </div>
                                <Input
                                    type="number"
                                    placeholder="Enter amount of Chai"
                                    min={0}
                                    onChange={(e) => setAmount(e.target.value)}
                                />

                                <Textarea
                                    placeholder="A sweet note..."
                                    className="resize-none"
                                    onChange={(e) => setMessage(e.target.value)}
                                />

                                <div className="flex justify-start items-center space-x-2 mt-4">
                                    <Checkbox
                                        id="terms"
                                        checked={isPrivate}
                                        onCheckedChange={() => setIsPrivate(!isPrivate)}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Keep this message private.
                                    </label>
                                </div>
                                <Button
                                    className="text-gray-700 flex items-center space-x-2 mt-4"
                                    onClick={handlePaymnet}
                                    disabled={loading}
                                >
                                    {!loading ? <CoffeeIcon size={20} /> : null}
                                    <span>
                                        {loading ? <Loader2 className="animate-spin" /> : null}
                                        {loading
                                            ? "Transacting"
                                            : buttonText || `${CARD_DETAILS.buttonTextFirst} ${amount ?? '_'} ${CARD_DETAILS.buttonTextSecond}`
                                        }
                                    </span>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )
            }
        </>
    );
}
