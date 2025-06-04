import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <div className="divide-y border-gray-200 dark:border-gray-800 border-b">
            <div className="px-4 py-3 md:py-6 lg:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold trackng-tighterå">
                        <h1 className="title">Calendario da Serie A</h1>
                    </Link>
                    <nav className="flex items-center text-sm gap-6 mr-8 ">
                        <Link className="font-medium text-gray-500 hover:text-gray-900 dark:text-grqay-400 dark:hover:text-gray-50" href="/">
                            ホーム
                        </Link>
                        <Link className="font-medium text-gray-500 hover:text-gray-900 dark:text-grqay-400 dark:hover:text-gray-50" href="/matches">
                            試合一覧
                        </Link>
                    </nav>
                </div>
            </div>
        </div>


    );
};

export default Header;
