import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-0 items-center">
              <nav className="w-full flex justify-center border-b h-16">
                <div className="w-full max-w-7xl flex justify-between items-center sm:px-7 px-3 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Image
                      src={`/engineer_help_engineer_text_only.png`}
                      alt="logo"
                      height="54"
                      width="190"
                      className="block dark:hidden"
                    />
                    <Image
                      src={`/engineer_help_engineer_text_only_white.png`}
                      alt="logo"
                      height="54"
                      width="190"
                      className="hidden dark:block"
                    />
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className="mb-auto w-full max-w-7xl sm:px-7 px-3 mx-auto">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs  py-2">
                <p>Build with ❤️ by Dienastya Galih</p>
                <p className="px-3">|</p>
                <p>Theme</p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
