import { Header } from "@/components/navigation";
import { Hero, Sub, AboutMe, WhyTrustMe } from "@/components/home";


const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <AboutMe />
      <WhyTrustMe />
      <Sub />
    </div>
  );
};

export default HomePage;
