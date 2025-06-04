import MatchCard from "@/components/MatchCard";
import { MatchType } from "@/types/types";
import React from "react";

const sampleMatch: MatchType = {
    id: 150,
    homeTeam: {
        name: 'フラメンゴ',
        tla: 'FRA'
    },
    awayTeam: {
        name: 'フルミネンセ',
        tla: 'FUL'
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
// 試合一覧ページ
export default function matches() {
    return (
        <main>
            <div>
                <MatchCard match={sampleMatch} />
            </div>
        </main>
    )
}