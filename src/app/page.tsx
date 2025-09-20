import Header from '@/components/header';
import PersonalDetailsForm from '@/components/personal-details-form';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
            <PersonalDetailsForm />
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>Sepsis Sentinel - AI-Powered Early Detection. For informational purposes only.</p>
      </footer>
    </div>
  );
}
