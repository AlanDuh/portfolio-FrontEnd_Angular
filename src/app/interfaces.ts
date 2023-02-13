
export interface Alert {
    type:string,
    message:string
}

export interface AdminSettings {
    accounts:{
        name:string,
        pass:string
    }[]
}

export interface OwnerInfo {
    banner:{
        Src:string,
        Type:string    
    }[],
    photo:string|null,
    title:string,
    description:string
}

export interface EducExp {
    id:number,
    concept:string,
    institutionImage:string,
    title:string,
    institution:string,
    date:{
        type:string,
        start:string|null,
        end:string
    },
    general:string|null
}

export interface HardSkill {
    id:number,
    name:string,
    value:number,
    points:{
        positives:string[],
        negatives:string[]
    },
    background:{
        type:string,
        animation:boolean,
        src:string
    }
}

export interface SoftSkill {
    id:number,
    name:string,
    description:string,
    subSkills:{
        name:string,
        value:number
    }[]
}

export interface Projects {
    id:number,
    name:string,
    description:string,
    date:string,
    images:string[],
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

