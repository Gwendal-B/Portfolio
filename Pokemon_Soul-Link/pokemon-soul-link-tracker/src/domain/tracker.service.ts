import type {
  CapturedPokemon,
  LifeStatus,
  StorageStatus,
} from "../types";
import { loadTrackerState, saveTrackerState } from "../lib/local-storage";
import { createCapture, deleteCapture, updateCaptureStatus } from "./capture";
import {
  createAutomaticSoulLinkForNewCapture,
  createManualSoulLink,
  deleteSoulLinkById,
} from "./soul-link";

export function addRunCapture(
  runMode: string,
  soulLinkEnabled: boolean,
  runId: string,
  captureData: Omit<CapturedPokemon, "id" | "createdAt" | "updatedAt">
): string | null {
  const now = new Date().toISOString();

  const newCapture: CapturedPokemon = {
    ...captureData,
    id: `capture-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };

  let state = loadTrackerState();

  state = createCapture(state, newCapture);

  if (runMode === "soul-link" && soulLinkEnabled) {
    state = createAutomaticSoulLinkForNewCapture(state, runId, newCapture);
  }

  saveTrackerState(state);

  return null;
}

export function updateRunCapture(
  captureId: string,
  field: "lifeStatus" | "storageStatus",
  value: LifeStatus | StorageStatus,
  sharedDeathEnabled: boolean
): void {
  const state = loadTrackerState();

  const newState = updateCaptureStatus(
    state,
    captureId,
    field,
    value,
    sharedDeathEnabled
  );

  saveTrackerState(newState);
}

export function deleteRunCapture(captureId: string): void {
  const state = loadTrackerState();
  const newState = deleteCapture(state, captureId);
  saveTrackerState(newState);
}

export function createRunSoulLink(
  runId: string,
  captureAId: string,
  captureBId: string
): string | null {
  const state = loadTrackerState();

  const result = createManualSoulLink(state, runId, captureAId, captureBId);

  if (result.error) {
    return result.error;
  }

  saveTrackerState(result.state);
  return null;
}

export function deleteRunSoulLink(soulLinkId: string): void {
  const state = loadTrackerState();
  const newState = deleteSoulLinkById(state, soulLinkId);
  saveTrackerState(newState);
}