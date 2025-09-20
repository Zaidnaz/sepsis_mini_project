import Header from '@/components/header';
import SepsisForm from '@/components/sepsis-form';
import SepsisInfo from '@/components/sepsis-info';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <SepsisForm />
          </div>
          <div className="md:col-span-2">
            <SepsisInfo />
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>Sepsis Sentinel - AI-Powered Early Detection. For informational purposes only.</p>
      </footer>
    </div>
  );
}
