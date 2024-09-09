const listItemData: ListItemData = {
  lastId: 0,
  byId: {},
  getAll() {
    return Object.entries(this.byId)
      .reverse()
      .map(([id, data]) => {
        const { description } = data
        return { id, description }
      })
  },
  createOne() {
    this.byId[++this.lastId] = {}
    return this.lastId
  },
  getOne(id: string) {
    return { id, ...this.byId[id] }
  },
  updateOne(id: string, listItemUpdate: ListItemUpdate) {
    this.byId[id] = { ...this.byId[id], ...listItemUpdate }
    return { success: true }
  },
}

export async function getAllListItems() {
  return listItemData.getAll()
}

export async function createListItem() {
  return listItemData.createOne()
}

export async function getListItem(id: string) {
  return listItemData.getOne(id)
}

export async function updateListItem(
  id: string,
  listItemUpdate: ListItemUpdate
) {
  return listItemData.updateOne(id, listItemUpdate)
}

export interface ListItemData {
  lastId: number
  byId: {
    [key: string]: {
      description?: string
    }
  }
  getAll: Function
  createOne: Function
  getOne: Function
  updateOne: Function
}

export interface ListItem {
  id: string
  description?: string
}

export interface ListItemUpdate {
  description?: string
}
