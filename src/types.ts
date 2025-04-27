import type { Timestamp } from "firebase/firestore";

export type MissionType = {
    id: string;
    name: string;
    points: number;
}

export type PointsApplicationType = {
    id: string;
    missionID: string;  
    appliedAt: Timestamp;
    appliedBy?: string;
    approved: boolean;
    approvedBy?: string;
    approvedAt?: Timestamp;
}
