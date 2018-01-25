export const navigation = [
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
    url: '/fleet',
    icon: 'fa fa-bus'
  },
  {
    name: 'Alert',
    url: '/alert',
    icon: 'icon-bell'
  },
  {
    name: 'Preventive Maint',
    url: '/pmn',
    icon: 'icon-umbrella'
  },
  {
    name: 'Data Log',
    url: '/datalog',
    icon: 'icon-event',
    children: [
      {
        name: 'Maintenance',
        url: '/datalog/maintenance',
        badge: {
          variant: 'secondary',
          text: 'LOG'
        }
      },
      {
        name: 'Daily Routing',
        url: '/datalog/routing',
        badge: {
          variant: 'secondary',
          text: 'LOG'
        }
      },
      {
        name: 'Connection',
        url: '/datalog/connection',
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
