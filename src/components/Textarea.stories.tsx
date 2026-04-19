import React, { useState } from 'react';
import Textarea from './Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
};

const Template = (args) => {
  const [value, setValue] = useState('');
  return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Message',
  placeholder: 'Enter your message',
  rows: 4,
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Feedback',
  error: 'Feedback cannot be empty',
  placeholder: 'Share your thoughts',
};

export const WithHelpText = Template.bind({});
WithHelpText.args = {
  label: 'Bio',
  helpText: 'Tell us about yourself in 150 characters or less.',
  placeholder: 'A little about me...',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Description',
  required: true,
  placeholder: 'Describe the project',
};