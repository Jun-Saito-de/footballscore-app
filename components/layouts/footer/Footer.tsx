import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-green-400 mt-10">
            <nav className="flex flex-col items-center p-4 text-sm">
                <div className="flex mb-4 text-xs gap-8 md:gap-24 text-md">
                    <div>
                        <Link href="https://www.soccerway.com/" className="text-black hover:text-green-700">SOCCERWAY</Link>
                    </div>
                    <div>
                        <Link href="https://www.transfermarkt.jp/campeonato-brasileiro-serie-a/startseite/wettbewerb/BRA1" className="text-black hover:text-green-700">Transfer Market</Link>
                    </div>
                    <div>
                        <Link href="/" className="text-black hover:text-green-700">Instagram</Link>
                    </div>
                </div>
                <div className="text-black hover:text-green-700 text-xs">
                    &copy; {new Date().getFullYear()} Calendario da Serie A All rights reserved.
                </div>
            </nav>
        </footer>
    )
}

export default Footer;