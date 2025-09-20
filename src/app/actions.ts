'use server';

import { assessSepsisRisk, AssessSepsisRiskInput, AssessSepsisRiskOutput } from '@/ai/flows/assess-sepsis-risk';
import { explainRiskFactors, ExplainRiskFactorsInput, ExplainRiskFactorsOutput } from '@/ai/flows/explain-risk-factors';

export async function getSepsisRisk(values: AssessSepsisRiskInput): Promise<{
    data: AssessSepsisRiskOutput | null,
    error: string | null
}> {
    try {
        const result = await assessSepsisRisk(values);
        return { data: result, error: null };
    } catch (e) {
        console.error(e);
        return { data: null, error: "Failed to assess sepsis risk. Please try again." };
    }
}

export async function getRiskExplanation(values: ExplainRiskFactorsInput): Promise<{
    data: ExplainRiskFactorsOutput | null,
    error: string | null
}> {
    try {
        const result = await explainRiskFactors(values);
        return { data: result, error: null };
    } catch (e) {
        console.error(e);
        return { data: null, error: "Failed to get explanation. Please try again." };
    }
}
