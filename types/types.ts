export type MatchType = {
    // 試合自体の情報
    id: number;
    homeTeam: {
        name: string,
        tla: string
    };
    awayTeam: {
        name: string;
        tla: string
    }
    utcDate: string;
    status: string;
    minute: number;
    venue: string;
    matchday: number;
    attendance: number;
    // スコアに関連する情報
    score: {
        winner: string;
        fullTime: {
            home: number,
            away: number
        };
        halfTime: {
            home: number,
            away: number
        }
    };
    // 得点自体に関連する情報
    goals: [
        {
            minute: number;
            team: {
                id: number,
                name: string
            },
            scorer: {
                id: number,
                name: string;
            }
        }
    ]
}