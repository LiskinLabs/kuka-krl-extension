import AdmZip = require("adm-zip");
import * as path from "path";

export interface KrlPosition {
  name: string;
  type: "E6POS" | "POS" | "E6AXIS" | "AXIS";
  rawText: string;
  coords: { [key: string]: number };
}

export interface PositionDiffItem {
  name: string;
  type: string;
  status: "CHANGED" | "ADDED" | "REMOVED" | "UNCHANGED";
  deltas?: {
    [coordKey: string]: { workspace: number; backup: number; delta: number };
  };
}

export interface BackupDiffResult {
  fileName: string;
  positionDiffs: PositionDiffItem[];
  hasChanges: boolean;
  totalPositions: number;
}

/**
 * Extracts point coordinates from KRL text ({X 100, Y 200, Z 300...}).
 */
export function parseKrlPositions(text: string): Map<string, KrlPosition> {
  const map = new Map<string, KrlPosition>();

  // Matches: GLOBAL DECL E6POS xHome = {X 100.0, Y 200.0, Z 300.0, A 0.0, B 90.0, C 0.0, S 6, T 35}
  // Matches: DECL POS pPick = {X 10.0, Y 20.0, Z 30.0}
  // Matches: E6AXIS aHome = {A1 0, A2 -90, A3 90, A4 0, A5 0, A6 0}
  const posRegex =
    /(?:GLOBAL\s+)?(?:DECL\s+)?(E6POS|POS|E6AXIS|AXIS)\s+([A-Za-z0-9_]+)\s*=\s*\{([^}]+)\}/gi;
  let match;

  while ((match = posRegex.exec(text)) !== null) {
    const type = match[1].toUpperCase() as "E6POS" | "POS" | "E6AXIS" | "AXIS";
    const name = match[2];
    const body = match[3];

    const coords: { [key: string]: number } = {};
    const coordRegex = /([A-Z0-9]+)\s+([-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)/gi;
    let cMatch;
    while ((cMatch = coordRegex.exec(body)) !== null) {
      coords[cMatch[1].toUpperCase()] = parseFloat(cMatch[2]);
    }

    map.set(name.toUpperCase(), {
      name,
      type,
      rawText: match[0],
      coords,
    });
  }

  return map;
}

/**
 * Compares position coordinates between Workspace DAT file and Backup DAT file.
 */
export function comparePositionPoints(
  workspaceText: string,
  backupText: string,
  fileName: string = "file.dat",
): BackupDiffResult {
  const wsPositions = parseKrlPositions(workspaceText);
  const backupPositions = parseKrlPositions(backupText);

  const diffItems: PositionDiffItem[] = [];
  let hasChanges = false;

  // Check Workspace positions against Backup
  for (const [key, wsPos] of wsPositions.entries()) {
    const backupPos = backupPositions.get(key);

    if (!backupPos) {
      diffItems.push({
        name: wsPos.name,
        type: wsPos.type,
        status: "ADDED",
      });
      hasChanges = true;
    } else {
      const deltas: {
        [key: string]: { workspace: number; backup: number; delta: number };
      } = {};
      let isPointChanged = false;

      const allCoordKeys = new Set([
        ...Object.keys(wsPos.coords),
        ...Object.keys(backupPos.coords),
      ]);

      for (const cKey of allCoordKeys) {
        const wsVal = wsPos.coords[cKey] ?? 0;
        const bVal = backupPos.coords[cKey] ?? 0;
        const delta = Math.round((wsVal - bVal) * 1000) / 1000;

        if (Math.abs(delta) > 0.001) {
          isPointChanged = true;
          deltas[cKey] = { workspace: wsVal, backup: bVal, delta };
        }
      }

      if (isPointChanged) {
        hasChanges = true;
        diffItems.push({
          name: wsPos.name,
          type: wsPos.type,
          status: "CHANGED",
          deltas,
        });
      } else {
        diffItems.push({
          name: wsPos.name,
          type: wsPos.type,
          status: "UNCHANGED",
        });
      }
    }
  }

  // Check for points removed in Workspace but present in Backup
  for (const [key, backupPos] of backupPositions.entries()) {
    if (!wsPositions.has(key)) {
      diffItems.push({
        name: backupPos.name,
        type: backupPos.type,
        status: "REMOVED",
      });
      hasChanges = true;
    }
  }

  return {
    fileName,
    positionDiffs: diffItems,
    hasChanges,
    totalPositions: diffItems.length,
  };
}

// Security constants to prevent Zip Bomb OOM and Path Traversal attacks
const MAX_ZIP_ENTRIES = 15000;
const MAX_EXTRACT_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB max for a single KRL text file
const MAX_COMPRESSION_RATIO = 100;

/**
 * Searches and extracts a KRL file (.src, .dat, .sub) from KRC Zip Backup.
 * Hardened against Zip Bombs, Decompression OOM, and Path Traversal.
 */
export function extractFileFromZipBackup(
  zipFilePath: string,
  targetFileName: string,
): { found: boolean; content?: string; zipInternalPath?: string } {
  try {
    const zip = new AdmZip(zipFilePath);
    const zipEntries = zip.getEntries();

    // 1. Guard against entry flood Zip Bomb
    if (!zipEntries || zipEntries.length > MAX_ZIP_ENTRIES) {
      return { found: false };
    }

    const targetLower = targetFileName.toLowerCase();

    // 2. Try exact filename match
    let bestEntry = zipEntries.find(
      (entry: AdmZip.IZipEntry) =>
        !entry.isDirectory &&
        entry.entryName.toLowerCase().endsWith("/" + targetLower),
    );

    // 3. Fallback to basename match if nested
    if (!bestEntry) {
      bestEntry = zipEntries.find(
        (entry: AdmZip.IZipEntry) =>
          !entry.isDirectory && entry.name.toLowerCase() === targetLower,
      );
    }

    if (bestEntry) {
      // 4. Path Traversal Guard
      if (bestEntry.entryName.includes("..") || path.isAbsolute(bestEntry.entryName)) {
        return { found: false };
      }

      // 5. Decompression Bomb & Size Guard
      const uncompressedSize = bestEntry.header?.size ?? 0;
      const compressedSize = bestEntry.header?.compressedSize ?? 0;

      if (uncompressedSize > MAX_EXTRACT_SIZE_BYTES) {
        return { found: false };
      }

      if (compressedSize > 0 && uncompressedSize / compressedSize > MAX_COMPRESSION_RATIO) {
        return { found: false };
      }

      const buffer = bestEntry.getData();
      if (!buffer || buffer.length > MAX_EXTRACT_SIZE_BYTES) {
        return { found: false };
      }

      const content = buffer.toString("utf8");
      return {
        found: true,
        content,
        zipInternalPath: bestEntry.entryName,
      };
    }
  } catch {
    // Return not found on zip reading errors
  }

  return { found: false };
}
