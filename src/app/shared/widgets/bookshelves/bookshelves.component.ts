import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bookshelf } from '../../models/bookshelf.model';

@Component({
  selector: 'app-bookshelves',
  templateUrl: './bookshelves.component.html',
  styleUrls: ['./bookshelves.component.css']
})
export class BookshelvesComponent implements OnInit {
  @Output() deleteBookshelf = new EventEmitter<Bookshelf>();
  @Input() bookshelves: Bookshelf[];
  selectedBookshelf: Bookshelf;
  isDetailed = false;
  isEditable = false;

  constructor() { }

  ngOnInit() {
    this.selectedBookshelf = null;
  }

  onItemSelected(bookshelf: Bookshelf) {
    if (this.selectedBookshelf === bookshelf) {
      this.isDetailed = !this.isDetailed;
    } else {
      this.selectedBookshelf = bookshelf;
      this.isDetailed = true;
    }
  }

  onAddItem() {

  }

  onEditItem(bookshelf: Bookshelf) {
    this.isDetailed = false;
    this.isEditable = true;
    this.selectedBookshelf = bookshelf;
  }

  onSaveItem() {
    this.isDetailed = true;
    this.isEditable = false;
  }

  onDeleteItem(bookshelf: Bookshelf) {
    // TODO: add confirmation
    this.deleteBookshelf.emit(bookshelf);
    this.isEditable = false;
  }

}
