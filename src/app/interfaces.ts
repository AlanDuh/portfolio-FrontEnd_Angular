
export interface Alert {
    type:string,
    message:string
}

export interface StoredImage {
    id:number,
    src:string
}

export interface StoredString {
    id:number,
    content:string
}

export interface StoredValue {
    id:number,
    name:string,
    value:number
}

export interface Account {
    name:string,
    pass:string
}

export interface AdminSettings {
    accounts:Account[]
}

export interface OwnerInfo {
    banner:StoredImage[],
    photo:StoredImage|null,
    title:string,
    description:string
}

export interface EducExp {
    id:number,
    concept:string,
    institutionImage:StoredImage|null,
    title:string,
    institution:string,
    date:{
        type:string,
        start:string|null,
        end:string|null
    },
    general:string|null
}

export interface HardSkill {
    id:number,
    name:string,
    value:number,
    points:{
        positives:StoredString[],
        negatives:StoredString[]
    },
    background:StoredImage|null
}

export interface SoftSkill {
    id:number,
    name:string,
    description:string,
    subSkills:StoredValue[]
}

export interface Projects {
    id:number,
    name:string,
    description:string,
    date:string,
    images:StoredImage[],
    links:{
        page:string,
        gitHub:string
    }
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

