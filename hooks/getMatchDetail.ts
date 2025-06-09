import { MatchInfo } from "./getMatches";

export async function getMatchDetail(id: string): Promise<MatchInfo> {
    // 8-4でやったprocess.env. 環境変数を取得
    const token = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_TOKEN;
    if (!token) {
        throw new Error("サーバーでトークンが設定されていません");
    }

    const response = await fetch(
        `https://api.football-data.org/v4/matches/${id}`,
        {
            method: "GET",
            headers: {
                'X-Auth-Token': token,
                "Content-Type": "application/json",
            },
        });
    const data = await response.json();

    console.log("API response:", data);

    return data as MatchInfo;
}
