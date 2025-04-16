import { AvatarInstructions } from "@/public/scripts/avatar-library";

export interface AvatarParent {
    Id: number;
    Title: string;
    Description: string;
    Audio: string;
    IsActive: boolean;
  }

  export interface AvatarInstruction {
    Id: number;
    AvatarId: number;
    Interval: number;
    InstructionJson: AvatarInstructions;
}