import type { Meta, StoryObj } from '@storybook/react';
import { baseColors, impulseAzul, impulseCeleste, impulseNeutro } from '../constants/tokens';

const SectionHeader = ({ title, description }: { title: string, description?: string }) => (
  <div className="mb-8 pb-4 border-b border-gray-200">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
    {description && <p className="text-lg text-gray-500 mt-2">{description}</p>}
  </div>
);

const ColorSwatch = ({ name, value, border }: { name: string, value: string, text?: string, border?: boolean }) => (
  <div className="group flex flex-col gap-2">
    <div
      className={`h-24 w-full rounded-md shadow-sm transition-all duration-200 group-hover:shadow-md ${border ? 'border border-gray-200' : ''}`}
      style={{ backgroundColor: value }}
    />
    <div className="flex flex-col">
      <span className="font-semibold text-sm text-gray-900">{name}</span>
      <span className="text-xs text-gray-500 font-mono uppercase">{value}</span>
    </div>
  </div>
);

const TypeSpec = ({ weight, label, sample }: { weight: number, label: string, sample: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-baseline py-4 border-b border-gray-100 last:border-0">
    <div className="flex flex-col">
      <span className="font-semibold text-gray-900">{label}</span>
      <span className="text-sm text-gray-500 font-mono">Weight: {weight}</span>
    </div>
    <div style={{ fontWeight: weight }} className="text-3xl text-gray-900 truncate">
      {sample}
    </div>
  </div>
);

const FoundationsPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-gray-900 selection:text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">

        <header className="mb-20">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-gray-900">
            Foundations
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
            The core primitives of the Impulse Design System. These tokens ensure consistency, accessibility, and a unified visual language across all applications.
          </p>
        </header>

        <section className="mb-24">
          <SectionHeader
            title="Typography"
            description="Our primary typeface is Poppins, chosen for its geometric structure and modern readability."
          />

          <div className="bg-gray-50/50 rounded-xl border border-gray-200 p-8 mb-12">
            <div className="flex items-end gap-4 mb-4">
              <span className="text-6xl font-black tracking-tighter">Aa</span>
              <span className="text-2xl font-medium text-gray-500 mb-2">Poppins</span>
            </div>
            <p className="text-gray-600 max-w-2xl">
              A geometric sans-serif typeface that balances character with clarity. Used for headings, body text, and UI elements.
            </p>
          </div>

          <div className="space-y-2">
            <TypeSpec weight={400} label="Regular" sample="The quick brown fox jumps over the lazy dog" />
            <TypeSpec weight={500} label="Medium" sample="The quick brown fox jumps over the lazy dog" />
            <TypeSpec weight={600} label="SemiBold" sample="The quick brown fox jumps over the lazy dog" />
            <TypeSpec weight={700} label="Bold" sample="The quick brown fox jumps over the lazy dog" />
          </div>
        </section>

        <section className="mb-24">
          <SectionHeader
            title="Color Palette"
            description="A semantic color system designed for clarity and brand alignment."
          />

          <div className="space-y-16">
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-900"></span>
                Base Colors
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {baseColors.map(c => <ColorSwatch key={c.name} {...c} />)}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Impulse Azul
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                {impulseAzul.map(c => <ColorSwatch key={c.name} {...c} />)}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                Impulse Celeste
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                {impulseCeleste.map(c => <ColorSwatch key={c.name} {...c} />)}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                Impulse Neutro
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {impulseNeutro.map(c => <ColorSwatch key={c.name} {...c} />)}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

const meta = {
  title: 'Fundamentos/Foundations',
  component: FoundationsPage,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
