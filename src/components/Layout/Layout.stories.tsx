import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { Stack } from './Stack';
import { Grid } from './Grid';

const meta = {
    title: 'Components/Layout',
    component: Box,
    tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StackExample: Story = {
    render: () => (
        <Stack gap={4} className="p-4 bg-gray-100 rounded-lg">
            <Box className="p-4 bg-blue-200 rounded">Item 1</Box>
            <Box className="p-4 bg-blue-300 rounded">Item 2</Box>
            <Box className="p-4 bg-blue-400 rounded">Item 3</Box>
        </Stack>
    ),
};

export const GridExample: Story = {
    render: () => (
        <Grid columns={3} gap={4} className="p-4 bg-gray-100 rounded-lg">
            <Box className="p-4 bg-green-200 rounded">Col 1</Box>
            <Box className="p-4 bg-green-300 rounded">Col 2</Box>
            <Box className="p-4 bg-green-400 rounded">Col 3</Box>
            <Box className="p-4 bg-green-500 rounded">Col 4</Box>
            <Box className="p-4 bg-green-600 rounded">Col 5</Box>
        </Grid>
    ),
};
