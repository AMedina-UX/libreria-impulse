import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { Heading } from './Heading';

const meta = {
    title: 'Components/Typography',
    component: Text,
    tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextVariants: Story = {
    args: {
        children: 'Sample Text',
    },
    render: () => (
        <div className="space-y-4">
            <Text variant="body">Body: The quick brown fox jumps over the lazy dog.</Text>
            <Text variant="lead">Lead: The quick brown fox jumps over the lazy dog.</Text>
            <Text variant="large">Large: The quick brown fox jumps over the lazy dog.</Text>
            <Text variant="small">Small: The quick brown fox jumps over the lazy dog.</Text>
            <Text variant="caption">Caption: The quick brown fox jumps over the lazy dog.</Text>
            <Text variant="muted">Muted: The quick brown fox jumps over the lazy dog.</Text>
        </div>
    ),
};

export const Headings: Story = {
    args: {
        children: 'Heading',
    },
    render: () => (
        <div className="space-y-4">
            <Heading as="h1">Heading 1</Heading>
            <Heading as="h2">Heading 2</Heading>
            <Heading as="h3">Heading 3</Heading>
            <Heading as="h4">Heading 4</Heading>
            <Heading as="h5">Heading 5</Heading>
            <Heading as="h6">Heading 6</Heading>
        </div>
    ),
};
