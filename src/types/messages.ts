export type Messages = {
  navigation: {
    home: string
    shopping: string
    club: string
    partner: string
    points: string
    about: string
  }
  club: {
    basic: {
      title: string
      description: string
    }
    top: {
      title: string
      description: string
    }
  }
  about: {
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
        cards: string
        loyalty: string
      }
    }
    forNGOs: {
      title: string
      services: {
        fundraising: string
        management: string
      }
    }
  }
}
