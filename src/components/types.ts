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
  content?: (NavigationItem | DropdownContentItem)[]
  type?: 'link' | 'dropdown'
}

export type NavigationItem = {
  name: string
  path?: string
  type: 'link' | 'dropdown'
  content?: (NavigationItem | DropdownContentItem)[]
  title?: string
  href?: string
  description?: string
}

export interface Dictionary {
  navigation: {
    home: string
    shopping: string
    club: {
      title: string
      basic: {
        title: string
        description: string
      }
      top: {
        title: string
        description: string
      }
    }
    partners: string
    points: string
    about: {
      title: string
      forYou: {
        title: string
        services: {
          financial: string
          retirement: string
        }
      }
      forBusiness: {
        title: string
        services: {
          corporateCards: string
          loyaltyPrograms: string
        }
      }
      forNGOs: {
        title: string
        services: {
          fundraising: string
          socialProjects: string
        }
      }
    }
  }
}
