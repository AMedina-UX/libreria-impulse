import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge/Badge';
import { Alert } from '../components/Alert/Alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card/Card';
import { Avatar } from '../components/Avatar/Avatar';

const meta = {
    title: 'Components/Feedback & Display',
    component: Card, // Default
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<any>;

export const Badges: Story = {
    render: () => (
        <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
        </div>
    ),
};

export const Alerts: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <Alert title="Heads up!">
                You can add components to your app using the cli.
            </Alert>
            <Alert variant="destructive" title="Error">
                Your session has expired. Please log in again.
            </Alert>
            <Alert variant="success" title="Success">
                Your changes have been saved successfully.
            </Alert>
        </div>
    ),
};

export const Cards: Story = {
    render: () => (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500">Project configuration goes here.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <button className="text-sm text-gray-500">Cancel</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Deploy</button>
            </CardFooter>
        </Card>
    ),
};

export const Avatars: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Avatar size="sm" fallback="JD" />
            <Avatar size="md" fallback="JD" />
            <Avatar size="lg" fallback="JD" />
            <Avatar size="xl" src="https://github.com/shadcn.png" alt="@shadcn" />
        </div>
    ),
};
