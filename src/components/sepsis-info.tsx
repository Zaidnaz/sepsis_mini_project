import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ShieldCheck, Zap } from 'lucide-react';

export default function SepsisInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-primary" />
          <span>Understanding Sepsis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground/90">
        <p>
          Sepsis is a life-threatening medical emergency. It happens when an infection you already have triggers a chain reaction throughout your body, leading to tissue damage, organ failure, and death.
        </p>

        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-destructive/80" />
            <span>Key Symptoms (S.T.O.P.)</span>
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><span className="font-semibold">S</span>hivering, fever, or very cold</li>
            <li><span className="font-semibold">T</span>remendous pain or discomfort</li>
            <li><span className="font-semibold">O</span>ut of breath</li>
            <li><span className="font-semibold">P</span>ale or discolored skin, sleepy, difficult to rouse</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <span>Importance of Early Detection</span>
          </h3>
          <p>
            Early detection and treatment are critical. For every hour treatment is delayed, the risk of death increases significantly. This AI tool is designed to assist healthcare professionals in making rapid, informed decisions by analyzing key vital signs to assess sepsis risk.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
