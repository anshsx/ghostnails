import Image from "next/image";
import Homer from "./home";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-12 lg:p-16">
      <Homer/>
    </main>
  );
}