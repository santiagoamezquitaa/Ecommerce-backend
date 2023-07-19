export default class CurrentUserDTO {
  constructor(currentUser) {
    this._id = currentUser._id;
    this.firstName = currentUser.firstName;
    this.lastName = currentUser.lastName;
    this.email = currentUser.email;
    this.cart = currentUser.cart;
    this.role = currentUser.role;
  }
}
