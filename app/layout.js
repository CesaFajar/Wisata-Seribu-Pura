
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata = {
  title: "Wisata Seribu Pura | Jelajahi Bali",
  description:
    "Temukan destinasi, budaya, dan keindahan Pulau Bali bersama Wisata Seribu Pura.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
