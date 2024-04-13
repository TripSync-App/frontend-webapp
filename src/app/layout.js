import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TripSync",
  authors: [
    { name: "Kai Battle" },
    { name: "Josh Daughtery" },
    { name: "Akshar Patel" },
    { name: "Neha Moolchandani" },
    { name: "Jayden Pyles" },
  ],
  description: "Your Favorite Trip Assistant!",
  keywords: ["Travel", "React", "Jira", "Planning", "Exploration"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOTr7B5SUxk0GIIhWt3mAWYJe3KXBy3Fk&libraries=places&callback=initMap"
          async
        ></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon?favicon.png" type="image/" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
