// app/api/matches/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "APIトークンがありません" }, { status: 500 });
  }

  const API_URL = "https://api.football-data.org/v4/competitions/2013/matches?season=2025&dateFrom=2025-05-20&dateTo=2025-05-30";

  try {
    const res = await fetch(API_URL, {
      headers: {
        "X-Auth-Token": token,
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "API取得に失敗しました" }, { status: 500 });
  }
}
