'use server';

/**
 * @fileOverview This flow explains the reasoning behind the sepsis risk assessment,
 * highlighting which vital signs are most critical.
 *
 * - explainRiskFactors - A function that explains the risk factors.
 * - ExplainRiskFactorsInput - The input type for the explainRiskFactors function.
 * - ExplainRiskFactorsOutput - The return type for the explainRiskFactors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainRiskFactorsInputSchema = z.object({
  vitalSigns: z
    .object({
      temperature: z.number().describe('Temperature in Celsius.'),
      heartRate: z.number().describe('Heart rate in beats per minute.'),
      bloodPressure: z.number().describe('Systolic blood pressure in mmHg.'),
      respiratoryRate: z.number().describe('Respiratory rate in breaths per minute.'),
      whiteBloodCellCount: z.number().describe('White blood cell count in cells/L.'),
    })
    .describe('Patient vital signs.'),
  riskLevel: z
    .string()
    .describe('The overall risk level of sepsis (low, medium, or high).'),
});
export type ExplainRiskFactorsInput = z.infer<typeof ExplainRiskFactorsInputSchema>;

const ExplainRiskFactorsOutputSchema = z.object({
  explanation: z.string().describe('Explanation of the risk factors, highlighting critical vital signs.'),
});
export type ExplainRiskFactorsOutput = z.infer<typeof ExplainRiskFactorsOutputSchema>;

export async function explainRiskFactors(input: ExplainRiskFactorsInput): Promise<ExplainRiskFactorsOutput> {
  return explainRiskFactorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainRiskFactorsPrompt',
  input: {schema: ExplainRiskFactorsInputSchema},
  output: {schema: ExplainRiskFactorsOutputSchema},
  prompt: `You are an AI assistant providing medical explanations for sepsis risk assessments.

  Based on the patient's vital signs and the overall risk level, explain the reasoning behind the risk assessment.
  Highlight which vital signs are most critical and how they contribute to the sepsis risk. Be concise and clear.

  Vital Signs:
  - Temperature: {{{vitalSigns.temperature}}} °C
  - Heart Rate: {{{vitalSigns.heartRate}}} bpm
  - Blood Pressure: {{{vitalSigns.bloodPressure}}} mmHg
  - Respiratory Rate: {{{vitalSigns.respiratoryRate}}} breaths/min
  - White Blood Cell Count: {{{vitalSigns.whiteBloodCellCount}}} cells/L
  Risk Level: {{{riskLevel}}}

  Explanation:`,
});

const explainRiskFactorsFlow = ai.defineFlow(
  {
    name: 'explainRiskFactorsFlow',
    inputSchema: ExplainRiskFactorsInputSchema,
    outputSchema: ExplainRiskFactorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
