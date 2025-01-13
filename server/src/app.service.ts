import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MAIN_CONFIG } from './config/main.config';
import { LoggerProvider } from './service/index';

@Injectable()
export class AppService {
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

  async googleAiService(image: Buffer<ArrayBufferLike>): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'models/gemini-1.5-pro',
    });
    const prompt_text = `
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

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(image).toString('base64'),
          mimeType: 'image/jpeg',
        },
      },
      prompt_text,
    ]);
    const jsonMatch = result.response.text().match(/{[\s\S]*}/);
    return JSON.parse(jsonMatch[0]);
  }
}
