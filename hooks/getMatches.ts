import { NextResponse } from "next/server";

export type TeamInfo = {
    id: number;
    name: string;
    tla: string;
};

export type ScoreInfo = {
    winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
    fullTime: { home: number; away: number };
    halfTime: { home: number; away: number };
}

export type GoalInfo = {
    minute: number;
    team: { id: number; name: string }
    scorer: { id: number; name: string }
}

export type MatchInfo = {
    id: number;
    area: object
    matchday: number;
    utcDate: string;
    venue: string | null;
    minute: number,
    status: string;
    homeTeam: TeamInfo;
    awayTeam: TeamInfo;
    attendance: number;
    score: ScoreInfo;
    goals: GoalInfo[];
    competition: {
        id: number;
        name: string;
        code: string;
        type: string;
        emblem: string;
    };
}

export async function getMatches() {
    // 8-4でやったprocess.env. 環境変数を取得
    const token = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_TOKEN;
    if (!token) {
        throw new Error("サーバーでトークンが設定されていません");
    }

    const API_URL = "http://api.football-data.org/v4/competitions/2013/matches?season=2025&dateFrom=2025-05-20&dateTo=2025-05-30";
    const response = await fetch(
        API_URL,
        {
            method: "GET",
            headers: {
                'X-Auth-Token': token,
                "Content-Type": "application/json",
            },
        });
    if (!response.ok) {
        throw new Error("データ取得に失敗しました");
    }
    const data = await response.json();
    return data.matches as MatchInfo[];
}
