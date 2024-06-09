import { registerAs } from '@nestjs/config';

export default registerAs(
  'swagger',
  (): Record<string, any> => ({
    config: {
      info: {
        title: 'Perpus Pinjam Buku',
        setDescription: `Aplikasi pinjam buku yang saya kembangkan memiliki fitur lengkap untuk memudahkan pengelolaan perpustakaan. Aplikasi ini memungkinkan pengguna untuk meminjam dan mengembalikan buku dengan mudah. Selain itu, aplikasi ini juga dilengkapi dengan fitur CRUD (Create, Read, Update, Delete) untuk mengelola data buku dan anggota perpustakaan. Pengguna dapat menambahkan buku baru, melihat daftar buku yang tersedia, memperbarui informasi buku, dan menghapus buku yang tidak lagi dibutuhkan. Begitu pula dengan anggota perpustakaan, dimana data anggota dapat dikelola secara efisien melalui fitur CRUD yang tersedia. Dengan adanya aplikasi ini, diharapkan pengelolaan perpustakaan menjadi lebih terstruktur dan efisien, serta meningkatkan kenyamanan bagi pengguna dalam meminjam dan mengembalikan buku.`,
        setVersion: '1.0',
        setTermsOfService: 'https://example.com/terms',
        setContact: `'John Doe', 'john@example.com', 'https://example.com/contact'`,
        setLicense: `'MIT', 'https://example.com/license'`,
      },
      swaggerUI: process.env.SWAGGER_ENABLED == 'true' ? true : false,
      documentationPath: '/document-api/docs',
      documentationJson: '/document-api/docs-json',
      swaggerPassword: process.env.SWAGGER_PASSWORD,
      swaggerUser: process.env.SWAGGER_USER,
    },
    options: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    localUrl: process.env.SWAGGER_LOCAL_SERVER ?? 'http://localhost:3000',
    develompentUrl:
      process.env.SWAGGER_DEVELOPMENT_SERVER ?? 'https://example.com',
    productionUrl:
      process.env.SWAGGER_PRODUCTION_SERVER ?? 'https://example.com',
  }),
);
