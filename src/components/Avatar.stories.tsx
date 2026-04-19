import React from 'react';
import Avatar from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

const Template = (args) => <Avatar {...args} />;

export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://i.pravatar.cc/150?img=32',
  alt: 'John Doe',
};

export const WithFallback = Template.bind({});
WithFallback.args = {
  alt: 'Jane Smith',
  fallback: 'JS',
};

export const Small = Template.bind({});
Small.args = {
  alt: 'User',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  alt: 'Admin',
  size: 'lg',
};