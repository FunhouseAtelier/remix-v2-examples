const listItemData: ListItemData = {
  lastId: 0,
  byId: {},
  getAll() {
    return Object.entries(this.byId)
      .reverse()
      .map(([id, data]) => {
        const { createdAt } = data
        return { id, createdAt }
      })
  },
  createOne() {
    this.byId[++this.lastId] = {
      createdAt: new Date().toLocaleString(),
    }
    return this.lastId
  },
}

export async function getAllListItems() {
  return listItemData.getAll()
}

export async function createListItem() {
  return listItemData.createOne()
}

export interface ListItemData {
  lastId: number
  byId: {
    [key: string]: {
      createdAt: string
    }
  }
  getAll: Function
  createOne: Function
}

export interface ListItem {
  id: string
  createdAt: string
}
