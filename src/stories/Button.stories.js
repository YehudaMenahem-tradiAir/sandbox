import React from 'react';
import { action } from '@storybook/addon-actions'

import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = args => <Button {...args}></Button>

export const Default = Template.bind({})

Default.args = {
  label: 'btn',
  size: 'small',
  click: action('clicked')
}

// export const Primary = Template.bind({});
// Primary.label = {
//   primary: true,
//   label: 'Button',
// };