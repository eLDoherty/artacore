export const metadata = {
  title: 'Artacore v1',
  description: 'Really simple CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )

}
