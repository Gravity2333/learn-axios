export default function parseHeaders(raw: string):Record<string, any> {
    const headers = {};
    raw.trim().split(/[\r\n]+/).forEach(line => {
      const parts = line.split(': ');
      const key = parts.shift();
      const value = parts.join(': ');
      headers[key.toLowerCase()] = value;
    });
    return headers;
  }