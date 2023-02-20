import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { OwnerInfo, EducExp, SoftSkill, HardSkill, Projects, DataBase } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContentLoaderService {

  ownerInfo?:OwnerInfo;
  education:EducExp[] = [];
  experiences:EducExp[] = [];
  softSkills:SoftSkill[] = [];
  hardSkills:HardSkill[] = [];
  projects:Projects[] = [];

  private dbUrl:string = 'http://localhost:5000/';
  private ownerInfoSubject = new Subject<OwnerInfo>();
  private educationSubject = new Subject<EducExp[]>();
  private experiencesSubject = new Subject<EducExp[]>();
  private softSkillsSubject = new Subject<SoftSkill[]>();
  private hardSkillsSubject = new Subject<HardSkill[]>();
  private projectsSubject = new Subject<Projects[]>();

  constructor(
    private http:HttpClient
  ) { }

  onOwnerInfoChange():Observable<OwnerInfo> {
    return this.ownerInfoSubject.asObservable();
  }

  onEducationChange():Observable<EducExp[]> {
    return this.educationSubject.asObservable();
  }

  get Education():EducExp[] {
    return this.education;
  }

  onExperiencesChange():Observable<EducExp[]> {
    return this.experiencesSubject.asObservable();
  }

  get Experiences():EducExp[] {
    return this.experiences;
  }

  onHardSkillsChange():Observable<HardSkill[]> {
    return this.hardSkillsSubject.asObservable();
  }

  onSoftSkillsChange():Observable<SoftSkill[]> {
    return this.softSkillsSubject.asObservable();
  }

  onProjectsChange():Observable<Projects[]> {
    return this.projectsSubject.asObservable();
  }

  getDbOwnerInfo():void {
    this.http.get<OwnerInfo>(this.dbUrl+'ownerInfo').subscribe(items=>{
      this.ownerInfo=items;
      this.ownerInfoSubject.next(this.ownerInfo);
    })
  }

  getDbEducation():void {
    this.http.get<EducExp[]>(this.dbUrl+'education').subscribe(items=>{
      this.education=items;
      this.educationSubject.next(this.education);
    });
  }

  getDbExperiences():void {
    this.http.get<EducExp[]>(this.dbUrl+'experiences').subscribe(items=>{
      this.experiences=items;
      this.experiencesSubject.next(this.experiences);
    });
  }

  getDbHardSkill():void {
    this.http.get<HardSkill[]>(this.dbUrl+'hardSkills').subscribe(items=>{
      this.hardSkills=items;
      this.hardSkillsSubject.next(this.hardSkills);
    });
  }

  getDbSoftSkill():void {
    this.http.get<SoftSkill[]>(this.dbUrl+'softSkills').subscribe(items=>{
      this.softSkills=items;
      this.softSkillsSubject.next(this.softSkills);
    });
  }

  getDbProjects():void {
    this.http.get<Projects[]>(this.dbUrl+'projects').subscribe(items=>{
      this.projects=items;
      this.projectsSubject.next(this.projects);
    });
  }

  getHighestIdFrom(target:(EducExp|HardSkill|SoftSkill|Projects)[]):number {
    if (target.length > 0) {
      let allIds:number[] = [];
      target.forEach(card => allIds.push(card.id));
      return Math.max(...allIds);
    } else return 0;
  }

  async setOwnerInfo(newOwnerInfo:OwnerInfo):Promise<boolean> {
    return await new Promise(resolve => {
      this.http.post<OwnerInfo>(this.dbUrl+'ownerInfo', newOwnerInfo).subscribe(()=>{
        this.ownerInfo = newOwnerInfo;
        this.ownerInfoSubject.next(this.ownerInfo);
        resolve(true);
      });
    })
  }

  async updateDb(dbType:string, newContent:(EducExp|HardSkill|SoftSkill|Projects)[]):Promise<boolean> {
    return await new Promise(resolve => {
      this.http.delete<EducExp[]>(this.dbUrl + dbType).subscribe(()=>{
        resolve(true);
      });
    });
  }
  
  async deleteEducExp(id:number, type:string):Promise<boolean> {
    let target:EducExp[] = [];
    let targetSubject:Subject<EducExp[]>;
    if (type === 'education') {
      target = this.education;
      targetSubject = this.educationSubject;
    } else if (type === 'experiences') {
      target = this.experiences;
      targetSubject = this.experiencesSubject;
    }
    return await new Promise(resolve=>{
      this.http.delete<EducExp>(this.dbUrl + type + '/' + id).subscribe(()=>{
        target.splice(target.indexOf(target.find(card=>card.id === id) as EducExp),1);
        targetSubject.next(target);
        resolve(true);
      })
    })
  }

  async setEducExp(newEducExp:EducExp, type:string, updateFront:boolean):Promise<string> {
    let target:EducExp[] = [];
    let targetSubject:Subject<EducExp[]>;
    if (type === 'education') {
      target = this.education;
      targetSubject = this.educationSubject;
    }
    else if (type === 'experiences') {
      target = this.experiences;
      targetSubject = this.experiencesSubject;
    }
    return await new Promise(resolve=>{
      if (newEducExp.id !== 0) {
        this.http.put<EducExp>(this.dbUrl + type + '/' + newEducExp.id, newEducExp).subscribe(()=>{
          if (updateFront) {
            if (type === 'education') this.getDbEducation();
            else if (type === 'experiences') this.getDbExperiences();
          }
          resolve('Información actualizada correctamente');
        });
      } else {
        this.http.post<EducExp>(this.dbUrl + type, newEducExp).subscribe(()=>{
          if (updateFront) {
            if (type === 'education') this.getDbEducation();
            else if (type === 'experiences') this.getDbExperiences();
          }
          resolve('Tarjeta añadida correctamente');
        });
      }
    });
  }

  async setHardSkill(newHardSkill:HardSkill, updateFront:boolean):Promise<string> {
    let cardToEdit:HardSkill|undefined = this.hardSkills.find(card => card.id === newHardSkill.id);
    if (cardToEdit) {
      return await new Promise(resolve => {
        this.http.put<HardSkill>(this.dbUrl + 'hardSkills/' + newHardSkill.id, newHardSkill)
        .subscribe(()=>{
          cardToEdit = newHardSkill;
          if (updateFront) this.hardSkillsSubject.next(this.hardSkills);
          resolve('Información actualizada correctamente');
        })
      });
    } else {
      newHardSkill.id = this.getHighestIdFrom(this.hardSkills) + 1;
      return await new Promise(resolve => {
        this.http.post<HardSkill>(this.dbUrl + 'hardSkills', newHardSkill)
        .subscribe(()=>{
          this.hardSkills.push(newHardSkill);
          if (updateFront) this.hardSkillsSubject.next(this.hardSkills);
          resolve('Tarjeta añadida correctamente');
        })
      });
    }
  }

  async deleteHardSkill(cardToDelete:HardSkill): Promise<boolean> {
    return await new Promise(resolve => {
      this.http.delete<HardSkill>(this.dbUrl + 'hardSkills/' + cardToDelete.id).subscribe(()=>{
        this.hardSkills = this.hardSkills.filter(card => card !== cardToDelete);
        this.hardSkillsSubject.next(this.hardSkills);
        resolve(true);
      })
    });
  }

  async setSoftSkill(item:SoftSkill, updateFront:boolean):Promise<string> {
    let cardToEdit:SoftSkill|undefined = this.softSkills.find(card => card.id === item.id);
    if (cardToEdit) {
      return await new Promise(resolve => {
        this.http.put<SoftSkill>(this.dbUrl + 'softSkills/' + item.id, item)
        .subscribe(()=>{
          cardToEdit = item;
          if (updateFront) this.softSkillsSubject.next(this.softSkills);
          resolve('Información actualizada correctamente');
        })
      });
    } else {
      item.id = this.getHighestIdFrom(this.softSkills) + 1;
      return await new Promise(resolve => {
        this.http.post<SoftSkill>(this.dbUrl + 'softSkills', item)
        .subscribe(()=>{
          this.softSkills.push(item);
          if (updateFront) this.softSkillsSubject.next(this.softSkills);
          resolve('Tarjeta añadida correctamente');
        })
      });
    }
  }

  async deleteSoftSkill(cardToDelete:SoftSkill): Promise<boolean> {
    return await new Promise(resolve => {
      this.http.delete<SoftSkill>(this.dbUrl + 'softSkills/' + cardToDelete.id).subscribe(()=>{
        this.softSkills = this.softSkills.filter(card => card !== cardToDelete);
        this.softSkillsSubject.next(this.softSkills);
        resolve(true);
      })
    });
  }
}
