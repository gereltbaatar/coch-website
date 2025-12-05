import { Header } from "@/components/navigation";
import { Hero, Sub, AboutMe, WhyTrustMe, WorkTogether, SuccessStories, Blog } from "@/components/home";


const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <WhyTrustMe />
      <WorkTogether />
      <SuccessStories />
      <Blog />
      <Sub />
    </>
  );
};

export default HomePage;
