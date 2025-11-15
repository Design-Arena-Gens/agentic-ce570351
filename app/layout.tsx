export const metadata = {
  title: 'AI Horror Story Video Generator',
  description: 'Generate engaging horror stories with deep voice narration and atmospheric sound effects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
