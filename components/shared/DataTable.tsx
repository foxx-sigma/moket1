"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X, ChevronLeft, ChevronRight, Download, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SkeletonLoader } from "@/components/shared/SkeletonLoader";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/constants";

// ============================
// Types
// ============================

export interface DataTableColumn<T> {
  key: string;
  header: string;
  /** Render cell. Jika tidak ada, tampilkan nilai field key secara langsung. */
  render?: (row: T) => React.ReactNode;
  /** Lebar kolom (Tailwind class, misal "w-48") */
  width?: string;
  /** Sembunyikan di mobile */
  hideOnMobile?: boolean;
}

export interface FilterChip {
  key: string;
  label: string;
  value: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Key unik per baris (nama field di T) */
  rowKey: keyof T;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  /** Label untuk empty state */
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  /** Search */
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  /** Filter chips yang aktif */
  activeFilters?: FilterChip[];
  onRemoveFilter?: (key: string) => void;
  onClearFilters?: () => void;
  /** Export CSV */
  onExportCsv?: () => void;
  /** Pagination */
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  /** Aksi tambahan di header (tombol Tambah, dsb) */
  headerAction?: React.ReactNode;
}

// ============================
// Komponen DataTable
// ============================

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry,
  emptyTitle = "Tidak Ada Data",
  emptyDescription = "Belum ada data yang tersedia.",
  emptyActionLabel,
  onEmptyAction,
  searchPlaceholder = "Cari...",
  onSearchChange,
  activeFilters = [],
  onRemoveFilter,
  onClearFilters,
  onExportCsv,
  totalItems = 0,
  currentPage = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  onPageChange,
  onPageSizeChange,
  headerAction,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onSearchChange?.(e.target.value);
    },
    [onSearchChange]
  );

  const handleClearSearch = useCallback(() => {
    setSearch("");
    onSearchChange?.("");
  }, [onSearchChange]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize]
  );

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 w-full sm:max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="datatable-search"
              placeholder={searchPlaceholder}
              value={search}
              onChange={handleSearchChange}
              className="pl-9 pr-8"
            />
            {search && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Hapus pencarian"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {onExportCsv && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExportCsv}
              className="gap-2 text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </Button>
          )}
          {headerAction}
        </div>
      </div>

      {/* Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter:
          </span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter.key}
              variant="secondary"
              className="gap-1 pl-2 pr-1 py-1 text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={() => onRemoveFilter?.(filter.key)}
            >
              {filter.label}: {filter.value}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-muted-foreground hover:text-destructive underline transition-colors"
            >
              Hapus Semua
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4">
            <SkeletonLoader variant="table-rows" rows={pageSize > 5 ? 5 : pageSize} />
          </div>
        ) : isError ? (
          <div className="p-8">
            <ErrorState
              message={errorMessage ?? "Terjadi kesalahan saat memuat data."}
              onRetry={onRetry}
            />
          </div>
        ) : data.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
              actionLabel={emptyActionLabel}
              onAction={onEmptyAction}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
                        col.width ?? ""
                      } ${col.hideOnMobile ? "hidden sm:table-cell" : ""}`}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((row) => (
                  <tr
                    key={String(row[rowKey])}
                    className="bg-background hover:bg-secondary/30 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 text-foreground ${
                          col.hideOnMobile ? "hidden sm:table-cell" : ""
                        }`}
                      >
                        {col.render
                          ? col.render(row)
                          : String((row as any)[col.key] ?? "-")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !isError && totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Tampilkan</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="border border-border rounded-md px-2 py-1 text-xs bg-background text-foreground"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>
              {startItem}–{endItem} dari {totalItems} data
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 text-xs ${
                    page === currentPage
                      ? "bg-moket-red hover:bg-moket-red-dark text-white border-moket-red"
                      : ""
                  }`}
                  onClick={() => onPageChange?.(page)}
                  aria-label={`Halaman ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
