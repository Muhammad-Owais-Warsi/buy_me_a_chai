import client from "../../utils/web3";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { lightTheme } from "thirdweb/react";
import { Coffee } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../badge/badge";
import Footer from "../footer/footer";


const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
];

export default function Home() {

    const account = useActiveAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if(account) {
            navigate(`/main/${account?.address}`)
        }
    },[account,navigate])


    return (
        <div className="min-h-screen flex flex-col overflow-hidden">
            <nav className="w-full flex items-center justify-between p-4 ml-5">
                <a href="/">
                    <Coffee color="#facc15" className="w-10 h-10" />
                </a>
                <Badge/>
            </nav>

            <main className="flex-grow flex flex-col items-center justify-center p-8 relative top-[-2rem] overflow-hidden selection:bg-[rgb(250,204,21)] selection:text-black">
                <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-4xl mb-8">

                    <img
                        src="/tea.jpg"
                        alt="Tea"
                        className="w-40 h-40 md:w-48 md:h-48 mb-6 md:hidden"
                    />

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-5xl font-bold text-[rgb(250,204,21)] mb-4">
                            Buy Me A Chai
                        </h1>
                        <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                            Send and receive chai with friends, powered by blockchain!
                        </p>
                    </div>


                    <img
                        src="/tea.jpg"
                        alt="Tea"
                        className="hidden md:block w-40 h-40 md:w-48 md:h-48 ml-8"
                    />
                </div>

                <div className="flex items-start justify-center relative lg:right-[21.5rem] md:right-[21.5rem]">
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
                </div>




            </main>

            <footer className="flex justify-center items-center">
                <Footer/>
            </footer>
        </div>
    );
}
