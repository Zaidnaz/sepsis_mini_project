"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Thermometer,
  HeartPulse,
  Activity,
  AirVent,
  TestTube,
  User,
  List,
  Loader2,
  Info,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getSepsisRisk, getRiskExplanation } from "@/app/actions";
import type { AssessSepsisRiskOutput } from "@/ai/flows/assess-sepsis-risk";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const sepsisFormSchema = z.object({
  temperature: z.coerce.number().min(30, "Temperature seems too low.").max(45, "Temperature seems too high."),
  heartRate: z.coerce.number().min(30, "Heart rate seems too low.").max(250, "Heart rate seems too high."),
  bloodPressure: z.coerce.number().min(50, "Systolic BP seems too low.").max(250, "Systolic BP seems too high."),
  respiratoryRate: z.coerce.number().min(5, "Respiratory rate seems too low.").max(60, "Respiratory rate seems too high."),
  whiteBloodCellCount: z.coerce.number().min(1, "WBC count seems too low.").max(50, "WBC count seems too high."),
  age: z.coerce.number().int().min(0, "Age cannot be negative.").max(120, "Age seems too high."),
  chronicConditions: z.string().optional().default(""),
});

type SepsisFormValues = z.infer<typeof sepsisFormSchema>;

export default function SepsisForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessSepsisRiskOutput | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);
  const [formValues, setFormValues] = useState<SepsisFormValues | null>(null);

  const { toast } = useToast();

  const form = useForm<SepsisFormValues>({
    resolver: zodResolver(sepsisFormSchema),
    defaultValues: {
      temperature: 37,
      heartRate: 80,
      bloodPressure: 120,
      respiratoryRate: 16,
      whiteBloodCellCount: 8,
      age: 45,
      chronicConditions: "",
    },
  });

  async function onSubmit(values: SepsisFormValues) {
    setIsLoading(true);
    setAssessmentResult(null);
    setExplanation(null);
    setFormValues(values);

    const { data, error } = await getSepsisRisk({
        ...values,
        chronicConditions: values.chronicConditions || 'None'
    });

    setIsLoading(false);

    if (error || !data) {
      toast({
        title: "Error",
        description: error || "An unknown error occurred.",
        variant: "destructive",
      });
    } else {
      setAssessmentResult(data);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }

  async function handleExplainRisk() {
    if (!assessmentResult || !formValues) return;
    setIsExplanationLoading(true);
    setExplanation(null);

    const { data, error } = await getRiskExplanation({
        vitalSigns: {
            temperature: formValues.temperature,
            heartRate: formValues.heartRate,
            bloodPressure: formValues.bloodPressure,
            respiratoryRate: formValues.respiratoryRate,
            whiteBloodCellCount: formValues.whiteBloodCellCount,
        },
        riskLevel: assessmentResult.riskLevel
    });

    setIsExplanationLoading(false);

    if (error || !data) {
      toast({
        title: "Error",
        description: error || "An unknown error occurred while fetching explanation.",
        variant: "destructive",
      });
    } else {
      setExplanation(data.explanation);
    }
  }

  const riskLevelStyles = {
    low: "bg-accent/80 border-accent text-accent-foreground hover:bg-accent",
    medium: "bg-yellow-400/80 border-yellow-500 text-yellow-900 hover:bg-yellow-400",
    high: "bg-destructive/80 border-destructive text-destructive-foreground hover:bg-destructive",
  };
  
  const formFields = [
    { name: "temperature", label: "Temperature (°C)", icon: Thermometer },
    { name: "heartRate", label: "Heart Rate (bpm)", icon: HeartPulse },
    { name: "bloodPressure", label: "Systolic BP (mmHg)", icon: Activity },
    { name: "respiratoryRate", label: "Respiratory Rate", icon: AirVent },
    { name: "whiteBloodCellCount", label: "WBC (x10⁹/L)", icon: TestTube },
    { name: "age", label: "Age (years)", icon: User },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Vital Signs Input</CardTitle>
          <CardDescription>Enter patient data to assess sepsis risk using AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {formFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name as keyof SepsisFormValues}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-muted-foreground">
                          <field.icon className="h-4 w-4" />
                          {field.label}
                        </FormLabel>
                        <FormControl>
                          <Input type="number" step="any" {...formField} className="text-base"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormField
                control={form.control}
                name="chronicConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-muted-foreground">
                      <List className="h-4 w-4" />
                      Pre-existing Chronic Conditions (optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Diabetes, Hypertension, COPD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assessing...
                  </>
                ) : (
                  "Assess Sepsis Risk"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <Card className="animate-pulse">
          <CardHeader>
              <CardTitle>Analyzing Data</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">AI is analyzing the patient's vital signs...</p>
          </CardContent>
        </Card>
      )}

      {assessmentResult && (
        <Card className="border-primary/50 shadow-lg">
          <CardHeader>
            <CardTitle>AI-Powered Sepsis Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <h3 className="text-lg font-semibold text-secondary-foreground">Risk Level</h3>
              <Badge variant="outline" className={cn("text-base px-4 py-1 border-2", riskLevelStyles[assessmentResult.riskLevel])}>
                {assessmentResult.riskLevel.charAt(0).toUpperCase() + assessmentResult.riskLevel.slice(1)}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Prediction</h3>
              <p className="text-sm p-4 bg-background rounded-md border">{assessmentResult.prediction}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Reasoning</h3>
              <p className="text-sm p-4 bg-background rounded-md border">{assessmentResult.reasoning}</p>
            </div>
            
            {!explanation && !isExplanationLoading && (
                <Button onClick={handleExplainRisk} variant="outline" className="w-full">
                    <Info className="mr-2 h-4 w-4" />
                    Explain Risk Factors in Detail
                </Button>
            )}

            {isExplanationLoading && (
                <div className="flex items-center justify-center space-x-2 text-muted-foreground p-4">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>AI is preparing a detailed explanation...</span>
                </div>
            )}

            {explanation && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2"><Info className="h-5 w-5 text-accent"/>Detailed Explanation</h3>
                  <p className="text-sm p-4 bg-secondary text-secondary-foreground rounded-md border border-accent/30">{explanation}</p>
                </div>
            )}

          </CardContent>
        </Card>
      )}
    </div>
  );
}
