import React from "react";
import type { Story } from "@ladle/react";
import { Toast } from ".";

export default { title: "Components / Toast" };


type ToastStatus = "neutral" | "success" | "error";

function ToastRowDemo({ status, label }: { status: ToastStatus; label: string }) {
  const { toasts, add } = Toast.useToastManager();
  return (
    <>
      <button
        className="px-3 py-1.5 body-sm rounded-sm bg-surface-default border border-solid border-surface-weak cursor-pointer hover:bg-surface-hover transition-colors duration-120"
        onClick={() => add({ title: "Write a clear message here.", status } as any)}
      >
        {label}
      </button>
      <Toast.Viewport>
        {toasts.map((t) => {
          const s = (t as any).status as ToastStatus ?? "neutral";
          return (
            <Toast.Root key={t.id} toast={t} status={s}>
              <Toast.Content>
                <Toast.StatusIcon status={s} className="shrink-0" />
                <span className="flex-1 font-[500]">{t.title as string}</span>
                <Toast.Action href="#">This is a link</Toast.Action>
                <Toast.Close />
              </Toast.Content>
            </Toast.Root>
          );
        })}
      </Toast.Viewport>
    </>
  );
}

function ToastColumnDemo({ status, label }: { status: ToastStatus; label: string }) {
  const { toasts, add } = Toast.useToastManager();
  return (
    <>
      <button
        className="px-3 py-1.5 body-sm rounded-sm bg-surface-default border border-solid border-surface-weak cursor-pointer hover:bg-surface-hover transition-colors duration-120"
        onClick={() => add({ title: "Write a clear message here.", status } as any)}
      >
        {label}
      </button>
      <Toast.Viewport>
        {toasts.map((t) => {
          const s = (t as any).status as ToastStatus ?? "neutral";
          return (
            <Toast.Root key={t.id} toast={t} status={s}>
              <Toast.Content direction="column">
                <Toast.StatusIcon status={s} className="shrink-0 mt-0.5" />
                <div className="flex-1 flex flex-col gap-1">
                  <span className="font-[500]">{t.title as string}</span>
                  <Toast.Action href="#">This is a link</Toast.Action>
                </div>
                <Toast.Close />
              </Toast.Content>
            </Toast.Root>
          );
        })}
      </Toast.Viewport>
    </>
  );
}

export const Row: Story = () => (
  <Toast.Provider>
    <div className="p-6 flex flex-wrap gap-3">
      <ToastRowDemo status="success" label="Success" />
      <ToastRowDemo status="neutral" label="Neutral" />
      <ToastRowDemo status="error" label="Error" />
    </div>
  </Toast.Provider>
);
Row.storyName = "Row";

export const Column: Story = () => (
  <Toast.Provider>
    <div className="p-6 flex flex-wrap gap-3">
      <ToastColumnDemo status="success" label="Success (column)" />
      <ToastColumnDemo status="neutral" label="Neutral (column)" />
      <ToastColumnDemo status="error" label="Error (column)" />
    </div>
  </Toast.Provider>
);
Column.storyName = "Column";

