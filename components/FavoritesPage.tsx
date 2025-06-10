// マイチーム一覧ページ
'use client';

import { teamList } from "@/constants/teamNameMap";
import React, { useEffect, useState } from "react";

const FAVORITE_KEY = "favorite_teams";

export default function Favoritespage() {
  const [favoriteTlas, setFavoriteTlas] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavoriteTlas(parsed);
      } catch (e) {
        console.error("JSONパースエラー:", e);
        setFavoriteTlas([]);
      }
    }
  }, []);

  const favoriteTeams = teamList.filter(team => favoriteTlas.includes(team.tla));

  return (
    <div>
      <main>
        <div className="wrapper p-4">
          <h1 className="text-sm font-bold mb-4 p-2 text-center">お気に入りチーム一覧（TLA）</h1>
          {favoriteTeams.length === 0 ? (
            <p>まだお気に入りチームはありません。</p>
          ) : (
            <ul className="list-inside text-center">
              {favoriteTeams.map((team) => (
                <li key={team.tla}><span className="text-lg">{team.name}</span></li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
