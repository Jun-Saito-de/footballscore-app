// 順位APIの取得

import { MatchInfo } from "./getMatches";

export type StandingTeam = {
    team: {
        id: number;
        name: string;
        tla: string;
    };
    points: number;
};

export type StandingInfo = {
    table: StandingTeam[];
};

export async function getStandings(competitionCode: string): Promise<StandingTeam[]> {
    // 8-4でやったprocess.env. 環境変数を取得
    const token = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_TOKEN;
    if (!token) {
        throw new Error("サーバーでトークンが設定されていません");
    }

    const API_URL = `https://api.football-data.org/v4/competitions/${competitionCode}/standings`;

    const response = await fetch(
        API_URL,
        {
            method: "GET",
            headers: {
                'X-Auth-Token': token,
                "Content-Type": "application/json",
            },
        });
    const data = await response.json();

    console.log("Standings API Response:", data);


    // リーグ戦の総合テーブル[0]を取得する
    return data.standings[0].table;
}
