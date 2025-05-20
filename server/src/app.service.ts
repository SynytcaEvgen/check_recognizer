import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MAIN_CONFIG } from './config/main.config';
import { LoggerProvider } from './service/index';
import { AzureOpenAI } from 'openai';

@Injectable()
export class AppService {
  prompt_text = `
  you are a bill recognizer program; you need to recognize the bill in the 
      image and make a response in JSON format like: 
      {
      	company_name: "company name",
      	location: "location",
      	bill_number: "bill number",
      	bill_date: "bill date",
      	goods: [
      		name: "name",
      		quantity: "quantity",
      		price_per_one: "price per one",
      		total_price: "total price"
      	],
      	total_price: "total price"
      }
      If you cannot recognize the image as a check, please return it as JSON with empty fields
      and on the field the "company name" write - "This photo can't be recognized as the check,
      please remake a photo."`;
  constructor(
    private readonly genAI: GoogleGenerativeAI,
    private logger: LoggerProvider,
  ) {
    this.genAI = new GoogleGenerativeAI(MAIN_CONFIG.googleGenerativeAIapiKey);
    this.logger = new LoggerProvider(AppService.name);
  }
  healthCheck(): { status: number; message: string } {
    this.logger.debug('Service is up and running');
    return {
      status: 200,
      message: 'Service is up and running',
    };
  }

  async googleAiService(
    image: Buffer<ArrayBufferLike>,
  ): Promise<{ [key: string]: string }> {
    const model = this.genAI.getGenerativeModel({
      model: 'models/gemini-1.5-pro',
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(image).toString('base64'),
          mimeType: 'image/jpeg',
        },
      },
      this.prompt_text,
    ]);
    return this.jsonReturn(result.response.text());
  }

  async microsoftAzureAiService(
    image: Buffer<ArrayBufferLike>,
  ): Promise<{ [key: string]: string }> {
    const apiVersion = '2024-10-21';
    const llm_model = 'gpt-4o';

    const client = new AzureOpenAI({
      apiKey: MAIN_CONFIG.azureOpenAIKey,
      endpoint: MAIN_CONFIG.azureOpenAIEndpoint,
      apiVersion: apiVersion,
      deployment: llm_model,
    });
    const base64Image = Buffer.from(image).toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
    const messages: any[] = [
      // Use 'any[]' for messages if type definitions are strict
      {
        role: 'user',
        content: [
          { type: 'text', text: this.prompt_text },
          {
            type: 'image_url',
            image_url: {
              url: dataUrl,
            },
          },
        ],
      },
    ];
    try {
      const result = await client.chat.completions.create({
        model: llm_model,
        messages: messages,
      });
      return this.jsonReturn(result.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      throw new Error(error);
    }
  }
  private jsonReturn(llm_response: string): { [key: string]: string } {
    const jsonMatch = llm_response.match(/{[\s\S]*}/);
    return JSON.parse(jsonMatch[0]);
  }
}
