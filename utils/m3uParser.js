export const parseM3U = (m3uContent) => {
    const lines = m3uContent.split('\n');
    const playlist = [];
    let currentEntry = null;
  
    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('#EXTINF:')) {
        const [duration, title] = line.substring(8).split(',', 2);
        currentEntry = { duration: parseInt(duration, 10), title: title.trim() };
      } else if (line && !line.startsWith('#')) {
        if (currentEntry) {
          currentEntry.url = line;
          playlist.push(currentEntry);
          currentEntry = null;
        }
      }
    });
  
    return playlist;
  };
  