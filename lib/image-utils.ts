import { API_URL } from './api-config';

/**
 * Converts image paths to full URLs for network loading.
 * 
 * Handles multiple scenarios:
 * 1. If already a full URL (http/https), returns as-is
 * 2. If relative path starting with 'storage/', prepends base URL
 * 3. If relative path without 'storage/', adds '/storage/' prefix
 * 4. If path starts with '/', removes leading slash before processing
 * 
 * Uses the base URL from API_URL (without /api/ suffix) for consistency.
 * 
 * @param imagePath - The image path or URL to convert
 * @returns The full image URL or empty string if path is empty
 */
export function loadImage(imagePath: string): string {
  // Return early if empty
  if (!imagePath || imagePath.trim() === '') {
    return '';
  }

  // If already a full URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Extract base URL without /api/ suffix
  // API_URL might be 'https://menzili-utx2r.sevalla.app/api'
  // We need 'https://menzili-utx2r.sevalla.app' for images
  let baseUrl = API_URL;
  
  if (baseUrl.endsWith('/api/')) {
    baseUrl = baseUrl.substring(0, baseUrl.length - 5); // Remove '/api/'
  } else if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.substring(0, baseUrl.length - 4); // Remove '/api'
  }
  
  // Remove trailing slash if present
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.substring(0, baseUrl.length - 1);
  }

  // Normalize path: remove leading slash
  const path = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;

  // Build final URL
  if (path.startsWith('storage/')) {
    return `${baseUrl}/${path}`;
  } else {
    return `${baseUrl}/storage/${path}`;
  }
}

/**
 * Returns the profile image URL with fallback to default avatar.
 * 
 * If profileImage is provided and not empty, it will be normalized using loadImage.
 * Otherwise, returns the defaultAvatarUrl (also normalized if provided).
 * 
 * This ensures consistent image loading across the app with proper fallback handling.
 * 
 * @param options - Object containing profileImage and optional defaultAvatarUrl
 * @param options.profileImage - The user's profile image path
 * @param options.defaultAvatarUrl - Fallback avatar URL (optional)
 * @returns The profile image URL or empty string if neither is available
 */
export function getProfileImageUrl({
  profileImage,
  defaultAvatarUrl,
}: {
  profileImage?: string | null;
  defaultAvatarUrl?: string | null;
}): string {
  // If profile image exists and is not empty, use it
  if (profileImage && profileImage.trim() !== '') {
    return loadImage(profileImage);
  }
  
  // Otherwise, fall back to default avatar if provided
  if (defaultAvatarUrl && defaultAvatarUrl.trim() !== '') {
    return loadImage(defaultAvatarUrl);
  }
  
  // Return empty string if neither is available
  return '';
}
