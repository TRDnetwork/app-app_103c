import React, { useState } from 'react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template = (args) => {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Text = Template.bind({});
Text.args = {
  label: 'Name',
  type: 'text',
  placeholder: 'Enter your name',
};

export const Email = Template.bind({});
Email.args = {
  label: 'Email',
  type: 'email',
  placeholder: 'Enter your email',
};

export const Password = Template.bind({});
Password.args = {
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Email',
  type: 'email',
  error: 'Please enter a valid email address',
  placeholder: 'Enter your email',
};

export const WithHelpText = Template.bind({});
WithHelpText.args = {
  label: 'Username',
  helpText: 'This will be your public profile name.',
  placeholder: 'Choose a username',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Phone Number',
  type: 'tel',
  required: true,
  placeholder: '(555) 123-4567',
};