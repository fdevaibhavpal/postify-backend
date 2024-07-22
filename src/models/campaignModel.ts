import { Schema, model, Document } from 'mongoose';

export interface ICodeSnippet {
  language: string;
  code: string;
}
export interface ICampaign extends Document {
  contentCreatorName?: string;
  creatorLogo?: string;
  postPrompt: string;
  subtitle?: string;
  description?: string;
  category: string;
  subTopic: string;
  responsePrompt: ICodeSnippet[];
}

const codeSnippetSchema = new Schema<ICodeSnippet>({
  language: { type: String, required: true },
  code: { type: String, required: true },
});

const CampaignSchema = new Schema<ICampaign>({
  contentCreatorName: { type: String, required: false },
  creatorLogo: { type: String, required: false },
  postPrompt: { type: String, required: true },
  subtitle: { type: String, required: false },
  description: { type: String, required: false },
  category: { type: String, required: true },
  subTopic: { type: String, required: true },
  responsePrompt: { type: [codeSnippetSchema], required: true },
}, { collection: 'campaigns' });

export const Campaign = model<ICampaign>('Campaign', CampaignSchema);
