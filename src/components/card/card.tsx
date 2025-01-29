import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, CoffeeIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useActiveAccount } from "thirdweb/react";
import { toast } from "sonner";
import contract from "@/utils/contract";
import { prepareContractCall } from "thirdweb";
import { toWei } from "thirdweb";
import api from "@/utils/supabase";
import { useSendTransaction } from "thirdweb/react";


interface props {
    routeAddress: string;
    activeAddress?: string;
}

export default function PayCard({ routeAddress, activeAddress }: props) {

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

    return (
        <div className="selection:bg-[rgb(250,204,21)] selection:text-black flex justify-center items-center h-auto">
            <Card className="max-w-sm w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold text-[rgb(250,204,21)]">
                        Buy Me a Chai
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600 mt-2">
                        Support me with a cup of chai to keep the code flowing!
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
                            {loading ? "Transacting" : `Pay ${amount ? amount : `_`} Chai + Gas`}                        </span>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
