import React from "react";
import type { Story } from "@ladle/react";
import { Field, Fieldset } from ".";
import { Input } from "../input";

export default { title: "Components / Field" };


export const Default: Story = () => (
  <div className="p-6 w-72 flex flex-col gap-4">
    <Field.Root>
      <Field.Label>Email address</Field.Label>
      <Input placeholder="you@example.com" type="email" />
      <Field.Description>We'll never share your email.</Field.Description>
    </Field.Root>
    <Field.Root>
      <Field.Label>Password</Field.Label>
      <Input placeholder="••••••••" type="password" error />
      <Field.Error>Password must be at least 8 characters.</Field.Error>
    </Field.Root>
  </div>
);
Default.storyName = "Default";

export const FieldsetStory: Story = () => (
  <div className="p-6 w-72">
    <Fieldset.Root>
      <Fieldset.Legend>Personal details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>First name</Field.Label>
        <Input placeholder="Jane" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Last name</Field.Label>
        <Input placeholder="Doe" />
      </Field.Root>
    </Fieldset.Root>
  </div>
);
FieldsetStory.storyName = "Fieldset";
