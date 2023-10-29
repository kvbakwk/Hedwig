import "./globals.css";

export const metadata = {
  title: "schcool",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
