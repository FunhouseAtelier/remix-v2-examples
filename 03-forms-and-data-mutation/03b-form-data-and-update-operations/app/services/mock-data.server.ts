const allListItems: ListItem[] = []

export async function getAllListItems() {
  return allListItems
}

export async function createListItem() {
  const newListItem = {
    id: `${allListItems.length + 1}`,
    createdAt: new Date().toLocaleString(),
  }
  allListItems.push(newListItem)
  return newListItem
}

export async function getListItem(listItemId: string) {
  return allListItems[listItemId]
}

export interface ListItem {
  id: string
  createdAt: string
}
