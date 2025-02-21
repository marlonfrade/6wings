export interface Notification {
  id: string
  read: boolean
  title: string
  message: string
  timestamp: string
}

export interface NavbarProps {
  hasOffset?: boolean
}

export interface DropdownContentItem {
  title?: string
  name?: string
  href?: string
  path?: string
  description?: string
  content?: DropdownContentItem[]
  type?: string
}

export type NavigationItem = {
  name: string
  path?: string
  type: 'link' | 'dropdown'
  content?: DropdownContentItem[]
  title?: string
  href?: string
  description?: string
}
