import "./globals.css";

import Alert from "@/components/alert";
import Footer from "@/components/footer";

import { draftMode } from "next/headers";
import Container from "@/components/container";

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <Alert preview={isEnabled} />
          <main>
            <Container>{children}</Container>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
