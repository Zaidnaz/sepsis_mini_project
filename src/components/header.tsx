import { Stethoscope } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center gap-4 p-4">
        <Stethoscope className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold font-headline text-foreground">
          Sepsis Sentinel
        </h1>
      </div>
    </header>
  );
}
