import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Coffee, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/utils/supabase";
import { toast } from "sonner";
import { AccountProvider, AccountAddress } from "thirdweb/react";
import client from "@/utils/web3";
import { shortenAddress } from "thirdweb/utils";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea";


interface transaction {
    sender: string;
    receiver: string;
    transaction: {
        amount: string,
        message: string,
        isPrivate: boolean
    }
}

export default function Transactions() {

    const { address } = useParams();
    const navigate = useNavigate()

    const [transactions, setTransactions] = useState<transaction[]>([]);
    const [total, setTotal] = useState<string>();
    const [selectedTransaction, setSelectedTransaction] = useState<transaction | null>()

    const [isModal, setIsModal] = useState<boolean>(false);


    useEffect(() => {
        if (address) {
            const getTransactions = async () => {
                const result = await api.getTransactions(address);

                if (result.error) {
                    toast.error(result.error);
                    return;
                }

                let sum = 0;
                result.success?.map((item) => {
                    sum += Number(item.transaction.amount)
                });
                const roundedSum = sum.toFixed(5)

                setTotal(String(roundedSum));

                // @ts-expect-error - Ignore TypeScript type warnings for the next line
                setTransactions(result.success)



            }
            getTransactions();
        }


    }, [address])

    return (
        <div className="w-full overflow-x-auto">
            <Table className="w-full selection:bg-[rgb(250,204,21)] selection:text-black">
                <TableHeader>
                    <TableRow>
                        <TableHead colSpan={3} className="p-4">
                            <div className="flex items-center gap-2 text-3xl text-[rgb(250,204,21)]">
                                Your Chai Supporters <Coffee color="#facc15" />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableCaption className="p-4">
                    <div className="flex justify-center items-center text-gray-600">
                        <Button variant="link" onClick={() => navigate(`/main/${address}`)}>
                            Back Home <ExternalLink color="#facc15" />
                        </Button>
                    </div>

                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="p-3">Supporters</TableHead>

                        <TableHead className="p-3 text-right absolute right-0">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        transactions ? (
                            transactions.map((item, key) => (
                                <TableRow
                                    key={key}
                                    className="hover:bg-gray-50 transition-colors hover:cursor-pointer"
                                    onClick={() => {
                                        setIsModal((prev) => !prev)
                                        setSelectedTransaction(item);
                                    }}

                                >



                                    <AccountProvider client={client} address={item.sender}>
                                        <TableCell className="p-3 font-medium">
                                            <Button variant='link' onClick={() => navigate(`/main/${item.sender}`)}>
                                                <AccountAddress formatFn={shortenAddress} />
                                            </Button>
                                        </TableCell>
                                    </AccountProvider>

                                    <TableCell className="p-3 absolute right-0 mt-2">
                                        {item.transaction.amount}
                                    </TableCell>

                                </TableRow>
                            ))

                        ) : <Loader2 className="animate-spin" />
                    }
                </TableBody>
                {
                    selectedTransaction ? (<Dialog open={isModal} onOpenChange={setIsModal}>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-[rgb(250,204,21)]">Transaction Details</DialogTitle>
                                <DialogDescription>
                                    Here is your complete transaction details.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="sender" className="text-[rgb(250,204,21)]">
                                        Sender
                                    </Label>
                                    <Input
                                        id="sender"
                                        value={selectedTransaction.sender}
                                        readOnly
                                    />
                                    <Label htmlFor="receiver" className="text-[rgb(250,204,21)]">
                                        Receiver
                                    </Label>
                                    <Input
                                        id="receiver"
                                        value={selectedTransaction.receiver}
                                        readOnly
                                    />
                                    <Label htmlFor="message" className="text-[rgb(250,204,21)]">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        className={`resize-none ${selectedTransaction.transaction.isPrivate ? "text-gray-400" : ""
                                            }`}
                                        value={selectedTransaction.transaction.isPrivate ? "Message is Private" : selectedTransaction.transaction.message}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>) : null
                }
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2} className="p-3 font-medium">
                            Total
                        </TableCell>
                        <TableCell className="p-3 absolute right-0">{total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}