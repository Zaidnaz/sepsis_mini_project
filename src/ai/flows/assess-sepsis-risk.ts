// AssessSepsisRisk Story: As a healthcare professional, I want to input patient vital signs and receive an AI-powered risk assessment for sepsis, so I can quickly evaluate the patient's condition and prioritize care.

'use server';

/**
 * @fileOverview A sepsis risk assessment AI agent.
 *
 * - assessSepsisRisk - A function that handles the sepsis risk assessment process.
 * - AssessSepsisRiskInput - The input type for the assessSepsisRisk function.
 * - AssessSepsisRiskOutput - The return type for the assessSepsisRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessSepsisRiskInputSchema = z.object({
  temperature: z.number().describe('Patient temperature in Celsius.'),
  heartRate: z.number().describe('Patient heart rate in beats per minute.'),
  bloodPressure: z
    .number()
    .describe('Patient systolic blood pressure in mmHg.'),
  respiratoryRate: z
    .number()
    .describe('Patient respiratory rate in breaths per minute.'),
  whiteBloodCellCount: z
    .number()
    .describe('Patient white blood cell count in cells per liter.'),
  age: z.number().describe('Patient age in years.'),
  chronicConditions: z
    .string()
    .describe(
      'A comma separated list of pre-existing conditions the patient has.'
    ),
});

export type AssessSepsisRiskInput = z.infer<typeof AssessSepsisRiskInputSchema>;

const AssessSepsisRiskOutputSchema = z.object({
  riskLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The assessed risk level for sepsis (low, medium, or high).'),
  prediction: z
    .string()
    .describe(
      'A short-term prediction (e.g., next 24 hours) of sepsis development based on the analysis.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the risk assessment based on the provided vital signs.'
    ),
});

export type AssessSepsisRiskOutput = z.infer<typeof AssessSepsisRiskOutputSchema>;

export async function assessSepsisRisk(input: AssessSepsisRiskInput): Promise<AssessSepsisRiskOutput> {
  return assessSepsisRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessSepsisRiskPrompt',
  input: {schema: AssessSepsisRiskInputSchema},
  output: {schema: AssessSepsisRiskOutputSchema},
  prompt: `You are an experienced healthcare professional assessing the risk of sepsis in patients.

  Based on the following vital signs and patient information, determine the risk level for sepsis (low, medium, or high) and provide a short-term prediction of sepsis development.

  Consider each vital sign and explain your reasoning for the risk assessment.

  Vital Signs:
  - Temperature: {{temperature}} °C
  - Heart Rate: {{heartRate}} bpm
  - Blood Pressure: {{bloodPressure}} mmHg
  - Respiratory Rate: {{respiratoryRate}} breaths/min
  - White Blood Cell Count: {{whiteBloodCellCount}} cells/L

  Patient Information:
  - Age: {{age}} years
  - Pre-existing Conditions: {{chronicConditions}}

  Respond with the risk level, prediction, and reasoning.
  Be sure to include the reasoning that went into determining the level of each vital sign.
  `,
});

const assessSepsisRiskFlow = ai.defineFlow(
  {
    name: 'assessSepsisRiskFlow',
    inputSchema: AssessSepsisRiskInputSchema,
    outputSchema: AssessSepsisRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
