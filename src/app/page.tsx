import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="wrapper topContainer">
        <div className="iconimage"><img src="/images/brazilflag.png" alt="" /></div>
        <h2 className="logo">Calendario da Serie A</h2>
        <button className="greenBtn">試合一覧</button>
        <button className="greenBtn">トップに戻る</button>
      </div>
    </main>
  );
}
