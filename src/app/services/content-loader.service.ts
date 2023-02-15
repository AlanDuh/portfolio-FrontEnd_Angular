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

  onExperiencesChange():Observable<EducExp[]> {
    return this.experiencesSubject.asObservable();
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

  async setOwnerInfo(newOwnerInfo:OwnerInfo):Promise<boolean> {
    return await new Promise(resolve => {
      this.http.post<OwnerInfo>(this.dbUrl+'ownerInfo', newOwnerInfo).subscribe(()=>{
        this.ownerInfo = newOwnerInfo;
        this.ownerInfoSubject.next(this.ownerInfo);
        resolve(true);
      });
    })
  }

}
