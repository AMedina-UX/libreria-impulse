import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent, type TabsVariant, type TabsOrientation, type TabsSize } from './Tabs';

const InteractiveTabs = ({
    variant = "primary",
    orientation = "horizontal",
    size = "md",
    icons = "none",
}: {
    variant?: TabsVariant;
    orientation?: TabsOrientation;
    size?: TabsSize;
    icons?: "none" | "left" | "right" | "both";
}) => {
    const [activeTab, setActiveTab] = useState("tab1");

    const getIconProps = () => {
        switch (icons) {
            case "left": return { startIcon: "arrow_forward" };
            case "right": return { endIcon: "arrow_forward" };
            case "both": return { startIcon: "arrow_backward", endIcon: "arrow_forward" };
            default: return {};
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white p-6 rounded dark:bg-impulse-azul-900">
            <h3 className="text-impulse-neutro-500 text-xs mb-4 uppercase">{`${variant} - ${orientation} - ${size} - icons: ${icons}`}</h3>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                variant={variant}
                orientation={orientation}
                size={size}
            >
                <TabsList>
                    <TabsTrigger value="tab1" {...getIconProps()}>
                        Tab 1
                    </TabsTrigger>
                    <TabsTrigger value="tab2" {...getIconProps()}>
                        Tab 2
                    </TabsTrigger>
                    <TabsTrigger value="tab3" {...getIconProps()}>
                        Tab 3
                    </TabsTrigger>
                    <TabsTrigger value="tab4" disabled {...getIconProps()}>
                        Disabled
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="tab1" className="p-4 border rounded bg-impulse-neutro-50 dark:bg-impulse-azul-800 dark:border-impulse-azul-700 text-impulse-neutro-900 dark:text-neutral-100">
                    Contenido del Tab 1. Puedes colocar cualquier componente aquí.
                </TabsContent>
                <TabsContent value="tab2" className="p-4 border rounded bg-impulse-neutro-50 dark:bg-impulse-azul-800 dark:border-impulse-azul-700 text-impulse-neutro-900 dark:text-neutral-100">
                    Contenido del Tab 2.
                </TabsContent>
                <TabsContent value="tab3" className="p-4 border rounded bg-impulse-neutro-50 dark:bg-impulse-azul-800 dark:border-impulse-azul-700 text-impulse-neutro-900 dark:text-neutral-100">
                    Contenido del Tab 3.
                </TabsContent>
            </Tabs>
        </div>
    );
};

const meta = {
    title: 'Componentes/Tabs',
    component: InteractiveTabs,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary'],
            description: 'The visual variant of the tabs',
        },
        orientation: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
            description: 'The layout orientation of the tabs',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md'],
            description: 'The size of the tabs',
        },
        icons: {
            control: 'select',
            options: ['none', 'left', 'right', 'both'],
            description: 'Icon positioning within the tabs',
        }
    }
} satisfies Meta<typeof InteractiveTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: "primary",
        orientation: "horizontal",
        size: "md",
        icons: "none"
    },
    render: function Render(args) {
        return (
            <div className="flex flex-col gap-8 w-full">
                <InteractiveTabs {...args} />
            </div>
        );
    }
};

export const PrimarioMD: Story = {
    render: function Render() {
        return (
            <div className="flex flex-col gap-8 w-full">
                <InteractiveTabs variant="primary" size="md" icons="none" />
                <InteractiveTabs variant="primary" size="md" icons="left" />
            </div>
        );
    }
};

export const PrimarioSM: Story = {
    render: function Render() {
        return (
            <div className="flex flex-col gap-8 w-full">
                <InteractiveTabs variant="primary" size="sm" icons="none" />
                <InteractiveTabs variant="primary" size="sm" icons="right" />
            </div>
        );
    }
};

export const Secundario: Story = {
    render: function Render() {
        return (
            <div className="flex flex-col gap-8 w-full">
                <InteractiveTabs variant="secondary" size="md" icons="none" />
                <InteractiveTabs variant="secondary" size="md" icons="left" />
            </div>
        );
    }
};

export const VerticalMovil: Story = {
    render: function Render() {
        return (
            <div className="flex flex-col gap-8 w-full">
                <InteractiveTabs variant="primary" orientation="vertical" size="md" icons="left" />
            </div>
        );
    }
};
