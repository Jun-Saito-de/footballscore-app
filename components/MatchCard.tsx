"use client"

import Image from "next/image"
import Link from "next/link"
import { MatchType } from "@/types/types";

type MatchProps = {
    match: MatchType;
};

const MatchCard = ({ match }: MatchProps) => {
    return (
        <div>
            <article className="match-card flex flex-col items-center m-4">
                {/* 上部情報 */}
                <header className="match-card__header">
                    <p className="match-card__matchday">1</p>
                    <time className="match-card__datetime" dateTime="2025-06-04T17:05">2025年6月7日 19:00</time>
                    <p className="match-card__venue">スタジアム名</p>
                </header>
                {/* スコア部分 */}
                <div className="match-card__score flex ">
                    <span className="icon-myteam --registered" aria-label="マイチーム登録済み"></span>
                    <span className="team-name match-card__homeTeam">サンパウロ</span>
                    <span className="team-score match-card__score--home">0</span>
                    <span className="vs-separator">―</span>
                    <span className="team-score match-card__score--away"></span>
                    <span className="team-name match-card__awayTeam"></span>
                    <span className="icon-myteam --not-registered" aria-label="My Team 未登録"></span>
                </div>
                <p className="match-card__minute"  aria-label="現在の試合時間">72分</p>
                <p className="match-card__comment-flag">🖊️コメント追加済み</p>
            </article>
        </div>
    )
}


export default MatchCard;