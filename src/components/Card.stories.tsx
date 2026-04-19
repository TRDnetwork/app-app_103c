import React from 'react';
import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template = (args) => (
  <div style={{ maxWidth: '400px' }}>
    <Card {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: <p>This is the card content. It can include any elements.</p>,
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  header: <h3 className="text-xl font-bold">Card Title</h3>,
  children: <p>Card content goes here.</p>,
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  children: <p>Card content goes here.</p>,
  footer: <small className="text-text-dim">Posted on Jan 1, 2023</small>,
};

export const WithHeaderAndFooter = Template.bind({});
WithHeaderAndFooter.args = {
  header: <h3 className="text-xl font-bold">Project Overview</h3>,
  children: <p>A brief description of the project and its goals.</p>,
  footer: <button className="text-accent hover:text-accent-alt">View Details</button>,
};