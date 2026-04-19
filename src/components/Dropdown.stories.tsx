import React from 'react';
import Dropdown from './Dropdown';
import Button from './Button';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

const Template = (args) => (
  <Dropdown
    {...args}
    trigger={<Button variant="outline">Options</Button>}
    options={[
      {
        label: 'Edit',
        value: 'edit',
        onSelect: () => alert('Edit selected'),
      },
      {
        label: 'Duplicate',
        value: 'duplicate',
        onSelect: () => alert('Duplicate selected'),
      },
      {
        label: 'Delete',
        value: 'delete',
        onSelect: () => alert('Delete selected'),
      },
    ]}
  />
);

export const Default = Template.bind({});
Default.args = {};