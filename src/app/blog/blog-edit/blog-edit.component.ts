import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginService } from 'src/app/login.service';
import { BlogService } from 'src/app/blog.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit {
  public Editor = ClassicEditor;
  @Input()public parentID;
  languageList = [];
  languageSettings = {};
  selectedItems = [];
  imageurl: string;
  closeModal: string;
  id: number;
  closeResult: string;
  // postBlog = NgForm;
  data = {
    id: 0,
    title: 'title1',
    imageurl:
      'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'description1',
    author: 'author1',
    languages: [{ language_id: 1, language_text: 'java' }],
    date: '12-12-12',
  };
  @ViewChild('content') modalRef: TemplateRef<any>;
  @ViewChild('postBlog') postBlog = NgForm;

  // blogs = {
  //   id: 0,
  //   title: 'title1',
  //   imageurl:
  //     'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //   description: 'description1',
  //   author: 'author1',
  //   languages: [{ language_id: 1, language_text: 'java' }],
  //   date: '12-12-12',
  // };

  constructor(
    public modalService: NgbModal,
    public loginService: LoginService,
    public blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): any {
    this.getData();
    console.log(this.parentID);

    this.languageList = [
      { language_id: 1, language_text: 'java' },
      { language_id: 2, language_text: 'Javascript' },
      { language_id: 3, language_text: 'C++' },
    ];
    this.languageSettings = {
      singleSelection: false,
      idField: 'language_id',
      textField: 'language_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  open(blogContent): any {
    this.modalService
      .open(blogContent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(blogFormContent): any {
    this.modalService.dismissAll();
    blogFormContent.id = this.parentID;
    this.blogService.getEditedJob(blogFormContent);
    console.log(blogFormContent);
    this.router.navigate(['/myblog'], { relativeTo: this.route });
  }
  getData(): any {
    this.data = this.blogService.getBlogId(this.parentID);
    console.log(this.data);
  }
}
