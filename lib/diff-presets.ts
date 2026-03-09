export interface DiffPreset {
  id: string;
  name: string;
  category: 'json' | 'text';
  left: string;
  right: string;
}

export const diffPresets: DiffPreset[] = [
  {
    id: 'preset-1',
    name: 'Minor Tweak',
    category: 'json',
    left: JSON.stringify(
      {
        name: 'Leafpad',
        version: '1.2.0',
        description: 'Clean devtools',
        settings: { theme: 'dark', indentSize: 2, wordWrap: true },
        features: ['formatter', 'diff', 'minify']
      },
      null,
      2
    ),
    right: JSON.stringify(
      {
        name: 'Leafpad',
        version: '1.2.1',
        description: 'Clean devtools',
        settings: { theme: 'dark', indentSize: 4, wordWrap: true },
        features: ['formatter', 'diff', 'minify']
      },
      null,
      2
    )
  },
  {
    id: 'preset-2',
    name: 'Small Update',
    category: 'json',
    left: JSON.stringify(
      {
        user: 'ada',
        role: 'editor',
        permissions: ['read', 'write'],
        profile: { displayName: 'Ada L.', avatar: null, bio: 'Software engineer' }
      },
      null,
      2
    ),
    right: JSON.stringify(
      {
        user: 'ada',
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
        profile: {
          displayName: 'Ada Lovelace',
          avatar: 'https://example.com/ada.png',
          bio: 'Software engineer & mathematician'
        }
      },
      null,
      2
    )
  },
  {
    id: 'preset-3',
    name: 'Completely Different',
    category: 'json',
    left: JSON.stringify(
      {
        type: 'invoice',
        id: 'INV-001',
        date: '2026-01-15',
        customer: { name: 'Acme Corp', address: '123 Main St' },
        items: [
          { description: 'Widget A', qty: 10, price: 9.99 },
          { description: 'Widget B', qty: 5, price: 19.99 }
        ],
        total: 199.85
      },
      null,
      2
    ),
    right: JSON.stringify(
      {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'Headquarters', employees: 120 },
            geometry: { type: 'Point', coordinates: [-122.4194, 37.7749] }
          }
        ],
        metadata: { source: 'manual', updatedAt: '2026-03-01T12:00:00Z' }
      },
      null,
      2
    )
  },
  {
    id: 'text-preset-1',
    name: 'Bug Fix',
    category: 'text',
    left: `function greet(name) {
  if (name = null) {
    return "Hello, stranger!";
  }
  return "Hello, " + name + "!";
}

const result = greet("world");
console.log(result);`,
    right: `function greet(name) {
  if (name === null || name === undefined) {
    return "Hello, stranger!";
  }
  return \`Hello, \${name}!\`;
}

const result = greet("world");
console.log(result);`
  },
  {
    id: 'text-preset-2',
    name: 'Config Change',
    category: 'text',
    left: `# Server Configuration
HOST=localhost
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://localhost:5432/myapp
REDIS_URL=redis://localhost:6379
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3000`,
    right: `# Server Configuration
HOST=0.0.0.0
PORT=8080
NODE_ENV=production
DATABASE_URL=postgres://db.internal:5432/myapp
REDIS_URL=redis://cache.internal:6379
LOG_LEVEL=warn
CORS_ORIGIN=https://myapp.com
RATE_LIMIT=100`
  },
  {
    id: 'text-preset-3',
    name: 'Prose Edit',
    category: 'text',
    left: `The quick brown fox jumps over the lazy dog.
It was a warm summer afternoon.
The children played in the park while their parents watched.
Birds sang in the trees above.
Everything was peaceful and calm.`,
    right: `The quick brown fox leaps over the sleeping dog.
It was a cool autumn evening.
The children played in the park while their parents watched.
Owls hooted in the trees above.
Everything was peaceful, yet something felt different.`
  }
];
