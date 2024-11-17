// import * as fs from 'fs';
// import * as path from 'path';
// import { fileURLToPath } from 'url';

// // ESM-compatible __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const main = async () => {
//   try {
//     const schemaPath = path.resolve(__dirname, 'schema.prisma');
//     const modelsDir = path.resolve(__dirname, 'models');

//     if (!fs.existsSync(modelsDir)) {
//       throw new Error(`Models directory not found at: ${modelsDir}`);
//     }

//     const modelFiles = fs
//       .readdirSync(modelsDir)
//       .filter(file => file.endsWith('.prisma'))
//       .map(file => path.join(modelsDir, file));

//     if (modelFiles.length === 0) {
//       throw new Error('No .prisma files found in the models directory.');
//     }

//     const baseSchema = fs.readFileSync(schemaPath, 'utf8');

//     const models = modelFiles
//       .map(file => fs.readFileSync(file, 'utf8'))
//       .join('\n\n');

//     const mergedSchema = `${baseSchema}\n\n${models}`;

//     fs.writeFileSync(schemaPath, mergedSchema);

//     console.log('Merged Prisma schema successfully!');
//   } catch (error: any) {
//     console.error('Error merging Prisma schemas:', error.message);
//   }
// };

// main();

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract entire blocks by keyword
const extractBlocks = (content: string, keywords: string[]): string => {
  const lines = content.split('\n');
  const extracted: string[] = [];
  let insideBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (keywords.some(keyword => trimmed.startsWith(keyword))) {
      insideBlock = true;
    }
    if (insideBlock) {
      extracted.push(line);
    }
    if (insideBlock && trimmed.endsWith('}')) {
      insideBlock = false;
    }
  }

  return extracted.join('\n');
};

const main = async () => {
  try {
    // Paths
    const schemaPath = path.resolve(__dirname, 'schema.prisma');
    const modelsDir = path.resolve(__dirname, 'models');

    // Validate models directory
    if (!fs.existsSync(modelsDir)) {
      throw new Error(`Models directory not found at: ${modelsDir}`);
    }

    // Collect all `.prisma` files
    const modelFiles = fs
      .readdirSync(modelsDir)
      .filter(file => file.endsWith('.prisma'))
      .map(file => path.join(modelsDir, file));

    if (modelFiles.length === 0) {
      throw new Error('No .prisma files found in the models directory.');
    }

    // Read the main schema file
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');

    // Extract the generator and datasource blocks
    const baseSchema = extractBlocks(schemaContent, ['generator', 'datasource']);

    // Concatenate all model files
    const models = modelFiles
      .map(file => fs.readFileSync(file, 'utf8'))
      .join('\n\n');

    // Combine everything
    const mergedSchema = `${baseSchema}\n\n${models}`;

    // Write the merged schema back to schema.prisma
    fs.writeFileSync(schemaPath, mergedSchema);

    console.log('Merged Prisma schema successfully!');
  } catch (error: any) {
    console.error('Error merging Prisma schemas:', error.message);
  }
};

main();

