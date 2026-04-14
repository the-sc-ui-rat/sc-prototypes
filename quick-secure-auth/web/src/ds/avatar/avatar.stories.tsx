import React from "react";
import type { Story } from "@ladle/react";
import { Avatar } from ".";

export default { title: "Components / Avatar" };


export const Sizes: Story = () => (
  <div className="flex items-center gap-3 p-4">
    {(["sm", "md", "lg", "xl"] as const).map((size) => (
      <Avatar.Root key={size} size={size}>
        <Avatar.Image src="https://i.pravatar.cc/80" alt="User" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    ))}
  </div>
);
Sizes.storyName = "Sizes";

export const Fallback: Story = () => (
  <div className="flex items-center gap-3 p-4">
    <Avatar.Root size="lg">
      <Avatar.Image src="/broken.jpg" alt="User" />
      <Avatar.Fallback>AB</Avatar.Fallback>
    </Avatar.Root>
  </div>
);
Fallback.storyName = "Fallback";
