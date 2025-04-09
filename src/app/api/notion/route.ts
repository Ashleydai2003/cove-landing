// Import required modules
import { NextResponse } from 'next/server';
import { notion } from '@/lib/notion';

// This is our API route handler for form submissions
export async function POST(request: Request) {
  try {
    // Get the form data from the request body
    const body = await request.json();
    console.log('API Route - Received form data:', body);
    
    // Check if all required fields are present
    if (!body.fullName || !body.phoneNumber || !body.city || !body.age) {
      console.log('API Route - Missing required fields');
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    console.log('API Route - Attempting to create Notion page...');
    
    // Create a new page in the Notion database
    const response = await notion.pages.create({
      // Specify which database to add the page to
      parent: {
        database_id: '1d0df4227f458082b526e20f15cbd891',
      },
      // Map form fields to Notion database columns
      properties: {
        // Name field (title type in Notion)
        Name: {
          title: [
            {
              text: {
                content: body.fullName
              }
            }
          ]
        },
        // Phone field (phone number type in Notion)
        Phone: {
          phone_number: body.phoneNumber
        },
        // Age field (number type in Notion)
        Age: {
          number: parseInt(body.age)
        },
        // City field (rich text type in Notion)
        City: {
          rich_text: [
            {
              text: {
                content: body.city
              }
            }
          ]
        }
      }
    });

    // Log success and return the response
    console.log('API Route - Notion API response:', response);
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('API Route - Detailed Notion API error:', error);
    if (error instanceof Error) {
      console.error('API Route - Error message:', error.message);
      console.error('API Route - Error stack:', error.stack);
    }
    // Return error response to the client
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create page',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 