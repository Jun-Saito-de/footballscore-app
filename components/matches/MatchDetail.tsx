"use client"

import { GoalInfo, MatchInfo } from "@/hooks/getMatches";
import React, { useEffect, useState } from "react";

type Props = {
    match: MatchInfo;
    hasComment?: boolean;
};

const FAVORITE_KEY = "favorite_teams";

export default function MatchDetail({ match, hasComment }: Props) {

    console.log("match detail:", match);
    console.log("得点者一覧:", match.goals);


    // チームがお気に入り登録の判定
    // ホーム・アウェイと2つのステートでチェックできるようにする
    const [isFavoriteHome, setIsFavoriteHome] = useState(false);
    const [isFavoriteAway, setIsFavoriteAway] = useState(false);

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


    // UTC 日時を日本語表記にフォーマット
    const date = new Date(match.utcDate);
    const formattedDate = date.toLocaleString("ja-jp", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

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
                    {isFavoriteHome && <span className="text-yellow-500">★</span>}
                    <span className="font-bold teamname__home text-md md:text-lg">{match.homeTeam.name}</span>
                    <div className="scorecard">
                        <span className="team-score font-bold text-xl md:text-2xl">{match.score.fullTime.home}</span>
                        <span className="vs-separator text-md md:text-xl">-</span>
                        <span className="team-score font-bold text-xl md:text-2xl">{match.score.fullTime.away}</span>
                    </div>
                    <span className="font-bold teamname__away text-md md:text-lg">{match.awayTeam.name}</span>
                    {isFavoriteAway && <span className="text-yellow-500">★</span>}
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
                {/* 得点者 */}
                <div className="scoreset">
                    <h1 className="category-title font-bold text-sm md:text-md text-center">得点者</h1>
                    <div className="flex justify-center">
                        <ul className="scorer-home">
                            {match.goals
                                ?.filter((goal) => goal.team.id === match.homeTeam.id)
                                .map((goal, index) => (
                                    <li key={index}>{goal.scorer.name} ({goal.minute}分)</li>
                                ))}
                        </ul>
                    </div>

                    <div className="flex justify-center">
                        <ul className="scorer-away">
                            <li>
                                {match.goals
                                    ?.filter((goal) => goal.team.id === match.awayTeam.id)
                                    .map((goal, index) => (
                                        <li key={index}>{goal.scorer.name} ({goal.minute}分)</li>
                                    ))}
                            </li>
                        </ul>
                    </div>
                </div>
                {/* コメント有りのときのみコメント表示 */}
                {hasComment ? (
                    <p className="match-card__comment-flag text-xs">🖊️ コメント追加済み</p>
                ) : null}
            </article>
            <hr className="md:hidden" />
        </div>
    )

}