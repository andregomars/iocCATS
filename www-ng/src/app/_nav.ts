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
    url: '/dashboard',
    icon: 'fa fa-bus'
  },
  {
    name: 'Alert',
    url: '/dashboard',
    icon: 'icon-bell'
  },
  {
    name: 'Preventive Maint',
    url: '/dashboard',
    icon: 'icon-umbrella'
  },
  {
    name: 'Data Log',
    url: '/datalog',
    icon: 'icon-event',
    children: [
      {
        name: 'Maintenance',
        url: '/dashboard',
        badge: {
          variant: 'secondary',
          text: 'LOG'
        }
      },
      {
        name: 'Daily Routing',
        url: '/dashboard',
        badge: {
          variant: 'secondary',
          text: 'LOG'
        }
      },
      {
        name: 'Connection',
        url: '/dashboard',
        badge: {
          variant: 'secondary',
          text: 'LOG'
        }
      },

    ]
  },
  {
    name: 'Monthly Report',
    url: '/dashboard',
    icon: 'icon-graph'
  },
  {
    name: 'Notification Set',
    url: '/dashboard',
    icon: 'icon-note'
  }

];
