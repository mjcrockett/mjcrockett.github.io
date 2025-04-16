import { AvatarInstruction, AvatarParent } from "../models/avatar.models";

const BASE_URL = 'https://mjcrockett.github.io/mjcrockett-static-data/data';

export async function getAvatarParent(): Promise<AvatarParent[]> {
  const response = await fetch(`${BASE_URL}/Avatar.json`, { cache: 'force-cache' });
  if (!response.ok) {
    throw new Error('Failed to fetch avatar parent data');
  }
  return response.json();
}

export async function getAvatarInstruction(): Promise<AvatarInstruction[]> {
  // force-cache: This option caches the response, and if a cached response is found and fresh, it's returned immediately. 
  // If not found or stale, the request is made, the result is stored, and memoized. 
  const response = await fetch(`${BASE_URL}/AvatarInstruction.json`, { cache: 'force-cache' });
  if (!response.ok) {
    throw new Error('Failed to fetch avatar instruction data');
  }
  return response.json();
}

export async function getAllData(): Promise<[AvatarParent[], AvatarInstruction[]]> {
  const response = await Promise.all([getAvatarParent(), getAvatarInstruction()]); 
  return response;
}