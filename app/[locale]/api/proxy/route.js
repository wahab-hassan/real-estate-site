// app/api/proxy/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const shortLink = searchParams.get('url');

  if (!shortLink) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Making the initial request to the shortened URL
    const initialResponse = await axios.get(shortLink, {
      maxRedirects: 0,
      validateStatus: (status) => status === 302, // Only resolve if status is 302
    });

    // The location header will contain the redirect URL
    const locationUrl = initialResponse.headers.location;

    if (locationUrl) {
      // Making a request to the final redirected URL
      const finalResponse = await axios.get(locationUrl, {
        maxRedirects: 0,
        validateStatus: (status) => status === 302 || status === 200,
      });

      // Extracting coordinates from the URL
      const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
      const matches = locationUrl.match(regex);

      if (matches) {
        const lat = parseFloat(matches[1]);
        const lng = parseFloat(matches[2]);
        return NextResponse.json({ lat, lng });
      }
    }

    return NextResponse.json({ error: 'Failed to retrieve location' }, { status: 500 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
