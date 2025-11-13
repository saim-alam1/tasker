import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import TaskBoard from "./TaskBoard";

export default function App() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <HeroSection />
      <TaskBoard />
      <Footer />
    </div>
  );
}
