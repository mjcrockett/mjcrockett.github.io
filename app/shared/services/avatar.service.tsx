import { AvatarInstructions } from "@/public/scripts/avatar-library";
import { AvatarParent } from "../models/avatar.models";

const BASE_URL = 'https://mjcrockett.github.io/mjcrockett-static-data/data';

export async function getAvatarParent(): Promise<AvatarParent[]> {
  const response = await fetch(`${BASE_URL}/Avatar.json`, { cache: 'force-cache' });
  if (!response.ok) {
    throw new Error('Failed to fetch avatar parent data');
  }
  return response.json();
}

export async function getAvatarInstruction(): Promise<AvatarInstructions[]> {
  const response = await fetch(`${BASE_URL}/AvatarInstruction.json`, { cache: 'force-cache' });
  if (!response.ok) {
    throw new Error('Failed to fetch avatar instruction data');
  }
  return response.json();
}