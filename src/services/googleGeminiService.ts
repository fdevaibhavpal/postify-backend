import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/config';

interface GeneratePostRequest {
  postPrompt: string;
  category: string;
  subTopic: string;
}

interface GeneratePostResponse {
    responsePrompt: string;
}

const genAI = new GoogleGenerativeAI(config.GOOGLE_GEMINI_API_KEY);
const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };
export const generatePostWithGoogleGemini = async (data: GeneratePostRequest): Promise<GeneratePostResponse> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",generationConfig });
        const prompt =  `Create an Instagram post with the following details:
        Title: ${data.postPrompt}
        Category: ${data.category}
        Sub-topic: ${data.subTopic}`
        const result = await model.generateContent(prompt);
        const response = await result.response;
    
        return {
            responsePrompt: response.text(),
        };
      } catch (error) {
        console.error('Error generating post with Google Gemini:', error);
        throw new Error('Error generating post with Google Gemini');
      }
};
