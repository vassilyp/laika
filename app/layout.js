import "./globals.css";

export const metadata = {
  title: "Project Laika",
  description: "A space app meant for visualizing and communicating global climate change stories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
