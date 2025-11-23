import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HeaderWrapper />

      <main
        className="
          flex-1 container mx-auto px-4 py-8 
          animate-in fade-in-50 duration-300
        "
      >
        <div
          className="
            w-full h-full 
            rounded-xl border bg-card shadow-sm 
            p-6 md:p-8
            animate-in fade-in slide-in-from-bottom-2
          "
        >
          {children}
        </div>
      </main>

      <FooterWrapper />
    </div>
  );
}

function HeaderWrapper() {
  return (
    <div
      className="
        sticky top-0 z-50 
        backdrop-blur-md bg-background/70 
        border-b shadow-sm
      "
    >
      <Header />
    </div>
  );
}

/* Enhanced Footer Wrapper */
function FooterWrapper() {
  return (
    <div
      className="
        mt-8
        border-t 
        bg-background/60 backdrop-blur-sm 
        py-4 text-center text-sm text-muted-foreground
      "
    >
      <Footer />
    </div>
  );
}
