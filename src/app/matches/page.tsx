import React from "react";
import MatchCard from "@/components/matches/MatchCard";
import Image from "next/image";
import { getMatches, MatchInfo } from "@/hooks/getMatches";

// 試合一覧ページ
export default async function Page() {
    const matches = await getMatches();
    // let matches: MatchInfo[] = [];
    // try {
    //     matches = await getMatches();
    //     console.log(matches[0].area)
    // } catch (err) {
    //     console.error("試合取得エラー：", err)
    // }
    return (
        <div>
            <main>
                <div className="wrapper">
                    <h1 className="text-sm font-bold mb-4 p-2 text-center">ブラジル１部リーグの試合一覧</h1>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 gap-6 lg:grid-cols-3 matchcard">
                        {matches.map((matchItem) => (
                            <MatchCard 
                            key={matchItem.id} 
                            match={matchItem}
                            hasComment={false} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}