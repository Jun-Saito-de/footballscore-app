import MatchCard from "@/components/MatchCard";
import Image from "next/image";
import React from "react";

type MatchType = {
    id: number;
    matchday: string;
    utcDate: string;
    venue: string;
    minute: number,
    status: string; 
    homeTeam: {name: string};
    awayTeam: {name: string};    
}

// 疑似データ
const match = [
    {
    id: 150,
    homeTeam: {
        name: 'フラメンゴ',
        tla: 'FLA'
    },
    awayTeam: {
        name: 'フルミネンセ',
        tla: 'FLU'
    },
    utcDate: "2025-06-07T19:00:00Z",
    status: '試合中',
    minute: 69,
    venue: '埼玉スタジアム2002',
    matchday: 5,
    attendance: 35100,
    score: {
        winner: "DRAW",
        fullTime: {
            home: 3,
            away: 2
        },
        halfTime: {
            home: 1,
            away: 2
        }
    },
    goals: [
        {
            minute: 26,
            team: {
                id: 600,
                name: 'フルミネンセ'
            },
            scorer: {
                id: 1285,
                name: "クリスティアーノ"
            }
        }
    ]
}
];
// 試合一覧ページ
export default async function matches() {
    console.log("App から MatchCard に渡す match データ:", sampleMatch);
    return (
        <main>
            <div>
                <MatchCard match={sampleMatch} />
            </div>
        </main>
    )
}