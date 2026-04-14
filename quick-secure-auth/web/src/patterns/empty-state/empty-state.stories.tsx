import React from "react";
import type { Story } from "@ladle/react";
import {
  Folder,
  NoSearchResult,
  GenericEmptyState,
  MagnifyingGlass,
  PaperPlane,
} from "@safetyculture/illustrations-react";
import { Button } from "../../ds/button/button";
import { EmptyState } from "./empty-state";

export default { title: "Patterns / Empty State" };

// The most common case: an empty list with a primary CTA to create something.
export const Default: Story = () => (
  <EmptyState
    illustration={<Folder />}
    title="No items yet"
    description="Get started by creating your first item."
    primaryAction={<Button variant="primary" size="small">Create item</Button>}
  />
);
Default.storyName = "Default";

// With primary + secondary actions side-by-side.
export const WithSecondaryAction: Story = () => (
  <EmptyState
    illustration={<GenericEmptyState />}
    title="Nothing here"
    description="You can create something new or import from an existing source."
    primaryAction={<Button variant="primary" size="small">Create new</Button>}
    secondaryAction={<Button variant="secondary" size="small">Import</Button>}
  />
);
WithSecondaryAction.storyName = "With secondary action";

// With all three action levels: primary, secondary, and a tertiary text link.
export const AllActions: Story = () => (
  <EmptyState
    illustration={<PaperPlane />}
    title="No reports sent"
    description="Send your first report to get started."
    primaryAction={<Button variant="primary" size="small">Send report</Button>}
    secondaryAction={<Button variant="secondary" size="small">Schedule</Button>}
    tertiaryAction={<Button variant="tertiary" size="small">Learn more</Button>}
  />
);
AllActions.storyName = "All actions";

// No-results state after a user performs a search — no CTA needed.
export const NoResults: Story = () => (
  <EmptyState
    illustration={<NoSearchResult />}
    title="No results found"
    description="Try adjusting your search or filters to find what you're looking for."
  />
);
NoResults.storyName = "No results";

// Smaller size variant — suitable for use inside panels or cards.
export const SmallSize: Story = () => (
  <EmptyState
    size="sm"
    illustration={<MagnifyingGlass />}
    title="Nothing to show"
    description="There's nothing here yet."
    primaryAction={<Button variant="primary" size="small">Add item</Button>}
  />
);
SmallSize.storyName = "Small size";

// Illustration-free — just title, description and action.
export const NoIllustration: Story = () => (
  <EmptyState
    title="No data available"
    description="Data will appear here once it has been collected."
    primaryAction={<Button variant="primary" size="small">Refresh</Button>}
  />
);
NoIllustration.storyName = "No illustration";

// Shown inside a realistic container to demonstrate in-context placement.
export const InPanel: Story = () => (
  <div className="w-[480px] rounded-md border border-surface-weakest bg-surface-default p-0">
    <div className="flex items-center justify-between border-b border-surface-weakest px-4 py-3">
      <span className="label-md text-surface-default">Inspections</span>
      <Button variant="primary" size="small">New inspection</Button>
    </div>
    <EmptyState
      illustration={<Folder />}
      title="No inspections yet"
      description="Create your first inspection to get started with your team."
      primaryAction={<Button variant="primary" size="small">Create inspection</Button>}
      secondaryAction={<Button variant="secondary" size="small">Import</Button>}
    />
  </div>
);
InPanel.storyName = "In panel";
