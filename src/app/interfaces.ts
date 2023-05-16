
export interface Alert {
    type:string,
    message:string
}

export interface StoredImage {
    id:number,
    name:string,
    path:string
}

export interface StoredPoint {
    description:string,
    isPositive:boolean
}

export interface StoredSubSkill {
    id:number,
    name:string,
    val:number
}

export interface Account {
    username:string,
    password:string
}

export interface AdminSettings {
    accounts:Account[]
}

export interface OwnerInfo {
    id:number,
    name:string,
    idx:number,
    type:string,
    description:string,
    images:StoredImage[],
    photo:StoredImage
}

export interface EducExp {
    id:number,
    name:string,
    idx:number,
    type:string,
    title:string,
    institution:string,
    institutionImage:StoredImage,
    date1:null|string,
    date2:null|string,
    description:string
}

export interface HardSkill {
    id:number,
    name:string,
    idx:number,
    type:string,
    val:number,
    background:StoredImage,
    points:StoredPoint[]
}

export interface SoftSkill {
    id:number,
    name:string,
    idx:number,
    type:string,
    description:string,
    subSkills:StoredSubSkill[]
}

export interface Projects {
    id:number,
    name:string,
    idx:number,
    type:string,
    description:string,
    date:string|null,
    images:StoredImage[],
    pageLink:string,
    gitHubLink:string
}

export interface DataBase {
    adminSettings:AdminSettings,
    ownerInfo:OwnerInfo,
    education:EducExp[],
    experiences:EducExp[],
    hardSkills:HardSkill[],
    softSkills:SoftSkill[],
    projects:Projects[]
}

export interface MoveObject {
    cardId:number,
    newPosition:number
}

export interface CardDeleted {
    msg: string;
}

