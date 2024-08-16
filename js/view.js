export default class View {
  // namespace
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id="menu"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    // UI only event listeners
    this.$.menuBtn.addEventListener("click", (e) => {
      this.#toggleMenu();
    });
  }

  // register all the event listeners

  //? this methods wont run on initiation, only constructor
  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  // DOM helper methods
  oppenModal(message) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.innerText = message;
  }

  closeAll() {
    this.#closeModal();
    this.#closeMenu();
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.remove("flip");
  }

  clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("flip");
  }

  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  setTurnIndicator(player, opponent) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add(player.colorClass);
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);

    label.classList.add(player.colorClass);
    label.innerText = player.name + ", you are up!";

    this.$.turn.replaceChildren(icon, label);
  }

  //? using # , private function not accessable by view.qs
  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);
    if (!elList) throw new Error("Could not find elements");
    return elList;
  }

  #qs(selector, parent) {
    const el = parent ? parent.querySelector(selector) : document.querySelector(selector);
    if (!el) throw new Error("Could not find elements");
    return el;
  }
}
