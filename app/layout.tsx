import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Batman do Futuro | O amanhã pertence ao morcego",
  description: "Uma experiência conceitual sobre Terry McGinnis, o Batman de Neo-Gotham.",
  icons: {
    icon: "/assets/batman-beyond-wordmark.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
