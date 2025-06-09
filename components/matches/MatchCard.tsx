"use client"

import Image from "next/image"
import Link from "next/link"
import { MatchInfo } from "@/hooks/getMatches";
import React, { useEffect, useState } from "react";

type MatchProps = {
    match: MatchInfo;
    hasComment: boolean;
};

const FAVORITE_KEY = "favorite_teams";

export default function MatchCard({ match, hasComment }: MatchProps) {

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
    }, [match.homeTeam.tla, match.awayTeam.tla]);

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

            <Link href={`/matches/${match.id}`}>
                        <article className="match-card flex flex-col  m-4">
                            {/* 上部情報 */}
                            <header className="mb-2">
                                <p className="text-xs mb-1">第{match.matchday}節</p>
                                <div className="flex justify-between">
                                    <time className="text-xs" dateTime={match.utcDate}>{formattedDate}</time>
                                    <p className="text-xs">{match.venue}</p>
                                </div>
                            </header>
                            {/* スコア部分 */}
                            <div className="mb-2 flex items-center justify-center">
                                {isFavoriteHome && <span className="text-green-500 ml-1">★</span>}
                                <span className="font-bold teamname__home text-sm md:text-md">{match.homeTeam.name}</span>
                                <div className="scorecard">
                                    <span className="team-score font-bold text-md md:text-xl">{match.score.fullTime.home}</span>
                                    <span className="vs-separator text-md md:text-xl">-</span>
                                    <span className="team-score font-bold text-md md:text-xl">{match.score.fullTime.away}</span>
                                </div>
                                <span className="font-bold teamname__away text-sm md:text-md">{match.awayTeam.name}</span>
                                {isFavoriteAway && <span className="text-green-500 ml-1">★</span>}
                            </div>
                            {/* 経過時間はライブのときのみ表示 */}
                            {showMinute ? (
                                <p className="text-sm mb-2 text-center" aria-label="現在の試合時間">{match.minute}分</p>
                            ) : null}
                            {/* コメント有りのときのみコメント表示 */}
                            {hasComment ? (
                                <p className="match-card__comment-flag text-xs">🖊️ コメント追加済み</p>
                            ) : null}
                        </article>

            </Link>
            <hr className="md:hidden" />
        </div>
    )
}
