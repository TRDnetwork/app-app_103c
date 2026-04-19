import '../src/lib/globals.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'beige',
    values: [
      { name: 'beige', value: '#faf8f5' },
      { name: 'surface', value: '#e9e5dd' },
      { name: 'dark', value: '#1a2e1a' },
    ],
  },
};

// Global decorators
export const decorators = [
  (Story) => (
    <div style={{ padding: '24px', backgroundColor: '#faf8f5', minHeight: '100vh' }}>
      <Story />
    </div>
  ),
];