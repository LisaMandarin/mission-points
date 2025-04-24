import type { Timestamp } from "firebase/firestore";

export type MissionType = {
    id: string;
    name: string;
    points: number;
}

export type PointsApplicationType = {
    id: string;
    appliedAt: Timestamp;
    appliedBy?: string;
    approved: boolean;
    missionID: string;  
    approvedBy?: string;
    approvedAt?: Timestamp;
}