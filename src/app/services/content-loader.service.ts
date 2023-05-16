import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { OwnerInfo, EducExp, SoftSkill, HardSkill, Projects, MoveObject, CardDeleted } from '../interfaces';
import { AlertsService } from './alerts.service';

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

  private dbUrl:string = 'http://localhost:8080/';
  private ownerInfoSubject = new Subject<OwnerInfo>();
  private educationSubject = new Subject<EducExp[]>();
  private experiencesSubject = new Subject<EducExp[]>();
  private softSkillsSubject = new Subject<SoftSkill[]>();
  private hardSkillsSubject = new Subject<HardSkill[]>();
  private projectsSubject = new Subject<Projects[]>();

  constructor(
    private http:HttpClient,
    private alerts:AlertsService
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

  getAllCards():void {
    this.http.get<(OwnerInfo|EducExp|HardSkill|SoftSkill|Projects)[]>(this.dbUrl+'cards/traer').subscribe(cards=>{
      console.log(cards);
      this.ownerInfo = cards.find(card => card.type === 'OwnerInfo') as OwnerInfo;
      this.ownerInfoSubject.next(this.ownerInfo);
      this.education = cards.filter(card => card.type === 'Education') as EducExp[];
      this.education.sort(function(a,b) {return a.idx - b.idx});
      this.educationSubject.next(this.education);
      this.experiences = cards.filter(card => card.type === 'Experience') as EducExp[];
      this.experiences.sort(function(a,b) {return a.idx - b.idx});
      this.experiencesSubject.next(this.experiences);
      this.hardSkills = cards.filter(card => card.type === 'HardSkill') as HardSkill[];
      this.hardSkills.sort(function(a,b) {return a.idx - b.idx});
      this.hardSkillsSubject.next(this.hardSkills);
      this.softSkills = cards.filter(card => card.type === 'SoftSkill') as SoftSkill[];
      this.softSkills.sort(function(a,b) {return a.idx - b.idx});
      this.softSkillsSubject.next(this.softSkills);
      this.projects = cards.filter(card => card.type === 'Project') as Projects[];
      this.projects.sort(function(a,b) {return a.idx - b.idx});
      this.projectsSubject.next(this.projects);
    })
  }

  updateData(newCard:OwnerInfo|EducExp|HardSkill|SoftSkill|Projects):boolean {
    try {

      let cardsContainer:OwnerInfo|(EducExp|HardSkill|SoftSkill|Projects)[];
      let cardsSubject:Subject<any>;
      let url:string;
      switch (newCard.type) {

        case 'OwnerInfo':
          url = 'ownerInfo';
          cardsContainer = this.ownerInfo as OwnerInfo;
          cardsSubject = this.ownerInfoSubject;
          break;
        case 'Education':
          url = 'educExp';
          cardsContainer = this.education;
          cardsSubject = this.educationSubject;
          break;
        case 'Experience':
          url = 'educExp';
          cardsContainer = this.experiences;
          cardsSubject = this.experiencesSubject;
          break;
        case 'HardSkill':
          url = 'hardSkill';
          cardsContainer = this.hardSkills;
          cardsSubject = this.hardSkillsSubject;
          break;
        case 'SoftSkill':
          url = 'softSkill';
          cardsContainer = this.softSkills;
          cardsSubject = this.softSkillsSubject;
          break;
        case 'Project':
          url = 'project';
          cardsContainer = this.projects;
          cardsSubject = this.projectsSubject;
          break;
        default:
          console.error('ESTÁ INTENTANDO ENVIAR UNA TARJETA DE TIPO INADECUADO');
          return false;

      }
      
      if (!(newCard.id > 0)) {

        if (newCard.type !== 'OwnerInfo') newCard.idx = (cardsContainer as (EducExp|HardSkill|SoftSkill|Projects)[]).length;
        this.http.post<OwnerInfo|EducExp|HardSkill|SoftSkill|Projects>(this.dbUrl+'cards/agregar/'+url, newCard).subscribe(card => {
        
          if (card.type === 'OwnerInfo') cardsContainer = card as OwnerInfo;
          else (cardsContainer as (EducExp|HardSkill|SoftSkill|Projects)[]).push(card as EducExp|HardSkill|SoftSkill|Projects);
          cardsSubject.next(cardsContainer);
          this.alerts.addAlert({type:'success', message:'Tarjeta añadida correctamente'});

        })

      } else {

        this.http.put<OwnerInfo|EducExp|HardSkill|SoftSkill|Projects>(this.dbUrl+'cards/editar/'+url, newCard).subscribe(card => {
        
          console.log(card);
          if (card.type === 'OwnerInfo') cardsContainer = card as OwnerInfo;
          else {
            let oldCard:EducExp|HardSkill|SoftSkill|Projects = (cardsContainer as (EducExp|HardSkill|SoftSkill|Projects)[]).find(c => c.id === card.id) as EducExp|HardSkill|SoftSkill|Projects;
            let oldCardIdx:number = (cardsContainer as (EducExp|HardSkill|SoftSkill|Projects)[]).indexOf(oldCard);
            (cardsContainer as (EducExp|HardSkill|SoftSkill|Projects)[])[oldCardIdx] = card as EducExp|HardSkill|SoftSkill|Projects; 
          }
          cardsSubject.next(cardsContainer);
          this.alerts.addAlert({type:'success', message:'Tarjeta editada correctamente'});

        })

      }

      return true;

    } catch(e) {
   
      this.alerts.addAlert({type:'danger', message:'Ocurrió un ERROR, verifica la sesión'});
      console.error(e);
      return false;
   
    }
  }

  moveCard(movements:MoveObject[]) {
    try {

      this.http.put<MoveObject[]>(this.dbUrl+'cards/mover', movements).subscribe(() => {

        this.alerts.addAlert({type:'success', message:'Movimientos realizados correctamente'});

      });

    } catch(e) {
   
      this.alerts.addAlert({type:'danger', message:'Ocurrió un ERROR, verifica la sesión'});
      console.error(e);
   
    }
  }

  deleteCard(idToDelete:number, type:string) {
    try {

      let cardsContainer:(EducExp|HardSkill|SoftSkill|Projects)[];
      let cardsSubject:Subject<any>;
      switch (type) {

        case 'Education':
          cardsContainer = this.education;
          cardsSubject = this.educationSubject;
          break;
        case 'Experience':
          cardsContainer = this.experiences;
          cardsSubject = this.experiencesSubject;
          break;
        case 'HardSkill':
          cardsContainer = this.hardSkills;
          cardsSubject = this.hardSkillsSubject;
          break;
        case 'SoftSkill':
          cardsContainer = this.softSkills;
          cardsSubject = this.softSkillsSubject;
          break;
        case 'Project':
          cardsContainer = this.projects;
          cardsSubject = this.projectsSubject;
          break;
        default:
          console.error('ESTÁ INTENTANDO ELIMINAR UNA TARJETA DE TIPO INADECUADO');
          return;

      }

      this.http.delete<CardDeleted>(this.dbUrl+'cards/borrar/'+idToDelete).subscribe((asd) => {
        
        let newContent:(EducExp|HardSkill|SoftSkill|Projects)[] = cardsContainer.filter(card => card.id !== idToDelete);
        cardsContainer = newContent;
        let movements:MoveObject[] = [];
        for (let card in cardsContainer) {
          movements.push(
            {
              cardId: cardsContainer[card].id,
              newPosition: parseInt(card)
            }
          )
        }
        this.moveCard(movements);
        cardsSubject.next(cardsContainer);
        this.alerts.addAlert({type:'success', message: asd.msg});

      });

    } catch(e) {
   
      this.alerts.addAlert({type:'danger', message:'Ocurrió un ERROR, verifica la sesión'});
      console.error(e);
   
    }
  }

}