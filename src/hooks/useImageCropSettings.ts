import { useState, useEffect, useCallback } from "react";

export interface CropSettings {
  objectPosition: string; // e.g. "50% 50%"
  scale: number; // e.g. 1.0
}

const STORAGE_KEY = "avora-image-crop-settings";

const defaultSettings: CropSettings = {
  objectPosition: "50% 50%",
  scale: 1,
};

export function getAllCropSettings(): Record<string, CropSettings> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getCropSettings(imageKey: string): CropSettings {
  const all = getAllCropSettings();
  return all[imageKey] || defaultSettings;
}

export function saveCropSettings(imageKey: string, settings: CropSettings) {
  const all = getAllCropSettings();
  all[imageKey] = settings;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getCropStyle(imageKey: string): React.CSSProperties {
  const s = getCropSettings(imageKey);
  return {
    objectPosition: s.objectPosition,
    transform: `scale(${s.scale})`,
  };
}

export function useImageCropSettings(imageKey: string) {
  const [settings, setSettings] = useState<CropSettings>(() => getCropSettings(imageKey));

  const update = useCallback(
    (newSettings: Partial<CropSettings>) => {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      saveCropSettings(imageKey, updated);
    },
    [imageKey, settings]
  );

  return { settings, update };
}
