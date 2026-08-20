# Modal Documentation & Guidelines

## **1. Core Components**

### **1.1 useModal Hook**

The useModal hook exposes a global API to open and close modals from anywhere within the ModalProvider tree.

```tsx
import { useModal } from "@/hooks/use-modal";

const { openModal, closeModal } = useModal();
```

### **Responsibilities**

- Open feature-owned modal components
- Pass props into modal content
- Apply modal UI options
- Return results to the caller

---

### **1.2 ModalProvider**

The ModalProvider must wrap the application **once**, typically in the root layout.

### **Responsibilities**

- Maintain modal state
- Render a single global dialog instance
- Inject onConfirm into modal content

❌ Do **not** render Dialog directly inside pages or features

---

## **2. Opening a Modal (Standard Pattern)**

```tsx
import { useModal } from "@/hooks/use-modal";
import { MyCustomForm } from "./my-custom-form";

export function MyComponent() {
  const { openModal } = useModal();

  const handleOpen = () => {
    openModal(
      MyCustomForm,
      { title: "Edit User", userId: "123" },
      { size: "lg", showCloseButton: true },
      (result) => {
        console.log("Modal closed with result:", result);
      }
    );
  };

  return <button onClick={handleOpen}>Open Modal</button>;
}
```

### **Rules**

- Modal content **must be a component**, not JSX
- Business logic stays in the caller
- Modal handles **UI + user interaction only**

---

## **3. Closing a Modal**

### **3.1 Using closeModal**

```tsx
import { useModal } from "@/hooks/use-modal";

export function MyCustomForm() {
  const { closeModal } = useModal();

  return (
    <button onClick={() => closeModal({ success: true })}>
      Save
    </button>
  );
}
```

### **3.2 Using onConfirm (Preferred)**

The ModalProvider automatically injects an onConfirm prop into modal content.

```tsx
export function MyCustomForm({ onConfirm }) {
  const handleSave = () => {
    onConfirm({ success: true });
  };

  return <button onClick={handleSave}>Save</button>;
}
```

### **Why onConfirm is preferred**

- Decouples modal UI from global state
- Improves testability
- Keeps modal logic explicit

---

## **4. Modal Options**

```tsx
type ModalOptions = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
}
```

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| size | md | Controls dialog max-width |
| showCloseButton | true | Toggles the top-right close button |

---

## **5. Advanced Modal Pattern (Forms)**

Use this structure for all **form-based modals**.

### **Required Layout**

- DialogHeader
- Scrollable content body (ScrollArea)
- DialogFooter with actions

```tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export function MyModalForm({ onConfirm, item }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: item?.name ?? '' },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    onConfirm(values);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-h-[calc(100vh-100px)]"
      >
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Item' : 'New Item'}</DialogTitle>
          <DialogDescription>
            Please fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            {/* form fields */}
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onConfirm(null)}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
```

---

## **6. Confirm Dialog System (useConfirm)**

For simple **Yes / No** or **Confirm / Cancel** flows, use the useConfirm hook instead of custom modals.

### **Usage**

```tsx
import { useConfirm } from "@/hooks/use-confirm";

export function MyComponent() {
  const confirm = useConfirm();

  const handleDelete = async () => {
    const ok = await confirm({
      title: 'Delete Item',
      description: 'Are you sure? This action cannot be undone.',
      variant: 'destructive',
      confirmText: 'Delete',
      cancelText: 'Go Back',
    });

    if (ok) {
      // proceed with deletion
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### **ConfirmDialogOptions**

| **Option** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| title | string | **Required** | Title of the confirmation dialog |
| description | string | undefined | Additional context |
| variant | `‘destructive’ | ‘success’` | destructive |
| confirmText | string | Confirm | Confirm button label |
| cancelText | string | Cancel | Cancel button label |
| onConfirm | `() => void | Promise` | undefined |

---

## **7. Ownership & Placement Rules**

- Modal content **must live inside the owning feature**

```
features/content/components/create.tsx
```

- Reusable/global modals go into:

```
components/modals/
```

---

## **8. Anti-Patterns (Strictly Forbidden)**

❌ Rendering Dialog directly in pages or features

❌ Multiple ModalProviders

❌ Passing JSX instead of a component to openModal

❌ Business logic inside ModalProvider

❌ API calls inside modal provider

---

## **9. Implementation Notes**

- Built on top of @/components/ui/dialog (shadcn/ui)
- Uses a **single dialog instance** rendered by ModalProvider
- Modal content is swapped dynamically via internal state

---

## **10. Code Review Checklist**

Before merging:

- ✅ Modal opened via useModal or useConfirm
- ✅ Modal content is feature-owned
- ✅ onConfirm used correctly
- ✅ No dialog duplication
- ✅ No business logic inside provider