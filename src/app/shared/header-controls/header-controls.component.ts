import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HeadControlsService } from '../../core/service/header-controls.service';

@Component({
  selector: 'app-header-controls',
  templateUrl: './header-controls.component.html',
  styleUrls: ['./header-controls.component.scss']
})
export class HeaderControlsComponent {
  @Input() searchPlaceholder?: string = "Pesquise pelo nome";
  @Input() addPlaceholder?: string = "Adicionar";
  @Output() onSearch = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() onDeleteMultiple = new EventEmitter<any>();

  searchTerm: string = '';
  toDelete: any[] = [];

  constructor(
    private headerControlsService: HeadControlsService,
  ) { }

  ngOnInit() {
  }

  emitSearch() {
    this.onSearch.emit(this.searchTerm);
  }

  clearSearchableTerm() {
    this.searchTerm = '';
    this.onSearch.emit(this.searchTerm);
  }

  emitAddModal() {
    this.onAdd.emit(event);
  }

  deleteMultiple() {
    this.onDeleteMultiple.emit(this.toDelete);
  }

  toggleSelectAll(event: any) {
    const checked = (<HTMLInputElement>event.target).checked;
  }
}
