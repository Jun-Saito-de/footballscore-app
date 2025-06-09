"use client"

// APIの型定義（GoalInfo、MatchInfo）のインポート、Reactのhooksをインポート
import { GoalInfo, MatchInfo } from "@/hooks/getMatches";
import React, { useEffect, useState } from "react";

// このコンポーネントに渡されるpropsの型定義
// 試合情報、コメントが追加済みか、試合前の勝ち点
type Props = {
    match: MatchInfo;
    // hasComment、prePointsは「なくてもいい」省略可能なもの（TypeScriptのオプショナルなプロパティ）のため、?をつける
    hasComment?: boolean;
    prePoints?: {
        home: number;
        away: number;
    };
};

// localStorageで使うキー名を定数にする
const FAVORITE_KEY = "favorite_teams";

// デバッグ用に受け取ったデータを確認する
export default function MatchDetail({ match, hasComment, prePoints }: Props) {

    // チームがお気に入り登録されているかの判定
    // ホーム・アウェイと2つのステートでチェックできるようにする
    const [isFavoriteHome, setIsFavoriteHome] = useState(false);
    const [isFavoriteAway, setIsFavoriteAway] = useState(false);

    // ホーム／アウェイチームがお気に入りかどうかを管理するためのステートです
    useEffect(() => {
        // localStorageからfavorite_teams（文字列配列）を読み込む
        const storedTeam = localStorage.getItem(FAVORITE_KEY) || "[]";
        let favorites: string[] = [];
        try {
            favorites = JSON.parse(storedTeam);
        } catch {
            favorites = [];
        }
        // API の homeTeam には id や tla、name が入っているので、tlaをキーにする
        setIsFavoriteHome(favorites.includes(match.homeTeam.tla));
        setIsFavoriteAway(favorites.includes(match.awayTeam.tla))
    })

    // ★/☆ボタンが押されたときに呼ばれる関数
    // チームの省略名teamTlaを受けとり、isFavoriteがお気に入りかどうかの状態をboolean値でうけ、setIsFavoriteはboolean値を受け取ってvoid（何も返さない）
    function toggleFavorite(teamTla: string, isFavorite: boolean, setFavorite: (val: boolean) => void) {
        // storeがnullじゃないときはJSON.parse(stored)でlocalStorageからデータを取得。なければ空配列。
        const stored = localStorage.getItem(FAVORITE_KEY);
        let favorites: string[] = stored ? JSON.parse(stored) : [];
        // すでにお気に入りなら削除、お気に入りでなければ追加
        if (isFavorite) {
            favorites = favorites.filter((tla) => tla !== teamTla);
            alert("お気に入りチームから削除しました");
        } else {
            favorites.push(teamTla);
            alert("お気に入りチームに追加しました");            
        }
        // 更新した配列を保存、ステートの切り替え
        localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
        setFavorite(!isFavorite);
    }



    // UTC 日時を日本語表記にフォーマット
    const date = new Date(match.utcDate);
    const formattedDate = date.toLocaleString("ja-jp", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    // 勝ち点の計算
    let homePoint = 0;
    let awayPoint = 0;

    switch (match.score.winner) {
        case "HOME_TEAM":
            homePoint = 3;
            break;
        case "AWAY_TEAM":
            awayPoint = 3;
            break;
        case "DRAW":
            homePoint = 1;
            awayPoint = 1;
            break;
    }

    // 試合前勝ち点に結果を反映してプラスした勝ち点
    const completeHomePoints = (prePoints?.home ?? 0) + homePoint;
    const completeAwayPoints = (prePoints?.away ?? 0) + awayPoint;


    // statusがライブのときのみ経過時間を表示する
    const showMinute = match.status === "LIVE";
    return (
        <div>
            <article className="match-card flex flex-col  m-4">
                {/* 上部情報 */}
                <header className="mb-2">
                    <p className="text-xs mb-1">第{match.matchday}節</p>
                    <div className="flex justify-between">
                        <time className="text-xs" dateTime={match.utcDate}>{formattedDate} 開始</time>
                        <p className="text-xs">{match.venue}</p>
                    </div>
                </header>
                {/* スコア部分 */}
                <div className="mb-2 flex items-center justify-center">
                    <button
                        onClick={() => toggleFavorite(match.homeTeam.tla, isFavoriteHome, setIsFavoriteHome)}
                        aria-label="お気に入り切り替え"
                        className="text-green-500"
                    >
                        {isFavoriteHome ? "★" : "☆"}
                    </button>
                    <span className="font-bold teamname__home text-md md:text-lg">{match.homeTeam.name}</span>
                    <div className="scorecard">
                        <span className="team-score font-bold text-xl md:text-2xl">{match.score.fullTime.home}</span>
                        <span className="vs-separator text-md md:text-xl">-</span>
                        <span className="team-score font-bold text-xl md:text-2xl">{match.score.fullTime.away}</span>
                    </div>
                    <span className="font-bold teamname__away text-md md:text-lg">{match.awayTeam.name}</span>
                    <button
                        onClick={() => toggleFavorite(match.awayTeam.tla, isFavoriteAway, setIsFavoriteAway)}
                        aria-label="お気に入り切り替え"
                        className="text-green-500"
                    >
                        {isFavoriteAway ? "★" : "☆"}
                    </button>
                </div>
                {/* 経過時間はライブのときのみ表示 */}
                {showMinute ? (
                    <p className="text-sm mb-2 text-center" aria-label="現在の試合時間">{match.minute}分</p>
                ) : null}
                {/* 前半のスコア部分 */}
                <div className="mb-2">
                    <div className="flex items-center justify-center">
                        <span className="team-score__half text-sm md:text-lg">{match.score.halfTime.home}</span>
                        <span className="vs-separator text-xs">前半</span>
                        <span className="team-score__half text-sm md:text-lg">{match.score.halfTime.away}</span>
                    </div>
                    {/* 前半のスコア部分 */}
                    <div className="flex items-center justify-center">
                        <span className="team-score__half text-sm md:text-lg">{`${match.score.fullTime.home - match.score.halfTime.home}`}</span>
                        <span className="vs-separator text-xs">後半</span>
                        <span className="team-score__half text-sm md:text-lg">{`${match.score.fullTime.away - match.score.halfTime.away}`}</span>
                    </div>
                </div>
                {/* 試合後勝点を計算 */}
                {/* 勝ち点表示（試合終了時のみ） */}
                {match.status === "FINISHED" && prePoints && (
                    <div className="point-result text-center my-2">
                        <h2 className="text-sm font-bold mb-2">試合終了後の勝ち点</h2>
                        <div className="flex justify-center gap-16 text-md font-bold">
                            <p>勝ち点{completeHomePoints}</p>
                            <p>勝ち点{completeAwayPoints}</p>
                        </div>
                    </div>
                )}
                {/* コメント有りのときのみコメント表示 */}
                {hasComment ? (
                    <p className="match-card__comment-flag text-xs">🖊️ コメント追加済み</p>
                ) : null}
            </article>
            <hr className="md:hidden" />
        </div>
    )

}