# DataTable System – Guidelines

## **1. Design Principles**

- **Single table system across the product**
- **Server-side first** (pagination, sorting, filtering)
- **URL-synced state** for shareable & restorable views
- **Column-driven configuration** (no ad-hoc filters)
- **Zero business logic inside table components**

---

## **2. File Structure (Standard)**

```
components/data-table/
├── data-table.tsx                 # Table container & layout
├── data-table-toolbar.tsx         # Search, filters, view options
├── data-table-pagination.tsx      # Pagination & page-size control
├── data-table-column-header.tsx   # Sortable column headers
├── data-table-faceted-filter.tsx  # Select / multi-select filters
├── data-table-date-filter.tsx     # Date & date-range filters
├── data-table-view-options.tsx    # Column visibility
├── data-table-skeleton.tsx        # Loading state

hooks/
├── use-data-table.ts              # Core state & URL sync logic

lib/
├── data-table.ts                  # Styling helpers & filter utils

types/
├── data-table.ts                  # Shared types & ColumnMeta extensions
```

---

## **3. Core Hook: useDataTable**

useDataTable is the **single source of truth** for table state. All tables **must** use this hook.

### **Responsibilities**

- Pagination state
- Sorting state
- Column & global filtering
- URL query synchronization
- Manual (server-side) mode

### **Usage**

```tsx
import { useDataTable } from "@/hooks/use-data-table";
import { columns } from "./columns";

const { table } = useDataTable({
  data,
  columns,
  pageCount,
  manual: true,
  initialState: {
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: 'createdAt', desc: true }],
  },
});
```

### **Rules**

- manual: true is **mandatory** for API-driven tables
- pageCount must come from API metadata
- No local pagination logic

---

## **4. DataTable Component**

DataTable is a **layout-only component**. It renders the table, loading state, and optional action bar.

```tsx
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

<DataTable
  table={table}
  isLoading={isLoading}
  actionBar={<MassActions table={table} />}
>
  <DataTableToolbar table={table} />
</DataTable>
```

### **Rules**

- No data fetching inside DataTable
- No state mutations
- UI only

---

## **5. Column Definition Contract (columns.tsx)**

All table behavior is driven from column definitions.

### **Sorting**

```tsx
{
  accessorKey: 'name',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Name" />
  ),
}
```

---

### **Filtering (via meta)**

### **A. Global Search**

- URL param: search
- Rendered automatically by toolbar

---

### **B. Faceted Filter (Select / Multi-select)**

```tsx
{
  accessorKey: 'status',
  meta: {
    label: 'Status',
    variant: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
    ],
  },
}
```

---

### **C. Date Filter**

```tsx
{
  accessorKey: 'createdAt',
  meta: {
    label: 'Created At',
    variant: 'date',
  },
}
```

### **Rules**

- Filters must be declared in meta
- No custom filter UI outside toolbar

---

## **6. Pagination**

- Fully controlled by useDataTable
- UI rendered via DataTablePagination

### **URL Parameters**

| **Param** | **Description** |
| --- | --- |
| page | 1-based page index |
| perPage | Page size |

```tsx
const { pagination } = table.getState();
// API page = pagination.pageIndex + 1
```

---

## **7. Column Pinning & Visibility**

### **Column Pinning**

```tsx
initialState: {
  columnPinning: {
    left: ['id'],
    right: ['actions'],
  },
}
```

### **Column Visibility**

- Enabled via DataTableViewOptions
- State synced via URL

---

## **8. Server-Side Data Fetching Pattern (Mandatory)**

This is the **only approved pattern** for API-driven tables.

```tsx
'use client';

import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useEffect, useMemo, useState } from 'react';
import { columns } from './columns';
import myService from '../my.service';

export default function MyList() {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    manual: true,
  });

  const { pagination, sorting, columnFilters, globalFilter } = table.getState();

  const queryParams = useMemo(() => ({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    sort: sorting.map(s => `${s.id}:${s.desc ? 'desc' : 'asc'}`).join(','),
    search: globalFilter,
    ...Object.fromEntries(columnFilters.map(f => [f.id, f.value])),
  }), [pagination, sorting, columnFilters, globalFilter]);

  useEffect(() => {
    setIsLoading(true);
    myService.list(queryParams).then(res => {
      setData(res.items);
      setPageCount(res.meta.total_pages);
      setIsLoading(false);
    });
  }, [queryParams]);

  return (
    <DataTable table={table} isLoading={isLoading}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
```

---

## **9. Anti-Patterns (Strictly Forbidden)**

❌ Client-side pagination for API data

❌ Local filtering outside useDataTable

❌ Custom filter UI bypassing column meta

❌ Fetching data inside DataTable components

❌ Multiple table implementations

---

## **10. Code Review Checklist**

Before merge:

- ✅ useDataTable used
- ✅ Server-side mode enabled
- ✅ Filters defined via column meta
- ✅ URL state synced
- ✅ No business logic in table components