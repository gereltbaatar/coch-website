import { Header } from "@/components/navigation";
import { Hero, Sub, AboutMe, WhyTrustMe, WorkTogether, SuccessStories, Blog, Contact } from "@/components/home";


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
      <Contact />
      <Sub />
    </>
  );
};

export default HomePage;
