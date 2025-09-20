import { config } from 'dotenv';
config();

import '@/ai/flows/assess-sepsis-risk.ts';
import '@/ai/flows/explain-risk-factors.ts';