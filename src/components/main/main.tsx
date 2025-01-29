import { ConnectButton, useActiveAccount, useActiveWallet, useActiveWalletConnectionStatus } from "thirdweb/react";
import PayCard from "../card/card";
import Profile from "../profile/profile";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import client from "@/utils/web3";
import { lightTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";



// TODO
// 1. share and embed btn implementation

const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
];



export default function Main() {

    const { address: routeAddress } = useParams();
    const navigate = useNavigate();

    const status = useActiveWalletConnectionStatus();
    console.log("state", status);

    const wallet = useActiveWallet();
    console.log("wallet", wallet);

    const account = useActiveAccount();
    console.log(account);

    useEffect(() => {

        console.log("hello")
    }, [routeAddress, account]);



    return (
        <div className="flex flex-col gap-4 p-4 sm:p-8">
            <ConnectButton

                client={client}
                wallets={wallets}
                theme={lightTheme({
                    colors: {
                        primaryButtonBg: "hsl(48, 96%, 53%)",
                        primaryButtonText: "hsl(240, 8%, 31%)",
                        separatorLine: "hsl(48, 96%, 53%)",
                        borderColor: "hsl(48, 96%, 53%)",
                        skeletonBg: "hsl(48, 96%, 53%)",
                        tertiaryBg: "hsl(48, 96%, 53%)",
                        tooltipText: "hsl(48, 96%, 53%)",
                    },
                })}
                connectButton={{ label: "Get started with a Chai" }}
                connectModal={{
                    size: "compact",
                    title: "Buy me a Chai",
                    titleIcon:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmYWYwMTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jb2ZmZWUiPjxwYXRoIGQ9Ik0xMCAydjIiLz48cGF0aCBkPSJNMTQgMnYyIi8+PHBhdGggZD0iTTE2IDhhMSAxIDAgMCAxIDEgMXY4YTQgNCAwIDAgMS00IDRIN2E0IDQgMCAwIDEtNC00VjlhMSAxIDAgMCAxIDEtMWgxNGE0IDQgMCAxIDEgMCA4aC0xIi8+PHBhdGggZD0iTTYgMnYyIi8+PC9zdmc+",
                    showThirdwebBranding: false,
                }}
            />

            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-start md:justify-start sm:gap-12">

                <div className="flex-1 flex flex-col gap-4 justify-start items-start">
                    <Profile routeAddress={routeAddress!} activeAddress={account?.address} />
                    <div className="flex justify-center items-center relative left-[7rem]">

                        <img
                            src="/tea.jpg"
                            alt="Tea"
                            className="w-40 h-40 md:w-48 md:h-48 mb-6"
                        />
                    </div>

                </div>

                <div className="flex-1">
                    <PayCard routeAddress={routeAddress!} activeAddress={account?.address} />
                </div>
            </div>


            <div className="flex justify-center items-center">
                <Button variant="link" onClick={() => navigate(`/main/transactions/${routeAddress}`)}>
                    View all Supporters <ExternalLink color="#facc15" />
                </Button>
            </div>
        </div>
    );
}
