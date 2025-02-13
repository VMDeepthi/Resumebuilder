import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateSummary(experience: string, skills: string[]): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Write a professional summary for a resume based on the following experience and skills:
    
Experience:
${experience}

Skills:
${skills.join(', ')}

The summary should be concise (2-3 sentences), professional, and highlight key strengths and achievements.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    return '';
  }
}

export async function improveDescription(description: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Improve the following job description to be more impactful and achievement-oriented:

${description}

Make it concise and use strong action verbs. Focus on quantifiable achievements where possible.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error improving description:', error);
    return description;
  }
}