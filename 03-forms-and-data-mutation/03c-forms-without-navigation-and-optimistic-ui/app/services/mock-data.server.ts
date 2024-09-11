const listItemData: ListItemData = {
  lastId: 4,
  byId: {
    '1': {
      description: '🦃FREE BIRD🦅 This bird you cannot change',
      isCompleted: false,
    },
    '2': {
      description: 'Bread',
      isCompleted: false,
    },
    '3': {
      description: 'Milk',
      isCompleted: false,
    },
    '4': {
      description: 'Eggs',
      isCompleted: false,
    },
  },
  getAll() {
    return Object.entries(this.byId)
      .reverse()
      .map(([id, data]) => {
        return { id, ...data }
      })
  },
  createOne() {
    this.byId[++this.lastId] = { isCompleted: false }
    return this.lastId
  },
  getOne(id: string) {
    return { id, ...this.byId[id] }
  },
  updateOne(id: string, listItemUpdate: ListItemUpdate) {
    if (id !== '1') {
      this.byId[id] = { ...this.byId[id], ...listItemUpdate }
    }
    return { success: true }
  },
  async toggleCompleted(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (id !== '1') {
      this.byId[id].isCompleted = !this.byId[id].isCompleted
    }
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
export async function toggleCompletedOnListItem(id: string) {
  return await listItemData.toggleCompleted(id)
}

export interface ListItemData {
  lastId: number
  byId: {
    [key: string]: {
      description?: string
      isCompleted: boolean
    }
  }
  getAll: Function
  createOne: Function
  getOne: Function
  updateOne: Function
  toggleCompleted: Function
}

export interface ListItem {
  id: string
  description?: string
  isCompleted: boolean
}

export interface ListItemUpdate {
  description?: string
}
