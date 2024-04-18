import Footer from "../components/Footer/Footer.tsx";
import Header from "../components/Header/Header.tsx";
import Hero from "../components/Hero/Hero.tsx";
import SearchBar from "../components/Search/SearchBar.tsx";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
