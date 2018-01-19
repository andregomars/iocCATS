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
