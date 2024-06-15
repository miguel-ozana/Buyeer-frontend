import NavBar from "./componets/NavBar";
import HomePage from "./componets/homePage";

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
