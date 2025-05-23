import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'GRAND - Элитная недвижимость',
  description: 'Строительная компания GRAND - продажа элитных квартир в новых жилых комплексах',
  keywords: 'недвижимость, квартиры, новостройки, Алматы, элитное жилье',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}