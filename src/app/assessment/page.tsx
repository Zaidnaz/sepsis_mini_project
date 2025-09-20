'use client';
import { Suspense } from 'react';
import Header from '@/components/header';
import SepsisForm from '@/components/sepsis-form';
import SepsisInfo from '@/components/sepsis-info';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function AssessmentPageContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {name && <h2 className="text-3xl font-bold mb-8">Welcome, {name}!</h2>}
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

export default function AssessmentPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <AssessmentPageContent />
        </Suspense>
    );
}
