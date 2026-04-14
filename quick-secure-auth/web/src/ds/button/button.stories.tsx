import type { Story } from "@ladle/react";
import { ArrowRight, Plus } from "@safetyculture/icons-react";
import { Button } from "./button";
import { IconButton } from "./icon-button";

export default { title: "Components / Button" };



// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = () => (
  <div className="flex items-center gap-4">
    <Button size="large">Large</Button>
    <Button size="medium">Medium</Button>
    <Button size="small">Small</Button>
  </div>
);
Sizes.storyName = "Sizes";

// ─── Icons ───────────────────────────────────────────────────────────────────

export const WithIcons: Story = () => (
  <div className="flex items-center gap-4">
    <Button leftIcon={<Plus />}>Add item</Button>
    <Button rightIcon={<ArrowRight />}>Continue</Button>
    <Button leftIcon={<Plus />} rightIcon={<ArrowRight />}>Both</Button>
  </div>
);
WithIcons.storyName = "With Icons";


// ─── render prop (polymorphism) ───────────────────────────────────────────────

export const AsLink: Story = () => (
  <Button render={<a href="https://safetyculture.com" target="_blank" rel="noreferrer" />} variant="secondary">
    Open link
  </Button>
);
AsLink.storyName = "render prop";

// ─── All variants grid ────────────────────────────────────────────────────────

export const AllVariants: Story = () => (
  <div className="flex flex-col gap-4">
    {(["primary", "secondary", "tertiary"] as const).map((variant) => (
      <div key={variant} className="flex items-center gap-4">
        <span className="w-24 text-sm text-[var(--color-surface-text)] capitalize">{variant}</span>
        <Button variant={variant}>Default</Button>
        <Button variant={variant} modifier="destructive">Destructive</Button>
        <Button variant={variant} disabled>Disabled</Button>
        <Button variant={variant} isLoading>Loading</Button>
      </div>
    ))}
  </div>
);
AllVariants.storyName = "All Variants";

// ─── IconButton ───────────────────────────────────────────────────────────────

export const IconButtonSizes: Story = () => (
  <div className="flex items-center gap-4">
    <IconButton icon={<Plus />} aria-label="Add item" size="large" />
    <IconButton icon={<Plus />} aria-label="Add item" size="medium" />
    <IconButton icon={<Plus />} aria-label="Add item" size="small" />
  </div>
);
IconButtonSizes.storyName = "IconButton / Sizes";

export const IconButtonVariants: Story = () => (
  <div className="flex items-center gap-4">
    <IconButton icon={<Plus />} aria-label="Add" variant="primary" />
    <IconButton icon={<Plus />} aria-label="Add" variant="secondary" />
    <IconButton icon={<Plus />} aria-label="Add" variant="tertiary" />
    <IconButton icon={<Plus />} aria-label="Add" variant="primary" rounded />
    <IconButton icon={<Plus />} aria-label="Add" variant="secondary" rounded />
  </div>
);
IconButtonVariants.storyName = "IconButton / Variants + Rounded";
