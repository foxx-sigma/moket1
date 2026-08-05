"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EventFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="mb-4 lg:hidden">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter Event
          </span>
          {isOpen ? <X className="h-4 w-4" /> : null}
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block space-y-6 rounded-lg border border-border bg-card p-5`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Filter</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground">
            Reset
          </Button>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Kategori</Label>
          <div className="space-y-2">
            {["Festival", "Seminar", "Konser", "Olahraga", "Kompetisi", "Pameran"].map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox id={`cat-${cat}`} />
                <Label
                  htmlFor={`cat-${cat}`}
                  className="text-sm font-normal text-muted-foreground cursor-pointer"
                >
                  {cat}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Scope */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Scope</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Semua Scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Scope</SelectItem>
              <SelectItem value="internal">Internal (Siswa MokeT)</SelectItem>
              <SelectItem value="external">Eksternal (Umum)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Sub-Org */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Penyelenggara</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Semua Penyelenggara" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Penyelenggara</SelectItem>
              <SelectItem value="osis">OSIS SMK Telkom</SelectItem>
              <SelectItem value="mpk">MPK SMK Telkom</SelectItem>
              <SelectItem value="creative">Moklet Creative</SelectItem>
              <SelectItem value="devclub">Moklet Dev Club</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
