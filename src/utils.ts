import colors from 'vuetify/util/colors';

export function wait(value: number) {
  return new Promise(resolve => setTimeout(resolve, value));
}

export function isValidUrl(url: string) {
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

  return urlPattern.test(url.trim());
}

export function isYouTubeUrl(url?: string): boolean {
  if (!url) return false;

  try {
    const parsed = new URL(url);

    const isYouTubeHost = [
      'youtube.com',
      'www.youtube.com',
      'youtu.be',
      'm.youtube.com',
    ].includes(parsed.hostname);

    const isWatchUrl = parsed.pathname === '/watch' && parsed.searchParams.has('v');
    const isShortUrl = parsed.hostname === 'youtu.be' && parsed.pathname.length > 1;

    return isYouTubeHost && (isWatchUrl || isShortUrl);
  } catch {
    return false;
  }
}

export function httpsUrl(url: string) {
  if (url && !/^https?:\/\//i.test(url.trim())) {
    return `https://${url.trim()}`;
  }

  return url;
}

export function stringToColor(value: string, theme: string) {
  const hash = [...value].reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0);
  const colorKeys = Object.keys(colors);
  const color = colors[colorKeys[Math.abs(hash % colorKeys.length)]];

  return color?.[theme === 'dark' ? 'lighten3' : 'darken4'] || null;
}
