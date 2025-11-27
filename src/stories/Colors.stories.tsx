
import type { Meta, StoryObj } from '@storybook/react';

import { baseColors, impulseAzul, impulseCeleste, impulseNeutro, semanticExito, semanticAdvertencia, semanticError } from '../constants/tokens';

const ColorCard = ({ name, value, text, border }: { name: string, value: string, text: string, border?: boolean }) => (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
        <div
            className={`h-32 w-full transition-transform duration-500 group-hover:scale-105 ${border ? 'border-b border-gray-100' : ''}`}
            style={{ backgroundColor: value }}
        />
        <div className="p-5">
            <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
            <div className="flex flex-col gap-1 text-xs text-gray-500 font-mono">
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors cursor-pointer" title="CSS Variable">
                    <span>{value}</span>
                </div>
                <div className="flex justify-between items-center p-1 opacity-50">
                    <span>Hex (approx)</span>
                    <span>{text === '#ffffff' ? 'Light' : 'Dark'} Text</span>
                </div>
            </div>
        </div>
    </div>
);

const meta = {
    title: 'Design System/Colors',
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
    render: () => {
        return (
            <div className="min-h-screen bg-gray-50/50 p-12 font-sans">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-16 text-center">
                        <h1 className="text-5xl font-black tracking-tight text-gray-900 mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                                Design System
                            </span>
                            <span className="block text-3xl mt-2 text-gray-400 font-light">Color Palette</span>
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Our semantic color system designed for consistency and accessibility across the Impulse platform.
                        </p>
                    </header>

                    <section className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider text-sm">Base Palette</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {baseColors.map((color) => (
                                <ColorCard key={color.name} {...color} />
                            ))}
                        </div>
                    </section>

                    <section className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider text-sm">Semánticos</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-green-700 mb-6">Exito</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {semanticExito.map((color) => (
                                    <ColorCard key={color.name} {...color} />
                                ))}
                            </div>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-yellow-600 mb-6">Advertencia</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {semanticAdvertencia.map((color) => (
                                    <ColorCard key={color.name} {...color} />
                                ))}
                            </div>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-red-600 mb-6">Error</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {semanticError.map((color) => (
                                    <ColorCard key={color.name} {...color} />
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <h2 className="text-2xl font-bold text-blue-600 uppercase tracking-wider text-sm">Impulse Azul</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {impulseAzul.map((color) => (
                                <ColorCard key={color.name} {...color} />
                            ))}
                        </div>
                    </section>

                    <section className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <h2 className="text-2xl font-bold text-sky-400 uppercase tracking-wider text-sm">Impulse Celeste</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {impulseCeleste.map((color) => (
                                <ColorCard key={color.name} {...color} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <h2 className="text-2xl font-bold text-gray-600 uppercase tracking-wider text-sm">Impulse Neutro</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {impulseNeutro.map((color) => (
                                <ColorCard key={color.name} {...color} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    },
};
