// マイチーム一覧ページ
'use client';

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

  return (
    <div>
      <main>
        <div className="wrapper p-4">
          <h1 className="text-sm font-bold mb-4 p-2 text-center">お気に入りチーム一覧（TLA）</h1>
          {favoriteTlas.length === 0 ? (
            <p>まだお気に入りチームはありません。</p>
          ) : (
            <ul className="list-inside">
              {favoriteTlas.map((tla) => (
                <li key={tla}>{tla}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
