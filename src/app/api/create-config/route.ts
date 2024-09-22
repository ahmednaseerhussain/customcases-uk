import { db } from '@/db';

export async function POST(req: Request) {
  try {
    // Parse the request JSON
    const { height, width, color, model, material, finish, imageUrl } = await req.json();

    // Create a configuration in the database
    const configuration = await db.configuration.create({
      data: {
        height: height || 500, // Default to 500 if not provided
        width: width || 500,   // Default to 500 if not provided
        color: color || null,  // Optional field
        model: model || null,  // Optional field
        material: material || null, // Optional field
        finish: finish || null, // Optional field
        imageUrl: imageUrl || '', // Required field, set to an empty string if not provided
      },
    });

    // Return the configId in the response
    return new Response(JSON.stringify({ configId: configuration.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating configuration:', error);
    return new Response('Failed to create configuration', { status: 500 });
  }
}
