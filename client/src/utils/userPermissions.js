
/*
const roleTypes = [
  'User',
  'Admin',
  'Accounting',
  'PRCreator',
  'Buyer',
  'Manager',
];
*/

export const appPermissions = {
  'PRCreator': {
    purchasing: [
      {
        title: 'Create New Purchase Requisition',
        subtitle: 'Submit new purchase request to follow approval workflows.',
        link: '/createform',
      },
      {
        title: 'My Pending PRs',
        subtitle: 'View outstanding requests and their statuses.',
        link: '/viewforms',
      },
    ],

    vendors: [
      {
        title: 'Add Vendors',
        subtitle: 'Add new vendors',
        link: '/add',
      },
    ]
  },

  'Buyer': {
    purchasing: [
      {
        title: 'Create New Purchase Requisition',
        subtitle: 'Submit new purchase request to follow approval workflows.',
        link: '/createform',
      },
      {
        title: 'My Pending PRs',
        subtitle: 'View outstanding requests and their statuses.',
        link: '/viewforms',
      },
      {
        title: 'All PRs',
        subtitle: 'View details of all the PRs submitted company wide.',
        link: '/viewallrequests',
      },
      {
        title: 'Search All PRs',
        subtitle: 'Lookup any PR company wide based on ID.',
        link: '/search',
      },
    ],

    vendors: [
      {
        title: 'Add Vendors',
        subtitle: 'Add new vendors',
        link: '/add',
      },
    ],

    purchaseorders: [
      {
        title: 'All POs',
        subtitle: 'View details of all the POs submitted company wide.',
        link: '/allpos',
      },
      {
        title: 'Create New PO',
        subtitle: 'Create a new PO for an approved PR',
        link: '/createpo',
      },
      {
        title: 'PO Lookup',
        subtitle: 'Search for PO based on ID',
        link: '/polookup',
      }
    ]
  },

  'Accounting': {
    purchasing: [
      {
        title: 'Create New Purchase Requisition',
        subtitle: 'Submit new purchase request to follow approval workflows.',
        link: '/createform',
      },
      {
        title: 'My Pending PRs',
        subtitle: 'View outstanding requests and their statuses.',
        link: '/viewforms',
      },
      {
        title: 'All PRs',
        subtitle: 'View details of all the PRs submitted company wide.',
        link: '/viewallrequests',
      },
      {
        title: 'Search All PRs',
        subtitle: 'Lookup any PR company wide based on ID.',
        link: '/search',
      },
    ],

    vendors: [
      {
        title: 'Add Vendors',
        subtitle: 'Add new vendors',
        link: '/add',
      },
    ],

    purchaseorders: [
      {
        title: 'All POs',
        subtitle: 'View details of all the POs submitted company wide.',
        link: '/allpos',
      },
      {
        title: 'PO Lookup',
        subtitle: 'Search for PO based on ID',
        link: '/polookup',
      }
    ]
  },

  'Admin': {
    users: [
      {
        title: 'User Management',
        subtitle: 'Manage purchase requisition requests here',
        link: '/users',
      }
    ],

    purchasing: [
      {
        title: 'Create New Purchase Requisition',
        subtitle: 'Submit new purchase request to follow approval workflows.',
        link: '/createform',
      },
      {
        title: 'My Pending PRs',
        subtitle: 'View outstanding requests and their statuses.',
        link: '/viewforms',
      },
      {
        title: 'All PRs',
        subtitle: 'View details of all the PRs submitted company wide.',
        link: '/viewallrequests',
      },
      {
        title: 'Search All PRs',
        subtitle: 'Lookup any PR company wide based on ID.',
        link: '/search',
      },
      {
        title: 'DEMO: New PR',
        subtitle: 'New PR template',
        link: '/newcreate',
      },
    ],

    vendors: [
      {
        title: 'View All Vendors',
        subtitle: 'View a list of all vendors',
        link: '/viewall',
      },
      {
        title: 'Add Vendors',
        subtitle: 'Add new vendors',
        link: '/add',
      },
    ],

    purchaseorders: [
      {
        title: 'All POs',
        subtitle: 'View details of all the POs submitted company wide.',
        link: '/allpos',
      },
      {
        title: 'Create New PO',
        subtitle: 'Create a new PO for an approved PR',
        link: '/createpo',
      },
      {
        title: 'PO Lookup',
        subtitle: 'Search for PO based on ID',
        link: '/polookup',
      }
    ]
  }
}

export const userDashboardApps = {
  User: [],
  PRCreator: [
    {
      title: 'Purchasing',
      subtitle: 'Manage Purchasing Related Tasks',
      link: 'purchasing'
    },
    {
      title: 'Vendors',
      subtitle: 'Manage Vendor Related Information',
      link: 'vendors'
    },
    {
      title: 'Resources',
      subtitle: 'Company Information and related SOPs',
      link: 'resources'
    }
  ],
  Buyer: [
    {
      title: 'Purchasing',
      subtitle: 'Manage Purchasing Related Tasks',
      link: 'purchasing'
    },
    {
      title: 'Vendors',
      subtitle: 'Manage Vendor Related Information',
      link: 'vendors'
    },
    {
      title: 'Purchase Orders',
      subtitle: 'Manage Your/Company Purchase Orders Here',
      link: 'purchaseorders'
    },
    {
      title: 'Resources',
      subtitle: 'Company Information and related SOPs',
      link: 'resources'
    }
  ],
  Accounting: [
    {
      title: 'Purchasing',
      subtitle: 'Manage Purchasing Related Tasks',
      link: 'purchasing'
    },
    {
      title: 'Vendors',
      subtitle: 'Manage Vendor Related Information',
      link: 'vendors'
    },
    {
      title: 'Purchase Orders',
      subtitle: 'Manage Your/Company Purchase Orders Here',
      link: 'purchaseorders'
    },
    {
      title: 'Resources',
      subtitle: 'Company Information and related SOPs',
      link: 'resources'
    }
  ],
  Admin: [
    {
      title: 'Purchasing',
      subtitle: 'Manage Purchasing Related Tasks',
      link: 'purchasing'
    },
    {
      title: 'Vendors',
      subtitle: 'Manage Vendor Related Information',
      link: 'vendors'
    },
    {
      title: 'Purchase Orders',
      subtitle: 'Manage Your/Company Purchase Orders Here',
      link: 'purchaseorders'
    },
    {
      title: 'Users',
      subtitle: 'Manage App Users Here',
      link: 'users'
    },
    {
      title: 'Resources',
      subtitle: 'Company Information and related SOPs',
      link: 'resources'
    }
  ],
}
