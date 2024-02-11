"use client";
import ButtonComponent from "./components/Button";
import Banner from "./components/Banner";
import "./styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = sessionStorage.getItem("accessToken");
    if (!authToken) {
      router.push("/login");
    } else {
      setLoading(true);
    }
  }, [router]);

  return (
    <div className="main">
      {loading ? (
        <main className="min-h-screen items-center p-24">
          <Banner className="Banner" />
          <ButtonComponent className="Button" />
        </main>
      ) : (
        <></>
      )}
    </div>
  );
}
