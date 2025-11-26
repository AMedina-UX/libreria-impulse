import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Checkbox } from './Checkbox';
import { Switch } from './Switch';
import { Textarea } from './Textarea';

const meta = {
    title: 'Components/Form',
    component: Label, // Default component, but we'll show others
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormElements: Story = {
    args: {
        children: 'Label',
    },
    render: () => (
        <div className="space-y-8 max-w-md">
            <div>
                <Label required>Label Example</Label>
                <p className="text-sm text-gray-500">This is a standard label.</p>
            </div>

            <div className="space-y-2">
                <Checkbox label="Accept terms and conditions" />
                <Checkbox label="Subscribe to newsletter" defaultChecked />
            </div>

            <div className="space-y-2">
                <Switch label="Enable notifications" />
                <Switch label="Dark mode" defaultChecked />
            </div>

            <div>
                <Textarea label="Bio" placeholder="Tell us about yourself..." rows={4} />
            </div>

            <div>
                <Textarea label="Feedback" error="This field is required" placeholder="Your feedback..." />
            </div>
        </div>
    ),
};
