import ButtonComponent from "./components/Button";
import Banner from "./components/Banner";
import "./styles.css"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Banner className="Banner"/>
      <ButtonComponent className="Button"/>
    </main>
  );
}
