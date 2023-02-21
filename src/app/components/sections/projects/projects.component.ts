import { Component, OnInit } from '@angular/core';

import { Section } from 'src/app/general_classes/section';
import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from 'src/app/interfaces';
import { ProjectsEditorComponent } from '../../modals/projects-editor/projects-editor.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends Section implements OnInit {

  constructor (
    private accountService: AccountSettingsService,
    private contentLoader: ContentLoaderService,
    private modalService: NgbModal
  ) {
    super();
    this.dataBaseItemModify = async (item:any, updateFront:boolean) => {
      return await new Promise(resolve => {
        this.contentLoader.setProject(item as Projects, updateFront)
          .then(value => resolve(value));
      })
    }
    this.addCard = () => this.modalService.open(ProjectsEditorComponent, this.globalModalConfig);
    this.accountSubscription = accountService.onChange().subscribe(value => this.loged = value);
    this.contentSubscription = contentLoader.onProjectsChange().subscribe(items => this.content = items);
  }

  ngOnInit():void {
    this.contentLoader.getDbProjects();
  }

}
