import ExampleSection from '../components/Home/ExampleSection';
import Footer from '../components/Home/Footer';
import Header from '../components/Home/Header';
import HeroSection from '../components/Home/HeroSection';
import HowItWorks from '../components/Home/HowItWorks';
import MinutaGenerator from '../components/Home/MinutaGenerator';


export default function GenerarMinutaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <HowItWorks />
        <ExampleSection />
        <MinutaGenerator />
      </main>

      <Footer />
    </div>
  );
}