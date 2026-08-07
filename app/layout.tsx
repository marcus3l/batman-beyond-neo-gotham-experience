import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Batman Beyond — Neo-Gotham Experience",
  description: "Uma experiência digital imersiva sobre Terry McGinnis, Bruce Wayne e o futuro de Neo-Gotham.",
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
