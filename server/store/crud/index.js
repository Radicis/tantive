const Store = require('electron-store');
const UUID = require('uuid').v4;

class CRUD {
  constructor(type) {
    this.JSONStore = new Store();
    this.type = type;
  }

  get(id) {
    const storeItems = this.all();
    return storeItems.find((i) => i.id === id);
  }

  all() {
    return this.JSONStore.get(this.type) || [];
  }

  create(item) {
    const storeItems = this.all();
    const newItem = { ...item, id: UUID() };
    this.JSONStore.set(this.type, [...storeItems, newItem]);
    return newItem;
  }

  update(id, item) {
    const storeItems = this.all();
    this.JSONStore.set(
      this.type,
      storeItems.map((i) => {
        if (i.id === id) {
          return {
            ...i,
            ...item
          };
        }
        return { ...i };
      })
    );
  }

  remove(id) {
    const storeItems = this.all();
    this.JSONStore.set(
      this.type,
      storeItems.filter((i) => i.id !== id)
    );
  }
}

module.exports = CRUD;
