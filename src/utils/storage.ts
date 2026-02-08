import type { PositionNode, TransitionEdge, Tag } from '../types';

const STORAGE_KEY = 'bjj-game-mapper-data';

export interface StorageData {
  nodes: PositionNode[];
  edges: TransitionEdge[];
  tags: Tag[];
}

export const saveToLocalStorage = (data: StorageData): void => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, jsonData);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): StorageData | null => {
  try {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const exportToJSON = (data: StorageData): string => {
  return JSON.stringify(data, null, 2);
};

export const importFromJSON = (jsonString: string): StorageData | null => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

export const downloadJSON = (data: StorageData, filename: string = 'bjj-game-map.json'): void => {
  const jsonString = exportToJSON(data);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
