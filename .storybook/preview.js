import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      { name: 'beige', value: '#faf8f5' },
      { name: 'dark', value: '#1a2e1a' },
    ],
  },
};

// Add global decorator for consistent styling
export const decorators = [
  (Story) => (
    <div style={{ padding: '20px', backgroundColor: '#faf8f5', minHeight: '100vh' }}>
      <Story />
    </div>
  ),
];