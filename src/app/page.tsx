import Image from "next/image";
import NavBar from "./componets/NavBar";
import HomePage from "./componets/homePage"; // Certifique-se de que o caminho para HomePage está correto

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0C0C0D]">
      <NavBar />
      <div className="flex-grow flex items-center justify-center">
        <HomePage />
      </div>
    </main>
  );
}
