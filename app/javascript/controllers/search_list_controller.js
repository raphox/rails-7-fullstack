import { Controller } from "@hotwired/stimulus"
import debounce from 'lodash/debounce';

// Connects to data-controller="search-list"
export default class extends Controller {
  static values = { url: String };
  static targets = ['searchField', 'item'];

  connect() {
    this.searchFieldTarget.addEventListener("keyup", debounce(this.search, 300));
  }

  selectItem(event) {
    this.itemTargets.forEach(item => item.classList.remove('bg-indigo-100'));
    event.target.closest('a').classList.add('bg-indigo-100');
  }

  search(event) {
    event.target.form.requestSubmit();
  }
}
