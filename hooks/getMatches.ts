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
    // process.env. 環境変数を取得
    const token = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_TOKEN;
    if (!token) {
        throw new Error("サーバーでトークンが設定されていません");
    }

    // 日付設定：現在の日にちマイナス10をスタート、2日後をエンドとする
    // 日付の書式設定
    function formattedDate(date:Date):String  {
        return date.toLocaleDateString("ja-JP",
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replaceAll('/', '-');
    }

    // 始まりの日にち
    const startDate = new Date();
    startDate.setDate(startDate.getDate() -10);
    console.log(formattedDate(startDate));

    // 終了の日にち
    const endDate = new Date();
    endDate.setDate(endDate.getDate() +2);
    console.log(formattedDate(endDate));    


    const API_URL = `http://api.football-data.org/v4/competitions/2013/matches?season=2025&dateFrom=${formattedDate(startDate)}&dateTo=${formattedDate(endDate)}`;
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
