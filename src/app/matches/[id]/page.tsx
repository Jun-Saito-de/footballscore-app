// 試合詳細ページ
import React from "react";
import MatchDetail from "@/components/matches/MatchDetail";
import Image from "next/image";
import { getMatches, MatchInfo } from "@/hooks/getMatches";
import MatchCard from "@/components/matches/MatchCard";
import { getMatchDetail } from "@/hooks/getMatchDetail";
import { getStandings } from "@/hooks/getStandind";


export default async function MatchPage({ params }: { params: { id: string } }) {
    const match = await getMatchDetail(params.id);
    console.log(match);

    if (!match) return <div className="p-4 text-center">試合が見つかりません</div>;
    const competitionCode = match.competition?.code.toUpperCase();

if (!competitionCode) {
  throw new Error("大会コードが取得できませんでした");
}

    const standings = await getStandings(competitionCode);
    // ホーム・アウェイチームの試合前勝点を抽出する
    const homeStanding = standings.find(
       team => team.team.id === match.homeTeam.id
    );
    const awayStanding = standings.find(
       team => team.team.id === match.awayTeam.id
    );

    return (
        <div>
            <main>
                <div className="wrapper">
                    <MatchDetail
                        match={match}
                        hasComment={false}
                        prePoints={{
                            home: homeStanding?.points ?? 0,
                            away: awayStanding?.points ?? 0,
                        }}
                    />
                </div>
            </main>
        </div>
    )
}