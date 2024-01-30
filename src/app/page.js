import ButtonComponent from "./components/Button";
import Banner from "./components/Banner";
import "./styles.css"

export default function Home() {
  return (
    <main className="min-h-screen items-center p-24">
      <Banner className="Banner"/>
      <ButtonComponent className="Button"/>
    </main>
  );
}
