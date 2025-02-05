import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Notes App",
  description:
    "A minimal notes app to add and manage your notes easily. Stay organized and productive!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="gradient" />
          <main className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
