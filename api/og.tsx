import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Note: This is a foundational API route for dynamic OG Image generation.
// When deployed to Vercel, this endpoint will dynamically generate images
// for your journal articles based on the ?title= and ?date= query parameters.

export default function functionOG(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'OBJEKT Studio';
    const date = searchParams.get('date') || 'Independent design studio';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#1a0f08', // --background mapping
            padding: '120px',
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontFamily: 'monospace',
              color: 'rgba(255, 235, 210, 0.6)', // --foreground with opacity
              marginBottom: 40,
            }}
          >
            {date}
          </div>
          <div
            style={{
              fontSize: 100,
              fontFamily: 'serif',
              color: '#ffebd2', // --foreground
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
