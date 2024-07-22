import { Request, Response } from 'express';
import { Campaign } from '../models/campaignModel';
import { generatePostWithGoogleGemini } from '../services/googleGeminiService';
export const createCampaign = async (req: Request, res: Response) => {
  const { postPrompt, category, subTopic } = req.body;

  try {
    // Generate post using Google Gemini API
    const generatedPost = await generatePostWithGoogleGemini({ postPrompt, category, subTopic });
    const codeSnippets = extractCodeSnippets(generatedPost.responsePrompt);
    console.log("codeSnippets",codeSnippets)
    // Save the campaign to the database
    const campaign = new Campaign({
      postPrompt,
      category,
      subTopic,
      responsePrompt: codeSnippets,
    });

    await campaign.save();

    res.status(201).json({
        category: campaign.category,
        subTopic: campaign.subTopic,
        responsePrompt: campaign.responsePrompt,
      });
  } catch (error: any) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Error creating campaign' });
  }
};


const extractCodeSnippets = (text: string) => {
    const codeBlockPattern = /```(.*?)\n([\s\S]*?)```/g;
    const codeSnippets: {language: string; code: string }[] = [];
    let match;
  
    while ((match = codeBlockPattern.exec(text)) !== null) {
      const [_, language, code] = match;
      codeSnippets.push({
        
        language: language.trim(),
        code: code.trim(),
      });
    }
  
    return codeSnippets;
  };


  // New controller function to get a campaign by ID
export const getCampaignById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const campaign = await Campaign.findById(id);
  
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
  
      res.status(200).json(campaign);
    } catch (error: any) {
      console.error('Error fetching campaign:', error);
      res.status(500).json({ error: 'Error fetching campaign' });
    }
  };