import React, { useState } from 'react';
import Toast from './Toast';
import Button from './Button';

export default {
  title: 'Components/Toast',
  component: Toast,
};

const Template = (args) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div style={{ position: 'relative', minHeight: '200px' }}>
      <Button onClick={() => setIsVisible(true)}>Show Toast</Button>
      <Toast {...args} isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </div>
  );
};

export const Success = Template.bind({});
Success.args = {
  message: 'Your changes have been saved!',
  type: 'success',
};

export const Error = Template.bind({});
Error.args = {
  message: 'Failed to save changes. Please try again.',
  type: 'error',
};

export const Warning = Template.bind({});
Warning.args = {
  message: 'This action cannot be undone.',
  type: 'warning',
};

export const Info = Template.bind({});
Info.args = {
  message: 'New update available for download.',
  type: 'info',
};