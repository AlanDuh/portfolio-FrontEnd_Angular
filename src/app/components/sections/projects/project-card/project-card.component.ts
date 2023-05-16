import { Component } from '@angular/core';

import { Card } from 'src/app/general_classes/card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { ProjectsEditorComponent } from 'src/app/components/modals/projects-editor/projects-editor.component';
import { Projects } from 'src/app/interfaces';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent extends Card {

  override card:Projects = {
    id: 0,
    name: '',
    idx: -1,
    type: '',
    description: '',
    date: null,
    images: [],
    pageLink: '',
    gitHubLink: ''
  };

  constructor (
    private modalService: NgbModal,
    private contentLoader: ContentLoaderService
  ) {
    super();
    this.modifyCard = () => modalService.open(ProjectsEditorComponent, this.globalModalConfig);
  }

  addLeftZero(num:number): string {
    let str = num.toString();
    return (str.length === 1)? '0' + str: str;
  }

  generateDate(date:string|null):string {
    let newDate = new Date(date as string);
    return this.addLeftZero(newDate.getUTCDate()) + '/' + this.addLeftZero(newDate.getUTCMonth() + 1) + '/' + newDate.getUTCFullYear();
  }

  deleteCard() {
    this.setLoading.emit(true);
    this.contentLoader.deleteCard(this.card.id, this.card.type);
    this.setLoading.emit(false);
  }

}
