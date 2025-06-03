import Image from "next/image";

export default function Home() {
  return (
    <div className="wrapper topContainer">
      <div className="iconimage"><img src="/images/brazilflag.png" alt="" /></div>
      <h1 className="title">Calendario da Serie A</h1>
      <button className="greenBtn">試合一覧</button>
      <button className="greenBtn">トップに戻る</button>      
    </div>
  );
}
