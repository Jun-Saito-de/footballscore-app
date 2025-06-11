import Image from "next/image";
import Link from "next/link";
import React from "react";


const Header = async () => {
    return (
        <div className="divide-y header">
            <div className="px-4 py-2 md:py-4 lg:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-l md:text-2xl font-bold">
                        <h1 className="title text-white">Calendario da Serie A</h1>
                    </Link>
                    <nav className="hidden md:flex items-center text-sm gap-6 mr-8">
                        <Link className="font-medium text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 " href="/">
                            ホーム
                        </Link>
                        <Link className="font-medium text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 " href="/matches">
                            試合一覧
                        </Link>
                        <Link className="font-medium text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 " href="/myteams">
                            マイチーム
                        </Link>
                        <div
                        >
                            <Image
                                width={40}
                                height={40}
                                alt="profile_icon"
                                src="/images/brazilflag.png"
                                className="rounded-full"
                            />
                        </div>
                    </nav>
                </div>
            </div>
        </div>


    );
};

export default Header;
