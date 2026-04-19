import React from 'react';
import Badge from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
  },
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: 'Success',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  children: 'Warning',
};

export const Error = Template.bind({});
Error.args = {
  variant: 'error',
  children: 'Error',
};