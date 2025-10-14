import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const term = searchParams.get('term');
  
  if (!term) {
    return NextResponse.json({ error: 'Term parameter is required' }, { status: 400 });
  }

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=musicTrack,musicArtist&limit=4`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; TuneScape/1.0)',
      },
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Create response with proper headers for Safari compatibility
    const jsonResponse = NextResponse.json(data);
    jsonResponse.headers.set('Access-Control-Allow-Origin', '*');
    jsonResponse.headers.set('Access-Control-Allow-Methods', 'GET');
    jsonResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return jsonResponse;
  } catch (error) {
    console.error('Error fetching iTunes data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
}