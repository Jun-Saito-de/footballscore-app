// 試合詳細ページ
import React from "react";
import MatchDetail from "@/components/matches/MatchDetail";
import Image from "next/image";
import { getMatches, MatchInfo } from "@/hooks/getMatches";

export default async function MatchPage({ params}: {params : { id: number }}) {
    const matches: MatchInfo[]= await getMatches();
    const match = matches.find((m) => m.id === params.id);


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