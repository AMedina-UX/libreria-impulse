
import type { Meta, StoryObj } from '@storybook/react';

const Typography = () => {
    return (
        <div className="p-8 font-sans text-foreground">
            <h1 className="text-2xl font-bold mb-6">Typography</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Headings</h2>
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold">Heading 1</h1>
                            <span className="text-xs text-gray-400">text-4xl font-bold</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Heading 2</h2>
                            <span className="text-xs text-gray-400">text-3xl font-bold</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">Heading 3</h3>
                            <span className="text-xs text-gray-400">text-2xl font-bold</span>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Body</h2>
                    <div className="space-y-4 max-w-prose">
                        <div>
                            <p className="text-base">
                                <strong>Body Base:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                            </p>
                            <span className="text-xs text-gray-400">text-base</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">
                                <strong>Body Small:</strong> Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                                Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                            </p>
                            <span className="text-xs text-gray-400">text-sm text-gray-600</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const meta = {
    title: 'Design System/Typography',
    component: Typography,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeScale: Story = {};
