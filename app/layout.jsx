import './globals.css'

export const metadata = {
  title: 'Hedwig',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        {children}
      </body>
    </html>
  )
}
