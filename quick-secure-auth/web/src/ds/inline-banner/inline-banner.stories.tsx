import React from "react";
import type { Story } from "@ladle/react";
import { InlineBanner } from "./inline-banner";

export default { title: "Components / Inline Banner" };

const action = <a href="#" className="underline font-[500] text-inherit">This is a link</a>;

export const Default: Story = () => (
  <div className="p-6 flex flex-col gap-3 max-w-lg">
    <InlineBanner status="neutral"     title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
    <InlineBanner status="information" title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
    <InlineBanner status="success"     title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
    <InlineBanner status="warning"     title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
    <InlineBanner status="error"       title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
  </div>
);
Default.storyName = "Default (Row)";

export const Column: Story = () => (
  <div className="p-6 flex flex-col gap-3 max-w-xs">
    <InlineBanner direction="column" status="neutral"     title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
    <InlineBanner direction="column" status="information" title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
    <InlineBanner direction="column" status="success"     title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
    <InlineBanner direction="column" status="warning"     title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
    <InlineBanner direction="column" status="error"       title="Write a clear title here." description="Write a clear message here." action={action} onDismiss={() => {}} />
  </div>
);
Column.storyName = "Column";

export const NoDismiss: Story = () => (
  <div className="p-6 flex flex-col gap-3 max-w-lg">
    <InlineBanner status="information" title="Write a clear title here." description="Write a clear message here." action={action} />
    <InlineBanner status="warning"     title="Write a clear title here." />
  </div>
);
NoDismiss.storyName = "No Dismiss";
