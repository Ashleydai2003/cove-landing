import { Client } from '@notionhq/client';

// Initialize Notion client with direct API key
const notion = new Client({
  auth: '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', // Replace this with your actual API key
});

export { notion }; 