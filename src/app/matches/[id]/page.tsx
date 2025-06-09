// 試合詳細ページ
import React from "react";
import MatchDetail from "@/components/matches/MatchDetail";
import Image from "next/image";
import { getMatches, MatchInfo } from "@/hooks/getMatches";
import MatchCard from "@/components/matches/MatchCard";

export default async function MatchPage({ params}: {params : { id: string }}) {
    const matches: MatchInfo[]= await getMatches();
    const match = matches.find((matchItem) => matchItem.id.toString() === params.id);
    console.log(matches);


    if (!match) return <div className="p-4 text-center">試合が見つかりません</div>;
    return (
        <div>
            <main>
                <div className="wrapper">
                    <MatchDetail
                        match= {match}
                        hasComment={false} />
                </div>
            </main>
        </div>
    )
}