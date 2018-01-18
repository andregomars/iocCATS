export const navigation = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  {
    name: 'Home',
    url: '/home',
    icon: 'icon-home',
    badge: {
      variant: 'info',
      text: 'Start'
    }
  },
  {
    name: 'Fleet',
    url: '/home',
    icon: 'fa fa-bus'
  },
  {
    name: 'Alert',
    url: '/home',
    icon: 'icon-bell'
  },
  {
    name: 'Preventive Maint',
    url: '/home',
    icon: 'icon-umbrella'
  },
  {
    name: 'Data Log',
    url: '/datalog',
    icon: 'icon-event',
    children: [
      {
        name: 'Maintenance',
        url: '/home',
        badge: {
          variant: 'secondary',
          text: 'LOG'
        }
      },
      {
        name: 'Daily Routing',
        url: '/home',
        badge: {
          variant: 'secondary',
          text: 'LOG'
        }
      },
      {
        name: 'Connection',
        url: '/home',
        badge: {
          variant: 'secondary',
          text: 'LOG'
        }
      },

    ]
  },
  {
    name: 'Monthly Report',
    url: '/home',
    icon: 'icon-graph'
  },
  {
    name: 'Notification Set',
    url: '/home',
    icon: 'icon-note'
  }

];
