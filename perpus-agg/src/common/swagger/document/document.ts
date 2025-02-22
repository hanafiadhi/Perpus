import { DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

interface IDocumentSwagger {
  title: string;
  setDescription: string;
  setVersion?: string;
  setTermsOfService?: string;
  setContact?: string;
  setLicense?: string;
  addBearerAuth: any;
  addApiKey?: any;
  addBasicAuth?: any;
  addOAuth2?: any;
  addTag?: any;

  localUrl: string;
  develompentUrl: string;
  productionUrl: string;
}
export class DocumentSwagger implements IDocumentSwagger {
  readonly title: string;
  readonly setDescription: string;
  readonly setVersion?: string;
  readonly setTermsOfService?: string;
  readonly setContact?: string;
  readonly setLicense?: string;
  readonly addBearerAuth: any;
  readonly addApiKey?: any;
  readonly addBasicAuth?: any;
  readonly addOAuth2?: any;
  readonly addTag?: any;
  readonly localUrl: string;
  readonly develompentUrl: string;
  readonly productionUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.title = configService.get<string>('swagger.config.info.title');
    this.setDescription = configService.get<string>(
      'swagger.config.info.setDescription',
    );
    this.title = configService.get<string>('swagger.config.info.title');

    this.localUrl = configService.get<string>('swagger.localUrl');
    this.develompentUrl = configService.get<string>('swagger.develompentUrl');
    this.productionUrl = configService.get<string>('swagger.productionUrl');
    this.setTermsOfService = configService.get<string>(
      'swagger.config.info.setTermsOfService',
    );
    this.setContact = configService.get<string>(
      'swagger.config.info.setContact',
    );
    this.setLicense = configService.get<string>(
      'swagger.config.info.setLicense',
    );
    // setContact: `'John Doe', 'john@example.com', 'https://example.com/contact'`,
    // setLicense: `'MIT', 'https://example.com/license'`,
  }

  public Builder() {
    return new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.setDescription)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token to access endpoint',
          in: 'header',
        },
        'jwt',
      )
      .setTermsOfService(this.setTermsOfService)
      .setContact(
        'Hanafi',
        'https://github.com/hanafiadhi',
        'example@gmail.com',
      )
      .setLicense('MIT', 'https://example.com/license')
      .addServer(`${this.localUrl}`, 'Local Server')
      .addServer(`${this.develompentUrl}`, 'Development Server')
      .addServer(`${this.productionUrl}`, 'Production Server')
      .build();
  }
}
