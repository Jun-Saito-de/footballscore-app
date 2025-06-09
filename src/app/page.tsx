import Image from "next/image";
import { MatchType } from "@/types/types";

export default function Home() {
  return (
    <main>
      <div className="wrapper topContainer">
        <div className="iconimage"><img src="/images/brazilflag.png" alt="" /></div>
        <h2 className="logo">Calendario da Serie A</h2>
        <a href="/matches" className="greenBtn">試合一覧</a>
        <a href="/" className="greenBtn">トップに戻る</a>
      </div>
    </main>
  );
}
