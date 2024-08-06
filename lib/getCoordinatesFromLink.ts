// utils/getCoordinatesFromLink.js
export async function getCoordinatesFromLink(url:any) {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      const data = await response.json();
  
      if (data.lat && data.lng) {
        return { lat: data.lat, lng: data.lng };
      }
    } catch (error) {
      console.error('Error resolving URL:', error);
    }
  
    return null;
  }
  