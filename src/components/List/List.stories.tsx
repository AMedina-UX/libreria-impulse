import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { ListItem } from './ListItem';
import { Avatar } from '../Avatar/Avatar';

type ListItemStoryArgs = React.ComponentProps<typeof ListItem> & {
    showLeading?: boolean;
    showTrailing?: boolean;
    showSupportingText?: boolean;
    trailingIcon?: string;
};

const meta = {
    title: 'Componentes/List',
    component: ListItem, // Changing component to ListItem for better controls, wrapped in List in render
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // Leading Settings
        leadingType: {
            control: 'select',
            options: ['monogram', 'icon', 'image', 'video'],
            description: 'Type of the leading element',
            if: { arg: 'showLeading' }
        },
        // Custom boolean to toggle leading slot
        showLeading: {
            control: 'boolean',
            description: 'Show/Hide Leading element',
            table: { category: 'Leading' }
        },

        // Trailing Settings
        // Custom string for trailing icon name
        trailingIcon: {
            control: 'text',
            description: 'Material Icon name for trailing element',
            if: { arg: 'showTrailing' },
            table: { category: 'Trailing' }
        },
        showTrailing: {
            control: 'boolean',
            description: 'Show/Hide Trailing element',
            table: { category: 'Trailing' }
        },

        // Supporting Text Settings
        lines: {
            control: { type: 'radio' },
            options: [1, 2, 3],
            description: 'Number of lines for supporting text',
            if: { arg: 'showSupportingText' }
        },
        showSupportingText: {
            control: 'boolean',
            description: 'Show/Hide Supporting Text',
            table: { category: 'Text' }
        },
        supportingText: {
            control: 'text',
            if: { arg: 'showSupportingText' }
        },

        // General
        headline: { control: 'text' },
        divider: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<ListItemStoryArgs>;

export default meta;
type Story = StoryObj<ListItemStoryArgs>;

// --- Mocks ---
const Monogram = () => <Avatar fallback="A" size="md" className="bg-impulse-azul-100 text-white w-full h-full text-lg" />;
const Icon = ({ name }: { name: string }) => <span className="material-icons-round text-2xl">{name}</span>;
const ImagePlaceholder = () => (
    <div className="w-14 h-14 bg-impulse-neutro-200 rounded flex items-center justify-center">
        <span className="material-icons-round text-impulse-neutro-400">image</span>
    </div>
);
const VideoPlaceholder = () => (
    <div className="w-[100px] h-14 bg-impulse-neutro-200 rounded flex items-center justify-center">
        <span className="material-icons-round text-impulse-neutro-400">play_circle</span>
    </div>
);

export const Playground: Story = {
    args: {
        headline: 'Item de lista',
        showSupportingText: true,
        supportingText: 'Texto de soporte, texto lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        lines: 2,
        divider: true,
        disabled: false,

        // Leading default
        showLeading: true,
        leadingType: 'monogram',

        // Trailing default
        showTrailing: true,
        trailingIcon: 'chevron_right',
    },
    render: (args) => {
        const {
            showLeading,
            showTrailing,
            showSupportingText,
            trailingIcon,
            supportingText,
            ...props
        } = args;

        // Determine leading content based on type
        let leadingContent = null;
        if (showLeading) {
            switch (args.leadingType) {
                case 'monogram':
                    leadingContent = <Monogram />;
                    break;
                case 'icon':
                    leadingContent = <Icon name="person" />;
                    break;
                case 'image':
                    leadingContent = <ImagePlaceholder />;
                    break;
                case 'video':
                    leadingContent = <VideoPlaceholder />;
                    break;
            }
        }

        // Determine trailing content
        const trailingContent = showTrailing ? <Icon name={trailingIcon || 'chevron_right'} /> : null;

        // Determine supporting text
        const textContent = showSupportingText ? supportingText : undefined;

        return (
            <div className="w-[360px]">
                <List>
                    <ListItem
                        {...props}
                        leading={leadingContent}
                        trailing={trailingContent}
                        supportingText={textContent}
                    />
                </List>
            </div>
        );
    }
};
