import Image from "next/image";
import { MatchType } from "@/types/types";

export default function Home() {
  return (
    <main>
      <div className="wrapper topContainer">
        <div className="iconimage"><img src="/images/brazilflag.png" alt="" /></div>
        <h2 className="logo">Calendario da Serie A</h2>
        <button className="greenBtn"><a href="/matches">試合一覧</a></button>
        <button className="greenBtn"><a href="/">トップに戻る</a></button>
      </div>
    </main>
  );
}
