import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Wisata Seribu Pura | Jelajahi Bali",
  description: "Temukan destinasi, budaya, dan keindahan Pulau Bali bersama Wisata Seribu Pura."
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
